/* Add your Supabase project URL and publishable anon key here to enable accounts and synced quizzes. */
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";
const STORAGE_KEY = "wordwise-v1";

const books = {
  "Old Testament": ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi"],
  "New Testament": ["Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]
};
const categories = [
  {name:"Old Testament", icon:"▤", detail:"39 books · From creation to promise"},
  {name:"New Testament", icon:"✝", detail:"27 books · The life and teachings of Jesus"},
  {name:"Bible Characters", icon:"♙", detail:"Meet the people who shaped Scripture"},
  {name:"Kings and Prophets", icon:"♕", detail:"Leaders, messengers, and their stories"},
  {name:"Women in the Bible", icon:"❋", detail:"Remarkable women of faith and courage"},
  {name:"Miracles of Jesus", icon:"✧", detail:"Signs and wonders in the Gospels"},
  {name:"Parables of Jesus", icon:"☼", detail:"Timeless stories with a deeper meaning"},
  {name:"The Life of Jesus Christ", icon:"♡", detail:"From Bethlehem to the resurrection"},
  {name:"Apostles and Disciples", icon:"♧", detail:"Those who followed and shared the good news"},
  {name:"Bible Geography", icon:"⌖", detail:"Places and journeys throughout Scripture"},
  {name:"Bible History", icon:"◷", detail:"People, places, and history of the Bible"},
  {name:"Biblical Events", icon:"✦", detail:"Key moments from Genesis to Revelation"},
  {name:"Bible Verses and References", icon:"▧", detail:"Find the passage behind the question"},
  {name:"Christian Knowledge", icon:"◎", detail:"Foundations of the Christian faith"}
];
const demoQuestions = [
  {id:"q1",question:"Who was the first person to build an altar to the Lord after the flood?",option_a:"Noah",option_b:"Abraham",option_c:"Moses",option_d:"Isaac",correct_answer:"Noah",explanation:"After leaving the ark, Noah built an altar to the Lord and offered burnt offerings.",scripture_reference:"Genesis 8:20",bible_book:"Genesis",testament:"Old Testament",category:"Biblical Events",difficulty:"Beginner"},
  {id:"q2",question:"What did God create on the first day?",option_a:"The sun and moon",option_b:"Light",option_c:"The land and seas",option_d:"The stars",correct_answer:"Light",explanation:"God said, “Let there be light,” and separated the light from the darkness.",scripture_reference:"Genesis 1:3–5",bible_book:"Genesis",testament:"Old Testament",category:"Old Testament",difficulty:"Beginner"},
  {id:"q3",question:"Who led the Israelites out of Egypt?",option_a:"Joshua",option_b:"Aaron",option_c:"Moses",option_d:"Caleb",correct_answer:"Moses",explanation:"God called Moses to lead his people out of slavery in Egypt.",scripture_reference:"Exodus 3:10",bible_book:"Exodus",testament:"Old Testament",category:"Bible Characters",difficulty:"Beginner"},
  {id:"q4",question:"How many commandments did God give Moses on Mount Sinai?",option_a:"Seven",option_b:"Ten",option_c:"Twelve",option_d:"Forty",correct_answer:"Ten",explanation:"The Lord gave Moses the Ten Commandments on two stone tablets.",scripture_reference:"Exodus 34:28",bible_book:"Exodus",testament:"Old Testament",category:"Bible History",difficulty:"Beginner"},
  {id:"q5",question:"Who succeeded Moses as leader of Israel?",option_a:"Caleb",option_b:"Aaron",option_c:"Joshua",option_d:"Eleazar",correct_answer:"Joshua",explanation:"The Lord commissioned Joshua to lead Israel into the promised land.",scripture_reference:"Joshua 1:1–2",bible_book:"Joshua",testament:"Old Testament",category:"Bible Characters",difficulty:"Beginner"},
  {id:"q6",question:"Which judge was known for his great strength?",option_a:"Gideon",option_b:"Samson",option_c:"Ehud",option_d:"Barak",correct_answer:"Samson",explanation:"Samson was set apart from birth, and the Spirit of the Lord empowered him with great strength.",scripture_reference:"Judges 13:24–25; 14:6",bible_book:"Judges",testament:"Old Testament",category:"Bible Characters",difficulty:"Beginner"},
  {id:"q7",question:"What was Ruth's relationship to Naomi?",option_a:"Her daughter",option_b:"Her sister",option_c:"Her daughter-in-law",option_d:"Her cousin",correct_answer:"Her daughter-in-law",explanation:"Ruth was married to Naomi's son and chose to remain with Naomi after he died.",scripture_reference:"Ruth 1:3–5, 16",bible_book:"Ruth",testament:"Old Testament",category:"Women in the Bible",difficulty:"Beginner"},
  {id:"q8",question:"Who was Israel's first king?",option_a:"David",option_b:"Saul",option_c:"Solomon",option_d:"Samuel",correct_answer:"Saul",explanation:"Saul son of Kish was anointed as Israel's first king by Samuel.",scripture_reference:"1 Samuel 10:1, 24",bible_book:"1 Samuel",testament:"Old Testament",category:"Kings and Prophets",difficulty:"Beginner"},
  {id:"q9",question:"What did David use to defeat Goliath?",option_a:"A spear",option_b:"A sword",option_c:"A sling and a stone",option_d:"A bow",correct_answer:"A sling and a stone",explanation:"David went against Goliath with a sling and a stone, trusting in the name of the Lord.",scripture_reference:"1 Samuel 17:45–50",bible_book:"1 Samuel",testament:"Old Testament",category:"Bible Characters",difficulty:"Beginner"},
  {id:"q10",question:"What did Solomon ask God to give him?",option_a:"Long life",option_b:"Wisdom to govern",option_c:"Victory over every nation",option_d:"Great wealth",correct_answer:"Wisdom to govern",explanation:"Solomon asked for a discerning heart to govern God's people and distinguish right from wrong.",scripture_reference:"1 Kings 3:9–12",bible_book:"1 Kings",testament:"Old Testament",category:"Kings and Prophets",difficulty:"Intermediate"},
  {id:"q11",question:"Which prophet was taken up to heaven in a whirlwind?",option_a:"Elisha",option_b:"Isaiah",option_c:"Elijah",option_d:"Jeremiah",correct_answer:"Elijah",explanation:"Elijah went up to heaven in a whirlwind while Elisha watched.",scripture_reference:"2 Kings 2:11",bible_book:"2 Kings",testament:"Old Testament",category:"Kings and Prophets",difficulty:"Intermediate"},
  {id:"q12",question:"Who rebuilt Jerusalem's wall after the exile?",option_a:"Ezra",option_b:"Nehemiah",option_c:"Zerubbabel",option_d:"Haggai",correct_answer:"Nehemiah",explanation:"Nehemiah led the rebuilding of Jerusalem's walls despite opposition.",scripture_reference:"Nehemiah 6:15–16",bible_book:"Nehemiah",testament:"Old Testament",category:"Bible History",difficulty:"Intermediate"},
  {id:"q13",question:"Which queen risked her life to speak to the king for her people?",option_a:"Jezebel",option_b:"Esther",option_c:"Bathsheba",option_d:"Vashti",correct_answer:"Esther",explanation:"Esther approached the king without being summoned to plead for the Jewish people.",scripture_reference:"Esther 4:14–16; 5:1–2",bible_book:"Esther",testament:"Old Testament",category:"Women in the Bible",difficulty:"Beginner"},
  {id:"q14",question:"In which book do we read, “The Lord is my shepherd”?",option_a:"Proverbs",option_b:"Job",option_c:"Psalms",option_d:"Isaiah",correct_answer:"Psalms",explanation:"These familiar words begin David's psalm of trust in God's care.",scripture_reference:"Psalm 23:1",bible_book:"Psalms",testament:"Old Testament",category:"Bible Verses and References",difficulty:"Beginner"},
  {id:"q15",question:"According to Proverbs, what is the beginning of knowledge?",option_a:"Strength",option_b:"The fear of the Lord",option_c:"Riches",option_d:"Experience",correct_answer:"The fear of the Lord",explanation:"Proverbs teaches that reverence for the Lord is the beginning of knowledge.",scripture_reference:"Proverbs 1:7",bible_book:"Proverbs",testament:"Old Testament",category:"Bible Verses and References",difficulty:"Intermediate"},
  {id:"q16",question:"Who was swallowed by a great fish after trying to flee from God's call?",option_a:"Amos",option_b:"Jonah",option_c:"Micah",option_d:"Hosea",correct_answer:"Jonah",explanation:"The Lord provided a great fish to swallow Jonah, and Jonah was inside it for three days and nights.",scripture_reference:"Jonah 1:17",bible_book:"Jonah",testament:"Old Testament",category:"Bible Characters",difficulty:"Beginner"},
  {id:"q17",question:"Which prophet interpreted dreams for King Nebuchadnezzar?",option_a:"Ezekiel",option_b:"Daniel",option_c:"Jeremiah",option_d:"Zechariah",correct_answer:"Daniel",explanation:"God revealed the meaning of the king's dream to Daniel, who then explained it to Nebuchadnezzar.",scripture_reference:"Daniel 2:19, 27–28",bible_book:"Daniel",testament:"Old Testament",category:"Kings and Prophets",difficulty:"Intermediate"},
  {id:"q18",question:"In which town was Jesus born?",option_a:"Nazareth",option_b:"Jerusalem",option_c:"Bethlehem",option_d:"Capernaum",correct_answer:"Bethlehem",explanation:"Jesus was born in Bethlehem in Judea, as the prophet had written.",scripture_reference:"Matthew 2:1; Micah 5:2",bible_book:"Matthew",testament:"New Testament",category:"The Life of Jesus Christ",difficulty:"Beginner"},
  {id:"q19",question:"Who baptized Jesus in the Jordan River?",option_a:"Peter",option_b:"John the Baptist",option_c:"James",option_d:"Andrew",correct_answer:"John the Baptist",explanation:"John baptized Jesus in the Jordan, and the Spirit of God descended like a dove.",scripture_reference:"Matthew 3:13–17",bible_book:"Matthew",testament:"New Testament",category:"The Life of Jesus Christ",difficulty:"Beginner"},
  {id:"q20",question:"How many loaves and fish were used to feed the five thousand?",option_a:"Five loaves and two fish",option_b:"Seven loaves and one fish",option_c:"Two loaves and five fish",option_d:"Twelve loaves and two fish",correct_answer:"Five loaves and two fish",explanation:"A boy had five barley loaves and two fish, which Jesus blessed and multiplied.",scripture_reference:"John 6:9–13",bible_book:"John",testament:"New Testament",category:"Miracles of Jesus",difficulty:"Beginner"},
  {id:"q21",question:"What was the first miracle Jesus performed, according to John's Gospel?",option_a:"Healing a blind man",option_b:"Walking on water",option_c:"Turning water into wine",option_d:"Raising Lazarus",correct_answer:"Turning water into wine",explanation:"At a wedding in Cana, Jesus turned water into wine; John calls this the first of his signs.",scripture_reference:"John 2:1–11",bible_book:"John",testament:"New Testament",category:"Miracles of Jesus",difficulty:"Intermediate"},
  {id:"q22",question:"Which parable tells of a son who returns home and is welcomed by his father?",option_a:"The Good Samaritan",option_b:"The lost sheep",option_c:"The prodigal son",option_d:"The sower",correct_answer:"The prodigal son",explanation:"Jesus tells of a younger son who returns repentant and is joyfully welcomed by his father.",scripture_reference:"Luke 15:11–24",bible_book:"Luke",testament:"New Testament",category:"Parables of Jesus",difficulty:"Beginner"},
  {id:"q23",question:"What happened to Jesus on the third day after his crucifixion?",option_a:"He appeared before Pilate",option_b:"He rose from the dead",option_c:"He went to Galilee",option_d:"He ascended to heaven",correct_answer:"He rose from the dead",explanation:"The Gospels testify that Jesus rose from the dead on the third day.",scripture_reference:"Luke 24:6–7",bible_book:"Luke",testament:"New Testament",category:"The Life of Jesus Christ",difficulty:"Beginner"},
  {id:"q24",question:"What appeared above the disciples at Pentecost?",option_a:"A pillar of cloud",option_b:"Tongues like fire",option_c:"A bright star",option_d:"A dove",correct_answer:"Tongues like fire",explanation:"At Pentecost, what seemed to be tongues of fire rested on the disciples, and they were filled with the Holy Spirit.",scripture_reference:"Acts 2:1–4",bible_book:"Acts",testament:"New Testament",category:"Biblical Events",difficulty:"Intermediate"},
  {id:"q25",question:"On which road did Saul encounter Jesus?",option_a:"The road to Jericho",option_b:"The road to Emmaus",option_c:"The road to Damascus",option_d:"The road to Bethlehem",correct_answer:"The road to Damascus",explanation:"Saul was traveling to Damascus when a light from heaven flashed around him and Jesus spoke to him.",scripture_reference:"Acts 9:3–6",bible_book:"Acts",testament:"New Testament",category:"Bible Geography",difficulty:"Beginner"},
  {id:"q26",question:"According to 1 Corinthians, which three things remain?",option_a:"Faith, hope, and love",option_b:"Prayer, fasting, and giving",option_c:"Wisdom, courage, and peace",option_d:"Grace, law, and truth",correct_answer:"Faith, hope, and love",explanation:"Paul says these three remain, and the greatest of them is love.",scripture_reference:"1 Corinthians 13:13",bible_book:"1 Corinthians",testament:"New Testament",category:"Bible Verses and References",difficulty:"Intermediate"},
  {id:"q27",question:"What is described as the fruit of the Spirit in Galatians?",option_a:"Faith, hope, and wisdom",option_b:"Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control",option_c:"Prayer, service, and courage",option_d:"Justice, mercy, and humility",correct_answer:"Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control",explanation:"Paul lists these qualities as the fruit of the Spirit.",scripture_reference:"Galatians 5:22–23",bible_book:"Galatians",testament:"New Testament",category:"Christian Knowledge",difficulty:"Advanced"},
  {id:"q28",question:"What does Ephesians call the word of God in the armor of God passage?",option_a:"The shield of faith",option_b:"The helmet of salvation",option_c:"The sword of the Spirit",option_d:"The belt of truth",correct_answer:"The sword of the Spirit",explanation:"Paul identifies the sword of the Spirit as the word of God.",scripture_reference:"Ephesians 6:17",bible_book:"Ephesians",testament:"New Testament",category:"Christian Knowledge",difficulty:"Intermediate"},
  {id:"q29",question:"Who wrote many of the letters in the New Testament?",option_a:"Moses",option_b:"Paul",option_c:"Elijah",option_d:"Solomon",correct_answer:"Paul",explanation:"The New Testament includes many letters traditionally attributed to Paul, written to churches and individuals.",scripture_reference:"Romans 1:1; 1 Corinthians 1:1",bible_book:"Romans",testament:"New Testament",category:"Apostles and Disciples",difficulty:"Beginner"},
  {id:"q30",question:"What is the final book of the Bible?",option_a:"Jude",option_b:"Acts",option_c:"Hebrews",option_d:"Revelation",correct_answer:"Revelation",explanation:"Revelation is the final book in the Christian biblical canon.",scripture_reference:"Revelation 1:1",bible_book:"Revelation",testament:"New Testament",category:"New Testament",difficulty:"Beginner"},
  {id:"q31",question:"What did Jesus say are the two greatest commandments?",option_a:"Pray often and fast",option_b:"Love God and love your neighbor",option_c:"Give generously and forgive",option_d:"Keep the Sabbath and honor parents",correct_answer:"Love God and love your neighbor",explanation:"Jesus summarized the law and prophets as loving God fully and loving your neighbor as yourself.",scripture_reference:"Matthew 22:37–40",bible_book:"Matthew",testament:"New Testament",category:"Christian Knowledge",difficulty:"Intermediate"},
  {id:"q32",question:"Who was the mother of Samuel?",option_a:"Hannah",option_b:"Deborah",option_c:"Abigail",option_d:"Miriam",correct_answer:"Hannah",explanation:"Hannah prayed for a child and later dedicated Samuel to the Lord's service.",scripture_reference:"1 Samuel 1:20, 27–28",bible_book:"1 Samuel",testament:"Old Testament",category:"Women in the Bible",difficulty:"Intermediate"},
  {id:"q33",question:"In Jesus' parable, who stopped to help the injured man on the road?",option_a:"A priest",option_b:"A Levite",option_c:"A Samaritan",option_d:"A soldier",correct_answer:"A Samaritan",explanation:"A Samaritan saw the injured man, took pity on him, and cared for him.",scripture_reference:"Luke 10:30–37",bible_book:"Luke",testament:"New Testament",category:"Parables of Jesus",difficulty:"Beginner"},
  {id:"q34",question:"Where did the Israelites cross the sea while fleeing Egypt?",option_a:"The Sea of Galilee",option_b:"The Red Sea",option_c:"The Mediterranean Sea",option_d:"The Jordan River",correct_answer:"The Red Sea",explanation:"God made a path through the sea so the Israelites could escape Pharaoh's army.",scripture_reference:"Exodus 14:21–22",bible_book:"Exodus",testament:"Old Testament",category:"Bible Geography",difficulty:"Beginner"},
  {id:"q35",question:"Which disciple denied knowing Jesus three times?",option_a:"Thomas",option_b:"Peter",option_c:"Judas",option_d:"Philip",correct_answer:"Peter",explanation:"As Jesus had foretold, Peter denied knowing him three times before the rooster crowed.",scripture_reference:"Luke 22:54–62",bible_book:"Luke",testament:"New Testament",category:"Apostles and Disciples",difficulty:"Beginner"},
  {id:"q36",question:"Who was the first martyr of the early church described in Acts?",option_a:"James",option_b:"Stephen",option_c:"Barnabas",option_d:"Philip",correct_answer:"Stephen",explanation:"Stephen, full of the Holy Spirit, was stoned after bearing witness before the Sanhedrin.",scripture_reference:"Acts 7:54–60",bible_book:"Acts",testament:"New Testament",category:"Bible History",difficulty:"Advanced"},
  {id:"q37",question:"What was the name of Abraham's wife?",option_a:"Rebekah",option_b:"Rachel",option_c:"Sarah",option_d:"Leah",correct_answer:"Sarah",explanation:"God promised Abraham and Sarah a son, Isaac, in their old age.",scripture_reference:"Genesis 17:15–19; 21:1–3",bible_book:"Genesis",testament:"Old Testament",category:"Women in the Bible",difficulty:"Beginner"},
  {id:"q38",question:"Which prophet challenged the prophets of Baal on Mount Carmel?",option_a:"Elisha",option_b:"Elijah",option_c:"Nathan",option_d:"Samuel",correct_answer:"Elijah",explanation:"Elijah challenged the prophets of Baal, and the Lord answered by fire.",scripture_reference:"1 Kings 18:20–39",bible_book:"1 Kings",testament:"Old Testament",category:"Kings and Prophets",difficulty:"Intermediate"},
  {id:"q39",question:"What is the first book of the New Testament?",option_a:"Mark",option_b:"Luke",option_c:"Matthew",option_d:"Acts",correct_answer:"Matthew",explanation:"Matthew appears first among the four Gospels and is the first book of the New Testament.",scripture_reference:"Matthew 1:1",bible_book:"Matthew",testament:"New Testament",category:"New Testament",difficulty:"Beginner"},
  {id:"q40",question:"In which city were Jesus' followers first called Christians?",option_a:"Jerusalem",option_b:"Antioch",option_c:"Rome",option_d:"Ephesus",correct_answer:"Antioch",explanation:"The disciples were first called Christians in Antioch.",scripture_reference:"Acts 11:26",bible_book:"Acts",testament:"New Testament",category:"Bible Geography",difficulty:"Advanced"}
];
const state = {client:null,user:null,role:"user",serverHistory:null,questions:[],answers:[],flags:new Set(),index:0,seconds:0,totalSeconds:0,deadline:0,timerId:null,warningShown:false,quizConfig:null,lastResult:null,reviewExpanded:false,quizOpen:false};
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function readStorage(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||{history:[],settings:{}}}catch(error){console.error("Could not read saved quiz data",error);return{history:[],settings:{}}}}
function writeStorage(data){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(data))}catch(error){console.error("Could not save quiz data",error);notify("Could not save data on this device.")}}
function esc(value){return String(value??"").replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function notify(message){const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(notify.timeout);notify.timeout=setTimeout(()=>toast.classList.remove("show"),2600)}
function getQuestions(){return state.client?[]:demoQuestions}
function iconFor(name){return categories.find(item=>item.name===name)?.icon||"✦"}
function shuffled(array){const copy=[...array];for(let i=copy.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]]}return copy}
function escapeText(value){return esc(value)}

