create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.bible_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_answer text not null,
  explanation text not null default '',
  scripture_reference text not null,
  bible_book text not null,
  testament text not null check (testament in ('Old Testament', 'New Testament')),
  category text not null,
  difficulty text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  created_at timestamptz not null default now(),
  constraint bible_questions_answer_is_option check (
    correct_answer in (option_a, option_b, option_c, option_d)
  )
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  difficulty text not null,
  total_questions integer not null check (total_questions between 1 and 100),
  correct_answers integer not null default 0,
  wrong_answers integer not null default 0,
  unanswered_questions integer not null default 0,
  score integer not null default 0,
  percentage numeric(5,2) not null default 0,
  time_used integer not null default 0 check (time_used >= 0),
  completed_at timestamptz not null default now()
);

create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid references public.bible_questions(id) on delete set null,
  selected_answer text,
  correct_status boolean,
  created_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  category_name text not null unique,
  description text not null default ''
);

create index if not exists bible_questions_book_idx on public.bible_questions(bible_book);
create index if not exists bible_questions_category_idx on public.bible_questions(category);
create index if not exists quiz_attempts_user_date_idx on public.quiz_attempts(user_id, completed_at desc);
create index if not exists quiz_responses_attempt_idx on public.quiz_responses(attempt_id);

alter table public.profiles enable row level security;
alter table public.bible_questions enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_responses enable row level security;
alter table public.categories enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.role = 'admin'
  );
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Users read their own profile" on public.profiles;
create policy "Users read their own profile" on public.profiles for select to authenticated
  using (id = (select auth.uid()));
drop policy if exists "Users update their own profile" on public.profiles;
create policy "Users update their own profile" on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));
drop policy if exists "Admins manage profiles" on public.profiles;
create policy "Admins manage profiles" on public.profiles for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Questions are readable" on public.bible_questions;
create policy "Questions are readable" on public.bible_questions for select to anon, authenticated using (true);
drop policy if exists "Admins manage questions" on public.bible_questions;
create policy "Admins manage questions" on public.bible_questions for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

drop policy if exists "Users read their own attempts" on public.quiz_attempts;
create policy "Users read their own attempts" on public.quiz_attempts for select to authenticated
  using (user_id = (select auth.uid()));
drop policy if exists "Admins read all attempts" on public.quiz_attempts;
create policy "Admins read all attempts" on public.quiz_attempts for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Users read responses for their attempts" on public.quiz_responses;
create policy "Users read responses for their attempts" on public.quiz_responses for select to authenticated
  using (exists (select 1 from public.quiz_attempts a where a.id = attempt_id and a.user_id = (select auth.uid())));
drop policy if exists "Admins read all responses" on public.quiz_responses;
create policy "Admins read all responses" on public.quiz_responses for select to authenticated
  using ((select public.is_admin()));

drop policy if exists "Categories are readable" on public.categories;
create policy "Categories are readable" on public.categories for select to anon, authenticated using (true);
drop policy if exists "Admins manage categories" on public.categories;
create policy "Admins manage categories" on public.categories for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