function setupSupabase(){
  if(!SUPABASE_URL||!SUPABASE_ANON_KEY||!window.supabase?.createClient)return;
  state.client=window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY);
  state.client.auth.getSession().then(async({data,error})=>{if(error)throw error;state.user=data.session?.user||null;await refreshUserState()}).catch(error=>{console.error("Unable to read session",error);notify("Account session could not be loaded.")});
  state.client.auth.onAuthStateChange((_event,session)=>{state.user=session?.user||null;setTimeout(refreshUserState,0)});
}
async function refreshUserState(){
  state.role="user";state.serverHistory=null;
  if(state.user&&state.client){
    try{const {data,error}=await state.client.rpc("current_user_role");if(error)throw error;state.role=data||"user"}catch(error){console.error("Unable to load account role",error)}
    try{const {data,error}=await state.client.from("quiz_attempts").select("id,category,difficulty,total_questions,correct_answers,wrong_answers,unanswered_questions,score,percentage,time_used,completed_at").order("completed_at",{ascending:false}).limit(100);if(error)throw error;state.serverHistory=(data||[]).map(item=>({...item,total:item.total_questions,correct:item.correct_answers,wrong:item.wrong_answers,unanswered:item.unanswered_questions,timeUsed:item.time_used,date:item.completed_at,book:"All"}))}catch(error){console.error("Unable to load quiz history",error)}
  }
  renderAccount();if($("#page-history").classList.contains("active"))renderHistory();if($("#page-admin").classList.contains("active")&&state.role==="admin")loadAdminQuestions();
  $("#stat-quizzes").textContent=state.user?(state.serverHistory||[]).length:(readStorage().history||[]).length;
}
function renderAccount(){const name=state.user?.user_metadata?.full_name||state.user?.email?.split("@")[0]||readStorage().settings?.name||"Guest learner";$("#user-name").textContent=name;$("#user-label").textContent=state.user?"Signed in":"Create an account";$("#welcome-name").textContent=`Welcome back, ${name} 👋`;$("#top-account").textContent=(name[0]||"G").toUpperCase();$(".admin-link").hidden=state.role!=="admin"}
function renderHome(){
  const saved=readStorage(),history=saved.history||[];$("#stat-quizzes").textContent=history.length;$("#stat-questions").textContent=`${demoQuestions.length}+`;
  $("#featured-categories").innerHTML=categories.slice(0,4).map(categoryCard).join("");
  $("#all-categories").innerHTML=categories.map(categoryCard).join("");
  $("#recent-list").innerHTML=demoQuestions.slice(-4).reverse().map(q=>`<div class="recent-item"><span class="recent-book">${iconFor(q.category)}</span><div class="recent-detail"><strong>${esc(q.question)}</strong><small>${esc(q.bible_book)} · ${esc(q.category)}</small></div><span class="recent-date">${esc(q.scripture_reference)}</span></div>`).join("");
  const leaders=[{name:"Grace M.",score:"98%"},{name:"Daniel K.",score:"95%"},{name:"Sarah J.",score:"92%"}];
  $("#leaderboard-mini").innerHTML=leaders.map((person,index)=>`<div class="rank-row"><span class="rank-num ${index===0?"first":""}">${index+1}</span><span class="rank-avatar">${person.name[0]}</span><span class="rank-name">${person.name}</span><span class="rank-score">${person.score}</span></div>`).join("");
  if(state.client)state.client.rpc("get_leaderboard").then(({data,error})=>{if(error)throw error;const rows=(data||[]).slice(0,3);$("#leaderboard-mini").innerHTML=rows.length?rows.map((person,index)=>`<div class="rank-row"><span class="rank-num ${index===0?"first":""}">${index+1}</span><span class="rank-avatar">${esc(person.name[0]||"L")}</span><span class="rank-name">${esc(person.name)}</span><span class="rank-score">${person.average}%</span></div>`).join(""):'<div class="history-empty">Complete a quiz to appear here.</div>'}).catch(error=>{console.error("Unable to load home leaderboard",error);$("#leaderboard-mini").innerHTML='<div class="history-empty">Leaderboard could not be loaded.</div>'});
  $("#daily-question").textContent=demoQuestions[0].question;
}
function categoryCard(category){return `<article class="category-card" tabindex="0" role="button" data-category="${esc(category.name)}"><span class="cat-icon">${category.icon}</span><strong>${esc(category.name)}</strong><small>${esc(category.detail)}</small><span class="category-arrow">↗</span></article>`}
function fillConfig(){
  $("#config-category").innerHTML='<option value="All">All categories</option>'+categories.map(category=>`<option value="${esc(category.name)}">${esc(category.name)}</option>`).join("");
  const allBooks=[...books["Old Testament"],...books["New Testament"]];
  $("#config-book").innerHTML='<option value="All">All books</option>'+allBooks.map(book=>`<option>${esc(book)}</option>`).join("");
  $("#book-groups").innerHTML=Object.entries(books).map(([testament,list])=>`<section class="book-group"><h2>${testament} <span class="scripture">${list.length} books</span></h2><div class="book-list">${list.map(book=>`<button class="book-chip" data-book="${esc(book)}">${esc(book)} <span>→</span></button>`).join("")}</div></section>`).join("");
}
function setPage(name){
  if(state.quizOpen&&name!=="quiz"&&name!=="results"){notify("Submit or finish your quiz before leaving the examination.");return}
  if(name==="admin"&&state.role!=="admin"){notify("Administrator access is required.");return}
  $$(".page").forEach(page=>page.classList.toggle("active",page.id===`page-${name}`));
  $$(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.page===name));
  if(name==="history")renderHistory();if(name==="leaderboard")renderLeaderboard();if(name==="admin")loadAdminQuestions();
  $("#sidebar").classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});
}
function showModal(id){$("#"+id).classList.add("open")}
function closeModal(overlay){overlay.classList.remove("open")}
function openConfig(values={}){
  $("#config-category").value=values.category||"All";$("#config-book").value=values.book||"All";
  $("#config-difficulty").value=values.difficulty||"Beginner";$("#config-count").value=String(values.count||10);
  showModal("config-modal");
}
function filterDemo(category,book,difficulty){
  let list=demoQuestions;
  if(category&&category!=="All"){list=list.filter(q=>q.category===category||((category==="Old Testament"||category==="New Testament")&&q.testament===category))}
  if(book&&book!=="All")list=list.filter(q=>q.bible_book===book);
  if(difficulty&&difficulty!=="All"){
    const level={Beginner:1,Intermediate:2,Advanced:3,Expert:4};
    list=list.filter(q=>(level[q.difficulty]||1)<=level[difficulty]);
  }
  return list;
}
async function loadQuestions(config,count){
  if(!state.client)return shuffled(filterDemo(config.category,config.book,config.difficulty)).slice(0,count);
  let query=state.client.from("bible_questions").select("id,question,option_a,option_b,option_c,option_d,explanation,scripture_reference,bible_book,testament,category,difficulty");
  if(config.category!=="All"&&config.category!=="Old Testament"&&config.category!=="New Testament")query=query.eq("category",config.category);
  if(config.category==="Old Testament"||config.category==="New Testament")query=query.eq("testament",config.category);
  if(config.book!=="All")query=query.eq("bible_book",config.book);
  if(config.difficulty)query=query.in("difficulty",allowedDifficulties(config.difficulty));
  const {data,error}=await query.limit(500);if(error)throw error;
  return shuffled(data||[]).slice(0,count).map(q=>({...q,options:shuffled([q.option_a,q.option_b,q.option_c,q.option_d])}));
}
function allowedDifficulties(value){const values=["Beginner","Intermediate","Advanced","Expert"];return values.slice(0,values.indexOf(value)+1)}
async function beginQuiz(config){
  if(state.client&&!state.user){notify("Sign in to take a secure, saved examination.");showModal("auth-modal");return}
  const requested=Number(config.count);
  let loaded;try{loaded=await loadQuestions(config,requested)}catch(error){console.error("Unable to load quiz questions",error);notify("Questions could not be loaded. Check your Supabase setup.");return}
  if(!loaded.length){notify("No questions found for this selection yet. Try another category or book.");return}
  const duration=loaded.length*30;
  state.quizConfig={...config,count:loaded.length};state.questions=loaded.map(q=>({...q,options:q.options||shuffled([q.option_a,q.option_b,q.option_c,q.option_d])}));state.answers=Array(loaded.length).fill(null);state.flags=new Set();state.index=0;state.seconds=duration;state.totalSeconds=duration;state.deadline=Date.now()+duration*1000;state.warningShown=false;state.quizOpen=true;state.reviewExpanded=false;state.lastResult=null;
  closeModal($("#config-modal"));setPage("quiz");$("#quiz-title").textContent=config.book!=="All"?config.book:(config.category==="All"?"Bible Knowledge Quiz":config.category);$("#quiz-category-tag").textContent=(config.category==="All"?(config.book!=="All"?findTestament(config.book):"ALL CATEGORIES"):config.category).toUpperCase();$("#quiz-subtitle").textContent=`${config.difficulty} · ${loaded.length} questions · ${Math.floor(duration/60)} minute${duration/60===1?"":"s"}`;
  saveAttempt();
  renderQuestion();startTimer();
}
function findTestament(book){return books["Old Testament"].includes(book)?"Old Testament":"New Testament"}
function renderQuestion(){
  const q=state.questions[state.index];if(!q)return;
  $("#question-count").textContent=`Question ${state.index+1} of ${state.questions.length}`;$("#question-topic").textContent=(q.bible_book||"SCRIPTURE").toUpperCase();$("#question-difficulty").textContent=(q.difficulty||"BEGINNER").toUpperCase();$("#question-text").textContent=q.question;
  const answer=state.answers[state.index];
  $("#answer-list").innerHTML=q.options.map((option,i)=>`<button class="answer-option ${answer===option?"selected":""}" data-answer="${esc(option)}"><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${esc(option)}</span></button>`).join("");
  $("#feedback").className="feedback";$("#feedback").textContent="";
  $("#previous-question").disabled=state.index===0;$("#previous-question").style.opacity=state.index===0?".45":"1";
  $("#next-question").textContent=state.index===state.questions.length-1?"Review answers →":"Next Question →";
  renderNavigator();saveAttempt();
}
function renderNavigator(){
  const answered=state.answers.filter(a=>a!==null).length;
  $("#answered-count").textContent=answered;$("#remaining-count").textContent=state.questions.length-answered;$("#nav-progress").textContent=`${answered}/${state.questions.length}`;$("#progress-fill").style.width=`${answered/state.questions.length*100}%`;
  $("#question-grid").innerHTML=state.questions.map((_q,i)=>`<button class="question-num ${i===state.index?"current":""} ${state.answers[i]!==null?"answered":""} ${state.flags.has(i)?"flagged":""}" data-index="${i}" aria-label="Question ${i+1}${state.answers[i]!==null?", answered":", unanswered"}">${i+1}</button>`).join("");
}
function chooseAnswer(event){
  const button=event.target.closest("[data-answer]");if(!button||!state.quizOpen)return;
  state.answers[state.index]=button.dataset.answer;renderQuestion();
}
function nextQuestion(){if(state.index<state.questions.length-1){state.index++;renderQuestion()}else{$("#question-grid").scrollIntoView({block:"nearest",behavior:"smooth"});notify("Check your answers, then submit when you're ready.")}}
function previousQuestion(){if(state.index>0){state.index--;renderQuestion()}}
function startTimer(){
  clearInterval(state.timerId);if(!state.deadline)state.deadline=Date.now()+state.seconds*1000;updateTimer();
  state.timerId=setInterval(()=>{state.seconds=Math.max(0,Math.ceil((state.deadline-Date.now())/1000));updateTimer();if(state.seconds<=60&&state.seconds>0&&!state.warningShown){state.warningShown=true;notify("One minute remaining. Keep going!")}if(state.seconds<=0){clearInterval(state.timerId);notify("Time is up. Your quiz is being submitted.");submitQuiz(true)}},250);
}
function updateTimer(){const seconds=Math.max(0,state.seconds),minute=String(Math.floor(seconds/60)).padStart(2,"0"),remaining=String(seconds%60).padStart(2,"0");$("#timer").textContent=`◷ ${minute}:${remaining}`;$("#timer").classList.toggle("warning",seconds<=60)}
function saveAttempt(){
  if(!state.quizOpen)return;
  try{sessionStorage.setItem("wordwise-attempt",JSON.stringify({config:state.quizConfig,questions:state.questions,answers:state.answers,flags:[...state.flags],index:state.index,totalSeconds:state.totalSeconds,deadline:state.deadline}))}
  catch(error){console.error("Could not preserve timed examination",error);notify("This browser could not preserve the quiz timer. Keep this tab open.")}
}
function restoreAttempt(){
  let saved;try{saved=JSON.parse(sessionStorage.getItem("wordwise-attempt")||"null")}catch(error){console.error("Unable to restore examination",error);return}
  if(!saved||!Array.isArray(saved.questions)||!Array.isArray(saved.answers)||!saved.deadline)return;
  state.quizConfig=saved.config;state.questions=saved.questions;state.answers=saved.answers;state.flags=new Set(saved.flags||[]);state.index=Math.min(saved.index||0,state.questions.length-1);state.totalSeconds=saved.totalSeconds;state.deadline=saved.deadline;state.seconds=Math.ceil((state.deadline-Date.now())/1000);state.warningShown=state.seconds<=60;state.quizOpen=true;
  $("#quiz-title").textContent=state.quizConfig.book!=="All"?state.quizConfig.book:(state.quizConfig.category==="All"?"Bible Knowledge Quiz":state.quizConfig.category);$("#quiz-category-tag").textContent=(state.quizConfig.category==="All"?(state.quizConfig.book!=="All"?findTestament(state.quizConfig.book):"ALL CATEGORIES"):state.quizConfig.category).toUpperCase();$("#quiz-subtitle").textContent=`${state.quizConfig.difficulty} · ${state.questions.length} questions · timed examination`;
  setPage("quiz");renderQuestion();if(state.seconds<=0)submitQuiz(true);else startTimer();
}
async function submitQuiz(timeExpired=false){
  if(!state.quizOpen)return;
  const empty=state.answers.filter(answer=>answer===null).length;
  if(!timeExpired&&empty&& !window.confirm(`You have ${empty} unanswered question${empty===1?"":"s"}. Submit your quiz?`))return;
  clearInterval(state.timerId);state.quizOpen=false;
  let result;
  if(state.client&&state.user){
    try{
      const {data,error}=await state.client.rpc("submit_quiz",{p_category:state.quizConfig.category,p_difficulty:state.quizConfig.difficulty,p_book:state.quizConfig.book,p_time_used:state.totalSeconds-state.seconds,p_responses:state.questions.map((q,i)=>({question_id:q.id,selected_answer:state.answers[i]}))});
      if(error)throw error;
      result=normalizeServerResult(data);
    }catch(error){console.error("Secure quiz submission failed",error);state.quizOpen=true;notify("We couldn't save your quiz securely. Please try submitting again.");return}
  }else{
    const reviews=state.questions.map((q,i)=>({question:q.question,options:q.options,selected:state.answers[i],correct:q.correct_answer,explanation:q.explanation,reference:q.scripture_reference,book:q.bible_book,correctStatus:state.answers[i]===q.correct_answer}));
    result=makeResult(reviews,state.totalSeconds-state.seconds);
  }
  state.lastResult=result;persistResult(result);sessionStorage.removeItem("wordwise-attempt");renderResults(result);setPage("results");if(state.client&&state.user)refreshUserState();
}
function normalizeServerResult(payload){
  const value=Array.isArray(payload)?payload[0]:payload;if(!value||!value.review)throw new Error("Unexpected submission response.");
  const reviews=value.review.map(item=>({question:item.question,options:item.options,selected:item.selected_answer,correct:item.correct_answer,explanation:item.explanation,reference:item.scripture_reference,book:item.bible_book,correctStatus:item.correct_status}));
  return makeResult(reviews,Number(value.time_used)||0,{total:Number(value.total_questions),correct:Number(value.correct_answers),wrong:Number(value.wrong_answers),unanswered:Number(value.unanswered_questions),score:Number(value.score),percentage:Number(value.percentage)});
}
function makeResult(reviews,timeUsed,server={}){
  const correct=server.correct??reviews.filter(item=>item.correctStatus).length,total=server.total??reviews.length,unanswered=server.unanswered??reviews.filter(item=>item.selected===null).length,wrong=server.wrong??total-correct-unanswered,percentage=server.percentage??(total?Math.round(correct/total*100):0);
  return{reviews,total,correct,wrong,unanswered,score:server.score??correct,percentage,timeUsed,category:state.quizConfig?.category||"All categories",book:state.quizConfig?.book||"All",difficulty:state.quizConfig?.difficulty||"Beginner",date:new Date().toISOString()};
}
function persistResult(result){
  if(state.client&&state.user)return;
  const saved=readStorage();saved.history=saved.history||[];saved.history.unshift(result);writeStorage(saved);
}
function gradeFor(percentage){if(percentage>=90)return["EXCELLENT","Excellent work!","Outstanding understanding of Scripture."];if(percentage>=80)return["VERY GOOD","Very good!","You have a strong grasp of these passages."];if(percentage>=70)return["GOOD","Good work!","Keep exploring, and your understanding will keep growing."];if(percentage>=60)return["FAIR","A good foundation.","Review a few passages and try again when you're ready."];if(percentage>=50)return["PASS","Keep learning.","Every question is an opportunity to grow in the Word."];return["KEEP GROWING","Your journey continues.","Take a moment to review the passages and try again."]}
function renderResults(result){
  const grade=gradeFor(result.percentage);$("#result-heading").textContent=result.percentage>=70?"Well done!":"Quiz complete";$("#result-description").textContent="Every step in the Word is a step worth taking.";$("#result-percent").textContent=`${result.percentage}%`;$("#score-ring").style.setProperty("--score",`${result.percentage}%`);$("#result-grade").textContent=grade[0];$("#result-title").textContent=grade[1];$("#result-message").textContent=grade[2];$("#result-total").textContent=result.total;$("#result-correct").textContent=result.correct;$("#result-wrong").textContent=result.wrong;$("#result-unanswered").textContent=result.unanswered;$("#result-time").textContent=formatTime(result.timeUsed);$("#chart-correct-label").textContent=result.correct;$("#chart-wrong-label").textContent=result.wrong;$("#chart-correct").style.width=`${result.total?result.correct/result.total*100:0}%`;$("#chart-wrong").style.width=`${result.total?result.wrong/result.total*100:0}%`;
  $("#review-list").innerHTML=result.reviews.map((item,index)=>`<article class="review-item ${state.reviewExpanded?"":"review-collapsed"}"><div class="review-item-head"><span class="review-mark ${item.correctStatus?"good":"bad"}">${item.correctStatus?"✓":"×"}</span><h3>${index+1}. ${esc(item.question)}</h3></div><div class="review-options">${(item.options||[]).map(option=>`<div class="review-option ${option===item.correct?"correct":""} ${option===item.selected&&option!==item.correct?"incorrect":""}"><span>${option===item.correct?"✓":option===item.selected?"×":"·"}</span>${esc(option)}</div>`).join("")}</div><div class="review-answer"><strong class="review-status ${item.correctStatus?"good":"bad"}">${item.correctStatus?"Correct Answer!":item.selected===null?"Unanswered.":"Incorrect Answer."}</strong><br>Your answer: ${item.selected===null?"<em>Not answered</em>":esc(item.selected)}<br><strong>Correct answer: ${esc(item.correct)}</strong></div><p class="review-explanation">${esc(item.explanation||"Review the cited passage to learn more.")} <span class="review-ref">${esc(item.reference||item.book||"")}</span></p></article>`).join("");
  $$(".review-collapsed").forEach((item,index)=>{if(index>2)item.hidden=true});
  const storage=readStorage();$("#stat-quizzes").textContent=(storage.history||[]).length;
}
function formatTime(seconds){return`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`}
function renderHistory(){
  const history=state.user&&state.serverHistory?state.serverHistory:readStorage().history||[];
  $("#history-list").innerHTML=history.length?history.map((item,index)=>`<div class="history-row"><span class="stat-icon ${index%2?"blue":"gold"}">◷</span><div><strong>${esc(item.book!=="All"?item.book:item.category)} · ${item.total} questions</strong><small>${new Date(item.date).toLocaleDateString()} · ${esc(item.difficulty)} · ${formatTime(item.timeUsed)}</small></div><span class="history-score">${item.percentage}%</span></div>`).join(""):'<div class="history-empty">Your quiz results will appear here. Start a quiz to begin your learning history.</div>';
}
function renderLeaderboard(){
  const history=readStorage().history||[],own=history.length?[{name:state.user?.user_metadata?.full_name||readStorage().settings?.name||"You",score:`${history[0].percentage}%`,quizzes:history.length}, {name:"Grace M.",score:"98%",quizzes:42},{name:"Daniel K.",score:"95%",quizzes:36},{name:"Sarah J.",score:"92%",quizzes:29}]:[{name:"Grace M.",score:"98%",quizzes:42},{name:"Daniel K.",score:"95%",quizzes:36},{name:"Sarah J.",score:"92%",quizzes:29}];
  if(state.client){$("#leaderboard-list").innerHTML='<div class="history-empty">Loading leaderboard…</div>';state.client.rpc("get_leaderboard").then(({data,error})=>{if(error)throw error;const rows=data||[];$("#leaderboard-list").innerHTML=rows.length?rows.map((item,index)=>`<div class="history-row"><span class="rank-num ${index===0?"first":""}">${index+1}</span><span class="rank-avatar">${esc(item.name[0]||"L")}</span><div><strong>${esc(item.name)}</strong><small>${item.quizzes} quizzes completed · ${item.average}% average</small></div><span class="history-score">${item.average}%</span></div>`).join(""):'<div class="history-empty">Complete quizzes to appear on the leaderboard.</div>'}).catch(error=>{console.error("Unable to load leaderboard",error);$("#leaderboard-list").innerHTML='<div class="history-empty">Leaderboard could not be loaded.</div>'});return}
  $("#leaderboard-list").innerHTML=own.map((item,index)=>`<div class="history-row"><span class="rank-num ${index===0?"first":""}">${index+1}</span><span class="rank-avatar">${item.name[0]}</span><div><strong>${esc(item.name)}</strong><small>${item.quizzes} quizzes completed</small></div><span class="history-score">${item.score}</span></div>`).join("");
}
function startRetake(){if(!state.lastResult)return;const previous=state.lastResult;beginQuiz({category:previous.category,book:previous.book,difficulty:previous.difficulty,count:String(previous.total)})}
async function handleAuth(event){
  event.preventDefault();if(!state.client){notify("Add your Supabase URL and publishable key in js/app.js to enable sign-in.");return}
  const email=$("#auth-email").value.trim(),password=$("#auth-password").value,name=$("#auth-name").value.trim();
  if(password.length<6){notify("Password must be at least 6 characters.");return}
  try{
    const response=name?await state.client.auth.signUp({email,password,options:{data:{full_name:name}}}):await state.client.auth.signInWithPassword({email,password});
    if(response.error)throw response.error;
    if(name&&!response.data.session)notify("Check your email to confirm your new account.");else{closeModal($("#auth-modal"));notify("You’re signed in. Welcome!")}
  }catch(error){console.error("Authentication failed",error);notify(error.message||"Unable to sign in. Please try again.")}
}
function search(query){
  if(!query.trim())return;
  const term=query.toLowerCase(),match=demoQuestions.find(q=>q.question.toLowerCase().includes(term)||q.bible_book.toLowerCase().includes(term)||q.category.toLowerCase().includes(term));
  if(match){openConfig({category:match.category,book:match.bible_book});notify(`Explore questions from ${match.bible_book}.`)}else notify("No matching question found. Try a book or category name.");
}
function populateAdminForm(){
  const allBooks=[...books["Old Testament"],...books["New Testament"]];
  $("#admin-book").innerHTML=allBooks.map(book=>`<option>${esc(book)}</option>`).join("");
  $("#admin-category").innerHTML=categories.map(category=>`<option>${esc(category.name)}</option>`).join("");
}
async function loadAdminQuestions(){
  if(!state.client||!state.user||state.role!=="admin"){notify("Administrator access is required.");setPage("dashboard");return}
  try{
    const {data,error}=await state.client.rpc("admin_list_questions");if(error)throw error;
    const items=data||[];
    $("#admin-question-list").innerHTML=items.length?items.map(item=>`<article class="admin-question-row"><div><strong>${esc(item.question)}</strong><small>${esc(item.bible_book)} · ${esc(item.category)} · ${esc(item.scripture_reference)}</small></div><div class="admin-question-actions"><button data-edit-question="${esc(item.id)}">Edit</button><button class="delete-question" data-delete-question="${esc(item.id)}">Delete</button></div></article>`).join(""):'<div class="admin-empty">No questions yet. Add one or import a CSV question bank.</div>';
    state.adminQuestions=items;
  }catch(error){console.error("Unable to load admin question bank",error);notify(error.message||"Unable to load question bank.")}
}
function clearAdminForm(){
  $("#admin-question-form").reset();$("#admin-question-id").value="";$("#admin-save").textContent="Add question";$("#admin-cancel").hidden=true;
}
function editAdminQuestion(id){
  const q=(state.adminQuestions||[]).find(item=>item.id===id);if(!q)return;
  $("#admin-question-id").value=q.id;$("#admin-question").value=q.question;
  ["a","b","c","d"].forEach((letter,index)=>{$(`#admin-option-${letter}`).value=q[`option_${letter}`]||q[`option_${letter.toUpperCase()}`]||""});
  const options=["a","b","c","d"].map(letter=>$("#admin-option-"+letter).value);
  $("#admin-correct").value=String.fromCharCode(65+options.indexOf(q.correct_answer));
  $("#admin-explanation").value=q.explanation||"";$("#admin-reference").value=q.scripture_reference||"";$("#admin-book").value=q.bible_book;$("#admin-category").value=q.category;$("#admin-difficulty").value=q.difficulty;
  $("#admin-save").textContent="Save changes";$("#admin-cancel").hidden=false;$("#admin-question").focus();
}
async function saveAdminQuestion(event){
  event.preventDefault();if(!state.client||state.role!=="admin"){notify("Administrator access is required.");return}
  const letters=["a","b","c","d"],options=letters.map(letter=>$("#admin-option-"+letter).value.trim()),correctLetter=$("#admin-correct").value;
  if(!correctLetter||options.some(option=>!option)||new Set(options).size!==4){notify("Provide four different answer options and choose the correct one.");return}
  const book=$("#admin-book").value,question={id:$("#admin-question-id").value||null,question:$("#admin-question").value.trim(),option_a:options[0],option_b:options[1],option_c:options[2],option_d:options[3],correct_answer:options[correctLetter.charCodeAt(0)-65],explanation:$("#admin-explanation").value.trim(),scripture_reference:$("#admin-reference").value.trim(),bible_book:book,testament:findTestament(book),category:$("#admin-category").value,difficulty:$("#admin-difficulty").value};
  try{const {error}=await state.client.rpc("admin_upsert_question",{p_question:question});if(error)throw error;notify(question.id?"Question updated.":"Question added.");clearAdminForm();await loadAdminQuestions()}catch(error){console.error("Unable to save question",error);notify(error.message||"Question could not be saved.")}
}
function parseCsv(text){
  const rows=[];let row=[],cell="",quoted=false;
  for(let i=0;i<text.length;i++){const ch=text[i];if(ch==='"'&&quoted&&text[i+1]==='"'){cell+='"';i++}else if(ch==='"'){quoted=!quoted}else if(ch===","&&!quoted){row.push(cell);cell=""}else if((ch==="\n"||ch==="\r")&&!quoted){if(ch==="\r"&&text[i+1]==="\n")i++;row.push(cell);if(row.some(value=>value.trim()))rows.push(row);row=[];cell=""}else cell+=ch}
  row.push(cell);if(row.some(value=>value.trim()))rows.push(row);
  if(quoted)throw new Error("CSV contains an unclosed quoted field.");
  if(rows.length<2)throw new Error("CSV must include a header and at least one question.");
  const headers=rows.shift().map(value=>value.trim().toLowerCase());
  return rows.map(values=>Object.fromEntries(headers.map((header,index)=>[header,(values[index]||"").trim()])));
}
async function importCsv(){
  const file=$("#csv-file").files[0];if(!file){notify("Choose a CSV file first.");return}
  try{
    const rows=parseCsv(await file.text());if(rows.length>500)throw new Error("Import is limited to 500 questions per file.");
    for(let index=0;index<rows.length;index++){
      const row=rows[index],book=row.bible_book,options=["a","b","c","d"].map(letter=>row[`option_${letter}`]),correctKey=(row.correct_answer||"").toLowerCase();
      if(!options.every(Boolean)||!book||!row.question)throw new Error(`Row ${index+2} is missing a question, book, or answer option.`);
      const answerIndex=["a","b","c","d"].indexOf(correctKey),correct=answerIndex>=0?options[answerIndex]:options.find(option=>option===row.correct_answer);
      if(!correct)throw new Error(`Row ${index+2} has an invalid correct_answer; use A, B, C, D, or the exact option text.`);
      const question={question:row.question,option_a:options[0],option_b:options[1],option_c:options[2],option_d:options[3],correct_answer:correct,explanation:row.explanation||"",scripture_reference:row.scripture_reference||"",bible_book:book,testament:row.testament||findTestament(book),category:row.category||"Bible Characters",difficulty:row.difficulty||"Beginner"};
      const {error}=await state.client.rpc("admin_upsert_question",{p_question:question});if(error)throw new Error(`Row ${index+2}: ${error.message}`);
    }
    notify(`${rows.length} questions imported.`);$("#csv-file").value="";await loadAdminQuestions();
  }catch(error){console.error("CSV import failed",error);notify(error.message||"CSV import failed.")}
}

document.addEventListener("click",event=>{
  const page=event.target.closest("[data-page]");if(page){event.preventDefault();setPage(page.dataset.page)}
  const action=event.target.closest("[data-action]");if(action){const type=action.dataset.action;if(type==="configure")openConfig();if(type==="daily")openConfig({category:"Biblical Events",book:"Genesis"})}
  const category=event.target.closest("[data-category]");if(category){openConfig({category:category.dataset.category})}
  const book=event.target.closest("[data-book]");if(book)openConfig({book:book.dataset.book,category:findTestament(book.dataset.book)});
  const testament=event.target.closest("[data-testament]");if(testament)openConfig({category:testament.dataset.testament});
  const answer=event.target.closest("[data-answer]");if(answer)chooseAnswer(event);
  const nav=event.target.closest("[data-index]");if(nav){state.index=Number(nav.dataset.index);renderQuestion()}
  const edit=event.target.closest("[data-edit-question]");if(edit)editAdminQuestion(edit.dataset.editQuestion);
  const remove=event.target.closest("[data-delete-question]");if(remove&&window.confirm("Delete this question? This cannot be undone.")){state.client.rpc("admin_delete_question",{p_question_id:remove.dataset.deleteQuestion}).then(({error})=>{if(error)throw error;notify("Question deleted.");loadAdminQuestions()}).catch(error=>{console.error("Unable to delete question",error);notify(error.message||"Question could not be deleted.")})}
  if(event.target.matches("[data-close]"))closeModal(event.target.closest(".overlay"));
});
$$(".overlay").forEach(overlay=>overlay.addEventListener("click",event=>{if(event.target===overlay)closeModal(overlay)}));
$("#config-form").addEventListener("submit",event=>{event.preventDefault();beginQuiz({category:$("#config-category").value,book:$("#config-book").value,difficulty:$("#config-difficulty").value,count:$("#config-count").value})});
$("#previous-question").addEventListener("click",previousQuestion);$("#next-question").addEventListener("click",nextQuestion);
$("#submit-quiz").addEventListener("click",()=>submitQuiz(false));
$("#save-later").addEventListener("click",()=>{if(state.flags.has(state.index))state.flags.delete(state.index);else state.flags.add(state.index);renderNavigator();saveAttempt();notify(state.flags.has(state.index)?"Marked for review.":"Review mark removed.")});
$("#retake-quiz").addEventListener("click",startRetake);$("#try-another").addEventListener("click",()=>openConfig());$("#share-result").addEventListener("click",async()=>{const result=state.lastResult;if(!result)return;const text=`I scored ${result.percentage}% on a Wordwise Bible quiz!`;try{if(navigator.share)await navigator.share({title:"My Wordwise quiz result",text});else if(navigator.clipboard){await navigator.clipboard.writeText(text);notify("Result copied to clipboard.")}else notify(text)}catch(error){if(error.name!=="AbortError")notify("Could not share your result.")}});
$("#review-toggle").addEventListener("click",()=>{state.reviewExpanded=!state.reviewExpanded;$$(".review-collapsed").forEach((item,index)=>{item.hidden=!state.reviewExpanded&&index>2});$("#review-toggle").innerHTML=state.reviewExpanded?'Show less <span>↑</span>':'Show all <span>↓</span>'});
$("#mobile-menu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#auth-button").addEventListener("click",()=>showModal("auth-modal"));$("#account-button").addEventListener("click",()=>showModal("auth-modal"));$("#top-account").addEventListener("click",()=>showModal("auth-modal"));$("#auth-form").addEventListener("submit",handleAuth);
$("#save-settings").addEventListener("click",()=>{const saved=readStorage();saved.settings=saved.settings||{};saved.settings.name=$("#settings-name").value.trim();writeStorage(saved);renderAccount();notify("Settings saved.")});
populateAdminForm();$("#admin-question-form").addEventListener("submit",saveAdminQuestion);$("#admin-cancel").addEventListener("click",clearAdminForm);$("#refresh-questions").addEventListener("click",loadAdminQuestions);$("#import-csv").addEventListener("click",importCsv);
$("#search-input").addEventListener("keydown",event=>{if(event.key==="Enter")search(event.target.value)});document.addEventListener("keydown",event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==="k"){event.preventDefault();$("#search-input").focus()}if(event.key==="Escape")$$(".overlay.open").forEach(closeModal)});
$("#greeting").textContent=new Date().getHours()<12?"Good morning":new Date().getHours()<18?"Good afternoon":"Good evening";
fillConfig();setupSupabase();renderHome();renderAccount();populateAdminForm();restoreAttempt();