revoke all on public.profiles, public.bible_questions, public.quiz_attempts, public.quiz_responses, public.categories from anon, authenticated;
grant select (id, full_name, email, created_at) on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant select (id, question, option_a, option_b, option_c, option_d, explanation, scripture_reference, bible_book, testament, category, difficulty, created_at) on public.bible_questions to anon, authenticated;
grant insert, update, delete on public.bible_questions to authenticated;
grant select on public.quiz_attempts, public.quiz_responses to authenticated;
grant select on public.categories to anon, authenticated;
grant insert, update, delete on public.categories to authenticated;

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''), coalesce(new.email, ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.create_profile_for_new_user();

drop function if exists public.submit_quiz(text, text, integer, jsonb);
create or replace function public.submit_quiz(
  p_category text,
  p_difficulty text,
  p_book text,
  p_time_used integer,
  p_responses jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_attempt_id uuid;
  v_total integer;
  v_correct integer := 0;
  v_wrong integer := 0;
  v_unanswered integer := 0;
  v_score integer;
  v_review jsonb := '[]'::jsonb;
  v_item jsonb;
  v_question public.bible_questions%rowtype;
  v_selected text;
  v_is_correct boolean;
  v_difficulty_rank integer;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;
  if jsonb_typeof(p_responses) <> 'array' or jsonb_array_length(p_responses) < 1
      or jsonb_array_length(p_responses) > 100 then
    raise exception 'Responses must contain between 1 and 100 questions';
  end if;
  if p_time_used is null or p_time_used < 0 or p_time_used > 7200 then
    raise exception 'Invalid quiz time';
  end if;

  v_total := jsonb_array_length(p_responses);
  if (select count(distinct value ->> 'question_id') from jsonb_array_elements(p_responses)) <> v_total then
    raise exception 'Each question may only appear once';
  end if;
  v_difficulty_rank := case p_difficulty when 'Beginner' then 1 when 'Intermediate' then 2 when 'Advanced' then 3 when 'Expert' then 4 else 0 end;
  if v_difficulty_rank = 0 then
    raise exception 'Invalid difficulty';
  end if;
  insert into public.quiz_attempts (user_id, category, difficulty, total_questions, time_used)
  values (v_user_id, coalesce(p_category, 'All categories'), coalesce(p_difficulty, 'Beginner'), v_total, p_time_used)
  returning id into v_attempt_id;

  for v_item in select value from jsonb_array_elements(p_responses)
  loop
    select * into strict v_question from public.bible_questions where id = (v_item ->> 'question_id')::uuid;
    if p_book is not null and p_book <> 'All' and v_question.bible_book <> p_book then
      raise exception 'Question does not match the selected Bible book';
    end if;
    if p_category in ('Old Testament', 'New Testament') then
      if v_question.testament <> p_category then
        raise exception 'Question does not match the selected testament';
      end if;
    elsif p_category not in ('All', 'All categories') and v_question.category <> p_category then
      raise exception 'Question does not match the selected category';
    end if;
    if (case v_question.difficulty when 'Beginner' then 1 when 'Intermediate' then 2 when 'Advanced' then 3 else 4 end) > v_difficulty_rank then
      raise exception 'Question exceeds the selected difficulty';
    end if;
    v_selected := nullif(v_item ->> 'selected_answer', '');
    if v_selected is not null and v_selected not in (v_question.option_a, v_question.option_b, v_question.option_c, v_question.option_d) then
      raise exception 'Submitted answer is not a valid option';
    end if;

    v_is_correct := v_selected is not null and v_selected = v_question.correct_answer;
    if v_selected is null then
      v_unanswered := v_unanswered + 1;
    elsif v_is_correct then
      v_correct := v_correct + 1;
    else
      v_wrong := v_wrong + 1;
    end if;

    insert into public.quiz_responses (attempt_id, question_id, selected_answer, correct_status)
    values (v_attempt_id, v_question.id, v_selected, case when v_selected is null then null else v_is_correct end);

    v_review := v_review || jsonb_build_array(jsonb_build_object(
      'question', v_question.question,
      'selected_answer', v_selected,
      'correct_answer', v_question.correct_answer,
      'options', jsonb_build_array(v_question.option_a, v_question.option_b, v_question.option_c, v_question.option_d),
      'correct_status', coalesce(v_is_correct, false),
      'explanation', v_question.explanation,
      'scripture_reference', v_question.scripture_reference,
      'bible_book', v_question.bible_book
    ));
  end loop;

  v_score := v_correct;
  update public.quiz_attempts
  set correct_answers = v_correct,
      wrong_answers = v_wrong,
      unanswered_questions = v_unanswered,
      score = v_score,
      percentage = round((v_correct::numeric / v_total) * 100, 2)
  where id = v_attempt_id;

  return jsonb_build_object(
    'total_questions', v_total,
    'correct_answers', v_correct,
    'wrong_answers', v_wrong,
    'unanswered_questions', v_unanswered,
    'score', v_score,
    'percentage', round((v_correct::numeric / v_total) * 100, 2),
    'time_used', p_time_used,
    'review', v_review
  );
end;
$$;

revoke all on function public.submit_quiz(text, text, text, integer, jsonb) from public, anon;
grant execute on function public.submit_quiz(text, text, text, integer, jsonb) to authenticated;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce((select p.role from public.profiles p where p.id = (select auth.uid())), 'user');
$$;

create or replace function public.admin_list_questions()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not (select public.is_admin()) then
    raise exception 'Administrator access required';
  end if;
  return coalesce((
    select jsonb_agg(to_jsonb(q) order by q.created_at desc)
    from public.bible_questions q
  ), '[]'::jsonb);
end;
$$;

create or replace function public.admin_upsert_question(p_question jsonb)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_correct text;
  v_book text := p_question ->> 'bible_book';
  v_testament text := p_question ->> 'testament';
begin
  if not (select public.is_admin()) then
    raise exception 'Administrator access required';
  end if;
  if coalesce(p_question ->> 'question', '') = ''
      or coalesce(p_question ->> 'scripture_reference', '') = ''
      or coalesce(p_question ->> 'option_a', '') = ''
      or coalesce(p_question ->> 'option_b', '') = ''
      or coalesce(p_question ->> 'option_c', '') = ''
      or coalesce(p_question ->> 'option_d', '') = '' then
    raise exception 'Question, all four options, and Scripture reference are required';
  end if;
  v_correct := p_question ->> 'correct_answer';
  if v_correct not in (
    p_question ->> 'option_a', p_question ->> 'option_b',
    p_question ->> 'option_c', p_question ->> 'option_d'
  ) then
    raise exception 'Correct answer must match one of the four options';
  end if;
  if v_testament not in ('Old Testament', 'New Testament') then
    raise exception 'Invalid testament';
  end if;

  if nullif(p_question ->> 'id', '') is null then
    insert into public.bible_questions
      (question, option_a, option_b, option_c, option_d, correct_answer, explanation,
       scripture_reference, bible_book, testament, category, difficulty)
    values
      (p_question ->> 'question', p_question ->> 'option_a', p_question ->> 'option_b',
       p_question ->> 'option_c', p_question ->> 'option_d', v_correct,
       coalesce(p_question ->> 'explanation', ''), p_question ->> 'scripture_reference',
       v_book, v_testament, coalesce(p_question ->> 'category', 'Bible Characters'),
       coalesce(p_question ->> 'difficulty', 'Beginner'))
    returning id into v_id;
  else
    v_id := (p_question ->> 'id')::uuid;
    update public.bible_questions
    set question = p_question ->> 'question',
        option_a = p_question ->> 'option_a',
        option_b = p_question ->> 'option_b',
        option_c = p_question ->> 'option_c',
        option_d = p_question ->> 'option_d',
        correct_answer = v_correct,
        explanation = coalesce(p_question ->> 'explanation', ''),
        scripture_reference = p_question ->> 'scripture_reference',
        bible_book = v_book,
        testament = v_testament,
        category = coalesce(p_question ->> 'category', 'Bible Characters'),
        difficulty = coalesce(p_question ->> 'difficulty', 'Beginner')
    where id = v_id;
    if not found then
      raise exception 'Question not found';
    end if;
  end if;
  return v_id;
end;
$$;

create or replace function public.admin_delete_question(p_question_id uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not (select public.is_admin()) then
    raise exception 'Administrator access required';
  end if;
  delete from public.bible_questions where id = p_question_id;
  if not found then
    raise exception 'Question not found';
  end if;
end;
$$;

create or replace function public.get_leaderboard()
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  with scores as (
    select
      a.user_id,
      count(*)::integer as quizzes,
      round(avg(a.percentage), 1) as average,
      max(a.completed_at) as latest
    from public.quiz_attempts a
    group by a.user_id
    having count(*) >= 1
  )
  select coalesce(jsonb_agg(jsonb_build_object(
    'name', case when coalesce(p.full_name, '') = '' then 'Learner'
      else split_part(p.full_name, ' ', 1) ||
        case when split_part(p.full_name, ' ', 2) = '' then '' else ' ' || left(split_part(p.full_name, ' ', 2), 1) || '.' end
      end,
    'quizzes', s.quizzes,
    'average', s.average
  ) order by s.average desc, s.quizzes desc, s.latest desc), '[]'::jsonb)
  from scores s join public.profiles p on p.id = s.user_id;
$$;

revoke all on function public.current_user_role() from public, anon;
revoke all on function public.admin_list_questions() from public, anon;
revoke all on function public.admin_upsert_question(jsonb) from public, anon;
revoke all on function public.admin_delete_question(uuid) from public, anon;
revoke all on function public.get_leaderboard() from public;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.admin_list_questions() to authenticated;
grant execute on function public.admin_upsert_question(jsonb) to authenticated;
grant execute on function public.admin_delete_question(uuid) to authenticated;
grant execute on function public.get_leaderboard() to anon, authenticated;

insert into public.categories (category_name, description) values
  ('Old Testament', 'Explore the 39 books of the Old Testament.'),
  ('New Testament', 'Explore the 27 books of the New Testament.'),
  ('Bible Characters', 'People who shaped the story of Scripture.'),
  ('Kings and Prophets', 'Leaders and messengers throughout the Bible.'),
  ('Women in the Bible', 'Women of faith, courage, and wisdom.'),
  ('Miracles of Jesus', 'Signs and wonders in the Gospels.'),
  ('Parables of Jesus', 'Stories Jesus told and the truths they teach.'),
  ('The Life of Jesus Christ', 'The life, ministry, death, and resurrection of Jesus.'),
  ('Apostles and Disciples', 'The followers of Jesus and the early church.'),
  ('Bible Geography', 'Places and journeys throughout Scripture.'),
  ('Bible History', 'Historical people and events in the Bible.'),
  ('Biblical Events', 'Key events from Genesis to Revelation.'),
  ('Bible Verses and References', 'Questions about passages and references.'),
  ('Christian Knowledge', 'Foundations of the Christian faith.')
on conflict (category_name) do nothing;
