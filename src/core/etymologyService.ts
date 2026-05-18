import { seedWords } from "../data/seedWords";
import { curatedEtymologies } from "../data/etymologies";

const wordSet = new Set(seedWords);

const commonBaseWords = [
  "able","accept","account","achieve","act","add","admit","advance","advantage","advise","affect","afford","agree","allow","amount","amuse","anger","announce","answer","appear","apply","approach","approve","argue","arise","arrange","arrest","arrive","ask","assist","assume","assure","attach","attack","attempt","attend","attract","avoid","awake","back","bad","balance","base","battle","bear","beat","beauty","become","begin","behave","believe","belong","bend","benefit","best","better","big","bind","bite","blame","bless","blind","block","blood","blow","board","boast","body","bold","bone","book","bore","born","borrow","boss","bother","bound","bow","brain","branch","brave","bread","break","breed","breathe","bridge","bright","bring","broad","brown","brush","build","burn","burst","bury","busy","buy","cage","cake","calm","camp","cancel","capable","capital","capture","care","careful","carry","case","cast","catch","cause","cease","celebrate","center","chain","chair","challenge","chance","change","charge","chase","chat","cheap","check","cheer","cheese","chief","child","choose","circle","claim","class","clean","clear","climb","cling","close","cloth","cloud","club","coach","coal","coast","coat","code","coffee","collect","color","combine","come","comfort","command","comment","commit","common","compare","compete","complain","complete","compose","concentrate","concern","condition","conduct","confirm","connect","consider","consist","contact","contain","content","contest","continue","contract","control","cook","cool","cope","copy","correct","cost","count","counter","country","courage","course","court","cover","crack","craft","crash","crazy","cream","create","credit","crew","crime","crisis","cross","crowd","crush","cry","cure","curious","current","curve","custom","cut","cycle","daily","damage","dance","danger","dare","dark","date","dawn","deal","dear","death","debate","debt","decide","declare","decline","deep","defeat","defend","define","degree","delay","deliver","demand","deny","depend","deposit","describe","desert","deserve","design","desire","destroy","detail","detect","develop","device","devote","diet","differ","dig","dinner","direct","dirt","disagree","disappear","discover","discuss","disease","dismiss","display","dispute","distance","distinct","distribute","district","disturb","dive","divide","doctor","document","doubt","down","draft","drag","drain","drama","draw","dream","dress","drift","drink","drive","drop","drown","drug","dry","dump","dust","duty","dwell","dynamic","eager","earn","earth","ease","east","easy","eat","economy","edge","edit","educate","effect","effort","egg","eight","elect","electric","element","else","emerge","emotion","employ","empty","enable","encounter","endure","energy","enforce","engage","engine","enjoy","enormous","enough","ensure","enter","entertain","entire","equal","equip","error","escape","essay","establish","estate","estimate","evaluate","even","event","ever","evidence","evil","evolve","exact","examine","example","exceed","excellent","except","exchange","excite","exclude","excuse","execute","exercise","exhibit","exist","expand","expect","expense","expert","explain","exploit","explore","export","expose","extend","extra","extract","extreme","eye","face","fact","factor","fail","fair","faith","fall","false","fame","familiar","family","famous","fan","fancy","fantasy","far","farm","fashion","fast","fat","fate","father","fault","favor","fear","feature","feed","feel","fellow","female","fence","fever","few","field","fierce","fight","figure","file","fill","film","filter","final","finance","find","fine","finger","finish","fire","firm","first","fish","fit","five","fix","flag","flame","flash","flat","flesh","flight","float","flood","floor","flow","flower","fly","focus","fold","folk","follow","food","fool","foot","force","foreign","forest","forever","forget","forgive","form","formal","former","formula","fortune","forward","found","frame","free","freedom","freeze","frequent","fresh","friend","front","frozen","fruit","fuel","full","fun","function","fund","funny","future","gain","game","gap","garage","garden","gas","gate","gather","general","generate","gentle","genuine","gesture","giant","gift","give","glad","glance","glass","global","glow","goal","god","gold","golden","good","govern","grab","grace","grade","grain","grand","grant","graph","grasp","grass","grateful","grave","great","green","greet","ground","group","grow","growth","guarantee","guard","guess","guest","guide","guilt","guilty","gun","habit","hair","half","hall","hand","handle","hang","happen","happy","harbor","hard","harm","hat","hate","head","heal","health","heap","hear","heart","heat","heaven","heavy","height","help","here","hero","hide","high","highlight","hill","hint","history","hit","hold","hole","holiday","holy","home","honest","honor","hook","hope","horror","horse","hospital","host","hot","house","huge","human","humble","humor","hundred","hunger","hunt","hurry","hurt","husband","ice","idea","identify","ignore","illegal","image","imagine","immediate","impact","imply","import","impose","improve","include","income","increase","indicate","industry","infant","inform","initial","injure","inner","innocent","insist","install","instance","instead","insult","insure","intend","intense","intent","interest","internal","interpret","invite","involve","iron","isolate","issue","item","itself","job","join","joke","judge","jump","jury","just","keen","keep","key","kick","kid","kill","kind","king","kiss","kitchen","knee","knife","knock","know","label","labor","lack","lady","lake","land","language","large","last","late","latter","laugh","launch","law","lawyer","lay","layer","lead","leader","leaf","league","lean","learn","least","leather","leave","left","legal","lend","length","less","lesson","let","level","lie","life","lift","light","like","likely","limit","line","link","lip","list","listen","liter","little","live","load","loan","local","lock","long","look","lord","lose","loss","lost","lot","loud","love","lovely","low","lower","loyal","luck","lucky","lunch","lung","machine","mad","magazine","magic","main","maintain","major","make","male","manage","manner","manufacture","many","map","march","margin","mark","market","marriage","master","match","mate","material","matter","mature","maximum","mean","measure","meat","media","medical","medium","meet","member","memory","mental","mention","merchant","mercy","merely","message","metal","method","middle","might","mild","military","milk","mind","mine","minimum","minor","minute","miracle","mirror","miss","mix","mode","model","moderate","modern","modest","moment","money","monitor","month","mood","moral","more","morning","most","mother","motion","mountain","mouth","move","much","murder","muscle","music","mutual","mystery","nail","naked","name","narrow","nation","native","natural","nature","near","nearly","neat","necessary","neck","need","needle","neighbor","neither","nerve","network","never","new","news","next","nice","night","nine","noble","noise","none","normal","north","nose","note","nothing","notice","notion","novel","nowhere","nuclear","number","numerous","nurse","object","observe","obtain","obvious","occupy","occur","ocean","odd","off","offense","offer","office","officer","official","often","oil","old","once","only","open","operate","opinion","opponent","opportunity","oppose","option","orange","order","ordinary","organ","organize","origin","original","other","ought","outcome","output","outside","overcome","overseas","owe","own","pace","pack","package","page","pain","paint","pair","palace","pale","palm","pan","panel","panic","paper","parent","park","part","partner","party","pass","passage","passion","past","patch","path","patience","patient","pattern","pause","pay","payment","peace","peak","peer","penalty","people","perfect","perform","period","permit","person","persuade","phase","phone","photo","phrase","physical","pick","picture","piece","pile","pilot","pin","pink","pioneer","pipe","pitch","place","plain","plan","plane","planet","plant","plate","platform","play","player","plead","pleasant","please","pleasure","plenty","plot","plus","pocket","poem","poet","poetry","point","poison","pole","police","policy","polish","polite","poor","popular","port","portion","pose","position","positive","possess","possible","post","potato","potential","pound","pour","poverty","powder","power","practical","practice","praise","pray","predict","prefer","prepare","presence","present","preserve","press","pressure","pretend","pretty","prevent","previous","price","pride","priest","primary","prime","prince","princess","principal","principle","print","prior","prison","privacy","private","privilege","prize","probable","problem","procedure","process","produce","product","profit","program","progress","project","promise","promote","prompt","proof","proper","property","proportion","proposal","propose","prospect","protect","protest","proud","prove","provide","province","provision","psychology","public","pull","pulse","pump","punch","punish","purchase","pure","purpose","pursue","push","put","qualify","quality","quantity","quarter","queen","question","quick","quiet","quit","quite","quote","race","radical","rain","raise","range","rank","rapid","rare","rate","rather","ratio","raw","reach","react","read","ready","real","realistic","reality","realize","really","rear","reason","reasonable","recall","receive","recent","recipe","reckon","recognize","recommend","record","recover","red","reduce","reflect","reform","refuge","refuse","regard","region","register","regret","regular","reject","relate","relative","relax","release","relief","relieve","rely","remain","remark","remedy","remember","remind","remote","remove","render","rent","repair","repeat","replace","reply","report","represent","republic","reputation","request","require","rescue","research","reserve","reside","resign","resist","resolve","resort","resource","respond","rest","restore","restrict","result","retain","retire","retreat","return","reveal","revenue","reverse","review","revise","revolution","reward","rhythm","rich","rid","ride","ridge","ridiculous","right","rigid","ring","riot","rise","risk","rival","river","road","rob","rock","rod","role","roll","romantic","roof","room","root","rope","rough","round","route","routine","row","royal","rub","rubber","rude","ruin","rule","run","rural","rush","sacred","sacrifice","sad","safe","safety","sail","sake","salad","salary","sale","salt","same","sample","sand","satellite","satisfy","save","scale","scan","scandal","scarce","scatter","scene","schedule","scheme","scholar","school","science","score","scratch","screen","screw","script","search","season","seat","second","secret","section","secure","seed","seek","select","self","sell","senate","send","senior","sense","sentence","separate","sequence","serial","series","serve","service","session","set","settle","seven","several","severe","shade","shadow","shake","shall","shame","shape","share","sharp","sheer","sheet","shelf","shell","shelter","shift","shine","ship","shirt","shock","shoe","shoot","shop","shore","short","shot","shoulder","shout","show","shower","shrug","shut","sick","side","sigh","sight","sign","signal","significance","silence","silent","silver","similar","simple","since","sing","single","sink","sir","sister","site","situation","six","size","skill","skin","skip","skirt","sky","slave","sleep","slice","slide","slight","slip","slow","small","smart","smell","smile","smoke","smooth","snap","snow","soak","social","soft","soil","solar","soldier","sole","solid","solution","solve","some","son","song","soon","sophisticated","sorry","sort","soul","sound","source","south","space","spare","spark","speak","special","species","specific","speech","speed","spell","spend","sphere","spirit","spite","split","spoil","sponsor","sport","spot","spread","spring","square","stable","staff","stage","stain","stair","stake","stamp","stand","standard","star","stare","start","state","station","statue","status","stay","steady","steal","steam","steel","steep","steer","stem","step","stick","stiff","still","stimulate","stir","stock","stomach","stone","stop","storage","store","storm","story","straight","strange","stranger","strategic","strategy","stream","street","strength","stress","stretch","strict","strike","string","strip","stroke","strong","structure","struggle","student","studio","study","stuff","stumble","style","subject","submit","subsequent","substance","substitute","subtle","succeed","success","suck","sudden","suffer","sufficient","sugar","suggest","suit","sum","summary","summer","sun","super","superior","supply","support","suppose","supreme","sure","surface","surgery","surprise","surrender","surround","survey","survive","suspect","suspend","sustain","swallow","swear","sweep","sweet","swell","swim","swing","switch","symbol","sympathy","system","table","tackle","tail","take","tale","talent","talk","tall","tank","tap","tape","target","task","taste","tax","tea","teach","team","tear","technical","technique","technology","telephone","television","tell","temperature","temporary","tempt","tend","tender","tennis","tension","term","terminal","terrible","territory","terror","test","text","thank","theme","theory","therapy","thick","thin","thing","think","third","thirst","thorough","though","thought","thousand","thread","threat","three","throat","through","throw","thumb","thus","ticket","tide","tidy","tie","tight","till","time","tiny","tip","tire","title","today","together","tomorrow","tone","tongue","tonight","tool","tooth","top","topic","toss","total","touch","tough","tour","toward","tower","town","track","trade","tradition","traffic","tragedy","trail","train","transfer","transform","transition","translate","transmit","transparent","transport","trap","trash","travel","treasure","treat","treatment","treaty","tree","tremendous","trend","trial","tribe","trick","trip","troop","trophy","trouble","truck","true","truly","trust","truth","try","tube","tuck","tune","turn","twice","twin","twist","type","typical","ugly","ultimate","unable","uncle","under","undergo","understand","undertake","uniform","union","unique","unit","unite","universal","universe","university","unknown","unless","unlike","unlikely","until","unusual","update","upon","upper","upset","urban","urge","urgent","use","used","useful","user","usual","utility","vacation","valid","valley","valuable","value","van","variable","variation","variety","various","vary","vast","vegetable","vehicle","venture","version","versus","vertical","very","vessel","veteran","via","victim","victory","video","view","village","violate","violence","virtual","virtue","visible","vision","visit","visual","vital","vivid","voice","volume","voluntary","vote","wage","wait","wake","walk","wall","wander","want","war","warm","warn","wash","waste","watch","water","wave","way","weak","wealth","weapon","wear","weather","weave","web","wedding","week","weekend","weigh","weight","welcome","welfare","well","west","western","wet","whatever","wheel","whenever","whereas","whether","which","while","whisper","white","whole","whose","wide","widespread","width","wife","wild","will","willing","win","wind","window","wine","wing","winner","winter","wipe","wire","wisdom","wise","wish","witness","woman","wonder","wood","wooden","word","work","worker","workshop","world","worldwide","worry","worth","would","wrap","write","writer","writing","wrong","yard","year","yell","yellow","yes","yesterday","yield","young","yourself","youth","zone"
];

const baseWordSet = new Set(commonBaseWords);

const prefixes = [
  { prefix: "anti", meaning: "against", origin: "Greek" },
  { prefix: "auto", meaning: "self", origin: "Greek" },
  { prefix: "be", meaning: "around, about", origin: "Old English" },
  { prefix: "bi", meaning: "two", origin: "Latin" },
  { prefix: "circum", meaning: "around", origin: "Latin" },
  { prefix: "co", meaning: "together", origin: "Latin" },
  { prefix: "com", meaning: "together", origin: "Latin" },
  { prefix: "con", meaning: "together", origin: "Latin" },
  { prefix: "counter", meaning: "against", origin: "Latin" },
  { prefix: "de", meaning: "down, away", origin: "Latin" },
  { prefix: "dis", meaning: "apart, not", origin: "Latin" },
  { prefix: "em", meaning: "cause to", origin: "French/Latin" },
  { prefix: "en", meaning: "cause to", origin: "French/Latin" },
  { prefix: "ex", meaning: "out of", origin: "Latin" },
  { prefix: "extra", meaning: "beyond", origin: "Latin" },
  { prefix: "fore", meaning: "before", origin: "Old English" },
  { prefix: "hyper", meaning: "over, excessive", origin: "Greek" },
  { prefix: "il", meaning: "not", origin: "Latin" },
  { prefix: "im", meaning: "into, not", origin: "Latin" },
  { prefix: "in", meaning: "into, not", origin: "Latin" },
  { prefix: "inter", meaning: "between", origin: "Latin" },
  { prefix: "ir", meaning: "not", origin: "Latin" },
  { prefix: "macro", meaning: "large", origin: "Greek" },
  { prefix: "mal", meaning: "bad", origin: "Latin" },
  { prefix: "micro", meaning: "small", origin: "Greek" },
  { prefix: "mid", meaning: "middle", origin: "Old English" },
  { prefix: "mis", meaning: "wrongly", origin: "Old English" },
  { prefix: "mono", meaning: "one", origin: "Greek" },
  { prefix: "multi", meaning: "many", origin: "Latin" },
  { prefix: "non", meaning: "not", origin: "Latin" },
  { prefix: "out", meaning: "beyond", origin: "Old English" },
  { prefix: "over", meaning: "excessive", origin: "Old English" },
  { prefix: "poly", meaning: "many", origin: "Greek" },
  { prefix: "post", meaning: "after", origin: "Latin" },
  { prefix: "pre", meaning: "before", origin: "Latin" },
  { prefix: "pro", meaning: "for, forward", origin: "Latin" },
  { prefix: "proto", meaning: "first", origin: "Greek" },
  { prefix: "pseudo", meaning: "false", origin: "Greek" },
  { prefix: "re", meaning: "again", origin: "Latin" },
  { prefix: "semi", meaning: "half", origin: "Latin" },
  { prefix: "sub", meaning: "under", origin: "Latin" },
  { prefix: "super", meaning: "above", origin: "Latin" },
  { prefix: "trans", meaning: "across", origin: "Latin" },
  { prefix: "tri", meaning: "three", origin: "Latin" },
  { prefix: "ultra", meaning: "beyond", origin: "Latin" },
  { prefix: "un", meaning: "not", origin: "Old English" },
  { prefix: "under", meaning: "beneath", origin: "Old English" },
];

const suffixes = [
  { suffix: "tion", pos: "noun", meaning: "act or process of", origin: "Latin/French" },
  { suffix: "sion", pos: "noun", meaning: "state or condition", origin: "Latin/French" },
  { suffix: "ment", pos: "noun", meaning: "result of action", origin: "Latin/French" },
  { suffix: "ness", pos: "noun", meaning: "state of being", origin: "Old English" },
  { suffix: "ity", pos: "noun", meaning: "quality of", origin: "Latin" },
  { suffix: "ance", pos: "noun", meaning: "state or quality", origin: "Latin" },
  { suffix: "ence", pos: "noun", meaning: "state or quality", origin: "Latin" },
  { suffix: "ancy", pos: "noun", meaning: "state or quality", origin: "Latin" },
  { suffix: "ency", pos: "noun", meaning: "state or quality", origin: "Latin" },
  { suffix: "ism", pos: "noun", meaning: "doctrine or practice", origin: "Greek" },
  { suffix: "ist", pos: "noun", meaning: "person who practices", origin: "Greek" },
  { suffix: "er", pos: "noun", meaning: "person or thing that does", origin: "Old English" },
  { suffix: "or", pos: "noun", meaning: "person who does", origin: "Latin" },
  { suffix: "eer", pos: "noun", meaning: "person who does", origin: "French" },
  { suffix: "ian", pos: "noun", meaning: "person who specializes", origin: "Latin" },
  { suffix: "dom", pos: "noun", meaning: "state, domain", origin: "Old English" },
  { suffix: "hood", pos: "noun", meaning: "state, condition", origin: "Old English" },
  { suffix: "ship", pos: "noun", meaning: "state, quality", origin: "Old English" },
  { suffix: "ling", pos: "noun", meaning: "small, young", origin: "Old English" },
  { suffix: "let", pos: "noun", meaning: "small, minor", origin: "French" },
  { suffix: "able", pos: "adjective", meaning: "capable of being", origin: "Latin" },
  { suffix: "ible", pos: "adjective", meaning: "capable of being", origin: "Latin" },
  { suffix: "ful", pos: "adjective", meaning: "full of", origin: "Old English" },
  { suffix: "less", pos: "adjective", meaning: "without", origin: "Old English" },
  { suffix: "ous", pos: "adjective", meaning: "full of", origin: "Latin/French" },
  { suffix: "ive", pos: "adjective", meaning: "tending to", origin: "Latin/French" },
  { suffix: "al", pos: "adjective", meaning: "relating to", origin: "Latin" },
  { suffix: "ial", pos: "adjective", meaning: "relating to", origin: "Latin" },
  { suffix: "ical", pos: "adjective", meaning: "relating to", origin: "Latin/Greek" },
  { suffix: "ic", pos: "adjective", meaning: "relating to", origin: "Greek" },
  { suffix: "ish", pos: "adjective", meaning: "somewhat like", origin: "Old English" },
  { suffix: "like", pos: "adjective", meaning: "similar to", origin: "Old English" },
  { suffix: "some", pos: "adjective", meaning: "tending to", origin: "Old English" },
  { suffix: "y", pos: "adjective", meaning: "characterized by", origin: "Old English" },
  { suffix: "ly", pos: "adverb", meaning: "in this manner", origin: "Old English" },
  { suffix: "ward", pos: "adverb", meaning: "direction toward", origin: "Old English" },
  { suffix: "wards", pos: "adverb", meaning: "direction toward", origin: "Old English" },
  { suffix: "wise", pos: "adverb", meaning: "in the manner of", origin: "Old English" },
  { suffix: "ize", pos: "verb", meaning: "to make or become", origin: "Greek" },
  { suffix: "ise", pos: "verb", meaning: "to make or become", origin: "Greek/French" },
  { suffix: "ify", pos: "verb", meaning: "to make or become", origin: "Latin" },
  { suffix: "ate", pos: "verb", meaning: "to cause or become", origin: "Latin" },
  { suffix: "en", pos: "verb", meaning: "to cause to be", origin: "Old English" },
  { suffix: "ology", pos: "noun", meaning: "study of", origin: "Greek" },
  { suffix: "ologist", pos: "noun", meaning: "one who studies", origin: "Greek" },
  { suffix: "phobia", pos: "noun", meaning: "fear of", origin: "Greek" },
  { suffix: "phobic", pos: "adjective", meaning: "fearing", origin: "Greek" },
  { suffix: "cracy", pos: "noun", meaning: "rule by", origin: "Greek" },
  { suffix: "crat", pos: "noun", meaning: "one who believes in rule", origin: "Greek" },
  { suffix: "graphy", pos: "noun", meaning: "writing about", origin: "Greek" },
  { suffix: "graph", pos: "noun", meaning: "something written", origin: "Greek" },
  { suffix: "meter", pos: "noun", meaning: "measuring device", origin: "Greek" },
  { suffix: "metry", pos: "noun", meaning: "measurement", origin: "Greek" },
  { suffix: "scope", pos: "noun", meaning: "instrument for viewing", origin: "Greek" },
  { suffix: "ectomy", pos: "noun", meaning: "surgical removal", origin: "Greek" },
  { suffix: "itis", pos: "noun", meaning: "inflammation", origin: "Greek" },
  { suffix: "osis", pos: "noun", meaning: "condition, process", origin: "Greek" },
  { suffix: "oma", pos: "noun", meaning: "tumor, growth", origin: "Greek" },
  { suffix: "ing", pos: "verb/noun", meaning: "action or process", origin: "Old English" },
  { suffix: "ed", pos: "verb", meaning: "past tense", origin: "Old English" },
  { suffix: "s", pos: "noun/verb", meaning: "plural or third person", origin: "Old English" },
  { suffix: "es", pos: "noun/verb", meaning: "plural or third person", origin: "Old English" },
  { suffix: "est", pos: "adjective", meaning: "most (superlative)", origin: "Old English" },
];

const roots = [
  { root: "bio", meaning: "life", origin: "Greek" },
  { root: "geo", meaning: "earth", origin: "Greek" },
  { root: "hydro", meaning: "water", origin: "Greek" },
  { root: "thermo", meaning: "heat", origin: "Greek" },
  { root: "tele", meaning: "far, distant", origin: "Greek" },
  { root: "photo", meaning: "light", origin: "Greek" },
  { root: "chrono", meaning: "time", origin: "Greek" },
  { root: "demo", meaning: "people", origin: "Greek" },
  { root: "patho", meaning: "suffering, disease", origin: "Greek" },
  { root: "psycho", meaning: "mind, soul", origin: "Greek" },
  { root: "techno", meaning: "art, craft", origin: "Greek" },
  { root: "anthropo", meaning: "human", origin: "Greek" },
  { root: "astro", meaning: "star", origin: "Greek" },
  { root: "biblio", meaning: "book", origin: "Greek" },
  { root: "eco", meaning: "house, environment", origin: "Greek" },
  { root: "ethno", meaning: "nation, race", origin: "Greek" },
  { root: "gyno", meaning: "woman", origin: "Greek" },
  { root: "hypno", meaning: "sleep", origin: "Greek" },
  { root: "necro", meaning: "death", origin: "Greek" },
  { root: "neo", meaning: "new", origin: "Greek" },
  { root: "ortho", meaning: "straight, correct", origin: "Greek" },
  { root: "paleo", meaning: "ancient", origin: "Greek" },
  { root: "philo", meaning: "love", origin: "Greek" },
  { root: "phone", meaning: "sound, voice", origin: "Greek" },
  { root: "pod", meaning: "foot", origin: "Greek" },
  { root: "theo", meaning: "god", origin: "Greek" },
  { root: "zo", meaning: "animal", origin: "Greek" },
  { root: "audi", meaning: "hear", origin: "Latin" },
  { root: "bene", meaning: "well, good", origin: "Latin" },
  { root: "cent", meaning: "hundred", origin: "Latin" },
  { root: "civ", meaning: "citizen", origin: "Latin" },
  { root: "dict", meaning: "say, speak", origin: "Latin" },
  { root: "equi", meaning: "equal", origin: "Latin" },
  { root: "fact", meaning: "make, do", origin: "Latin" },
  { root: "junct", meaning: "join", origin: "Latin" },
  { root: "lect", meaning: "read, choose", origin: "Latin" },
  { root: "magni", meaning: "great, large", origin: "Latin" },
  { root: "manu", meaning: "hand", origin: "Latin" },
  { root: "mort", meaning: "death", origin: "Latin" },
  { root: "ped", meaning: "foot", origin: "Latin" },
  { root: "port", meaning: "carry", origin: "Latin" },
  { root: "rupt", meaning: "break", origin: "Latin" },
  { root: "scrib", meaning: "write", origin: "Latin" },
  { root: "struct", meaning: "build", origin: "Latin" },
  { root: "vid", meaning: "see", origin: "Latin" },
  { root: "voc", meaning: "voice, call", origin: "Latin" },
];

function isWord(s: string): boolean {
  return baseWordSet.has(s) || wordSet.has(s);
}

function spellCheck(s: string): string | null {
  if (isWord(s)) return s;
  if (s.endsWith("e") && isWord(s.slice(0, -1))) return s.slice(0, -1);
  if (s.endsWith("y") && isWord(s.slice(0, -1) + "i")) return s.slice(0, -1) + "i";
  if (s.endsWith("ie") && isWord(s.slice(0, -2) + "y")) return s.slice(0, -2) + "y";
  if (s.endsWith("i") && isWord(s.slice(0, -1) + "y")) return s.slice(0, -1) + "y";
  if (s.endsWith("i") && isWord(s.slice(0, -1) + "ie")) return s.slice(0, -1) + "ie";
  return null;
}

function inDictionary(s: string): boolean {
  return spellCheck(s) !== null;
}

function resolveStem(s: string): string | null {
  return spellCheck(s);
}

function detectPrefixAccurate(word: string): { prefix: string; stem: string; meaning: string; origin: string } | null {
  for (const p of prefixes) {
    if (word.length <= p.prefix.length + 2) continue;
    if (word.startsWith(p.prefix)) {
      const stem = word.slice(p.prefix.length);
      if (stem.length >= 2 && inDictionary(stem)) {
        return { prefix: p.prefix, stem, meaning: p.meaning, origin: p.origin };
      }
    }
  }
  return null;
}

function detectSuffixAccurate(word: string): { suffix: string; stem: string; meaning: string; origin: string; pos: string } | null {
  for (const s of suffixes) {
    if (word.length <= s.suffix.length + 1) continue;
    if (word.endsWith(s.suffix)) {
      const stem = word.slice(0, word.length - s.suffix.length);
      if (stem.length >= 2 && inDictionary(stem)) {
        return { suffix: s.suffix, stem, meaning: s.meaning, origin: s.origin, pos: s.pos };
      }
    }
  }
  return null;
}

function tryResolveStemVariants(s: string): string | null {
  let b = resolveStem(s);
  if (b) return b;
  b = resolveStem(s + "e");
  if (b) return b;
  if (s.length >= 3 && s[s.length - 1] === s[s.length - 2]) {
    b = resolveStem(s.slice(0, -1));
    if (b) return b;
  }
  if (s.endsWith("i")) {
    b = resolveStem(s.slice(0, -1) + "y");
    if (b) return b;
  }
  return null;
}

function detectInflected(word: string): { base: string; inflection: string; desc: string } | null {
  const checks: { suffix: string; onMatch: (stem: string) => { base: string; inflection: string; desc: string } | null }[] = [
    { suffix: "ing", onMatch: (s) => {
      const b = tryResolveStemVariants(s);
      if (b) return { base: b, inflection: "-ing", desc: "formed by adding '-ing' (Old English, indicating action or process)" };
      return null;
    }},
    { suffix: "ed", onMatch: (s) => {
      const b = tryResolveStemVariants(s);
      if (b) return { base: b, inflection: "-ed", desc: "formed by adding '-ed' (Old English, indicating past tense)" };
      return null;
    }},
    { suffix: "ies", onMatch: (s) => {
      const b = resolveStem(s + "y");
      if (b) return { base: b, inflection: "-ies", desc: "formed by changing '-y' to '-ies' (Old English, indicating plural)" };
      return null;
    }},
    { suffix: "es", onMatch: (s) => {
      const b = tryResolveStemVariants(s);
      if (b) return { base: b, inflection: "-es", desc: "formed by adding '-es' (Old English, indicating plural or third person)" };
      return null;
    }},
    { suffix: "s", onMatch: (s) => {
      if (word.endsWith("ss")) return null;
      const b = tryResolveStemVariants(s);
      if (b) return { base: b, inflection: "-s", desc: "formed by adding '-s' (Old English, indicating plural or third person)" };
      return null;
    }},
    { suffix: "er", onMatch: (s) => {
      const b = tryResolveStemVariants(s);
      if (b) return { base: b, inflection: "-er", desc: "formed by adding '-er' (Old English)" };
      return null;
    }},
    { suffix: "est", onMatch: (s) => {
      const b = tryResolveStemVariants(s);
      if (b) return { base: b, inflection: "-est", desc: "formed by adding '-est' (Old English, superlative)" };
      return null;
    }},
  ];
  for (const c of checks) {
    if (word.endsWith(c.suffix) && word.length > c.suffix.length + 2) {
      const stem = word.slice(0, -c.suffix.length);
      const result = c.onMatch(stem);
      if (result) return result;
    }
  }
  return null;
}

function detectRoot(word: string): { root: string; meaning: string; origin: string } | null {
  const sorted = [...roots].sort((a, b) => b.root.length - a.root.length);
  for (const r of sorted) {
    if (word.includes(r.root) && word.length > r.root.length + 2) {
      const before = word.indexOf(r.root);
      const after = before + r.root.length;
      if (before === 0 || after === word.length) {
        return { root: r.root, meaning: r.meaning, origin: r.origin };
      }
    }
  }
  return null;
}

function detectCompound(word: string): string | null {
  if (word.length < 6) return null;
  for (let i = 3; i < word.length - 2; i++) {
    const first = word.slice(0, i);
    const second = word.slice(i);
    if (inDictionary(first) && inDictionary(second)) {
      return `A compound word formed from '${first}' and '${second}'`;
    }
  }
  return null;
}

function detectLanguage(word: string): string {
  const hasGreekSuffix = /(ology|phobia|graphy|metry|scope|itis|osis|ectomy|oma|cracy|ism|ist)$/.test(word);
  const hasLatinSuffix = /(tion|sion|ment|ity|ance|ence|ancy|ency|able|ible|ous|ive|al|ial|ify|ate|or)$/.test(word);
  if (hasGreekSuffix) return "Greek";
  if (hasLatinSuffix) return "Latin (via French)";

  let greekScore = 0, latinScore = 0, frenchScore = 0, norseScore = 0;

  if (/ph/.test(word)) greekScore += 2;
  if (/^ps|^pn|^pt|^ct|^gn|^rh|^phth/.test(word)) greekScore += 2;
  if (/y$/.test(word) && word.length > 3) greekScore++;
  if (/th/.test(word) && !/the$/.test(word)) greekScore++;

  if (/tion$|sion$|ment$|ity$/.test(word)) latinScore += 2;
  if (/qu/.test(word)) latinScore++;
  if (/um$|us$|a$/.test(word) && word.length > 3) latinScore++;
  if (/bi|tri|quadr|cent|sub|super|inter|extra|contra/.test(word)) latinScore++;
  if (/x$/.test(word) && !/ph|sh/.test(word)) latinScore++;

  if (/eau$|ique$|eur$/.test(word)) frenchScore += 2;
  if (/age$|ard$|sse$/.test(word)) frenchScore++;
  if (/e$/.test(word) && word.length > 4 && !/^[a-z]{2}$/.test(word)) frenchScore++;

  if (/sk/.test(word)) norseScore += 2;
  if (/k$/.test(word) && !/^[a-z]{2}$/.test(word)) norseScore++;
  if (/gg/.test(word)) norseScore++;
  if (word.includes("w") && word.length <= 5) norseScore++;

  const scores = [
    { lang: "Greek", score: greekScore },
    { lang: "Latin", score: latinScore },
    { lang: "French", score: frenchScore },
    { lang: "Old Norse", score: norseScore },
  ];
  scores.sort((a, b) => b.score - a.score);

  if (scores[0].score === 0) return "Germanic (Old English)";
  if (scores[0].score > scores[1].score) return scores[0].lang;
  if (scores[0].score === scores[1].score && scores[0].score > 0) return scores[0].lang + "/" + scores[1].lang;
  return scores[0].lang;
}

function estimateTimeline(word: string, language: string, hasStructure: boolean): string {
  if (language === "Greek") {
    if (word.length >= 10) return "Coined in the 18th or 19th century from Greek roots";
    return "Of Greek origin, entering English through Latin or French during the Renaissance";
  }
  if (language.startsWith("Latin")) {
    if (word.endsWith("tion") || word.endsWith("sion") || word.endsWith("ment") || word.endsWith("ity")) {
      return "Entered English via French or Latin between the 14th and 16th centuries";
    }
    if (!hasStructure) return "Borrowed from Latin during the Middle English period (12th–15th century)";
    return "Borrowed from Latin or French during the Middle English period (12th–15th century)";
  }
  if (language === "French") {
    return "Borrowed from French during the Middle English period (12th–15th century)";
  }
  if (language === "Old Norse") {
    return "Borrowed from Old Norse during the Viking Age (9th–11th century)";
  }
  if (language === "Germanic (Old English)") {
    if (word.length <= 4) return "First recorded before the 9th century (Old English period)";
    if (word.length <= 7) return "First recorded in the Old English period (before the 12th century)";
    return "First recorded in the Middle English period (12th–15th century)";
  }
  if (word.length <= 4) return "First recorded before the 12th century";
  if (word.length <= 7) return "First recorded between the 13th and 16th centuries";
  return "First recorded in the Early Modern English period (16th–17th century)";
}

type AffixInfo = { type: string; text: string; root?: string };

function stripAffixes(word: string): { root: string; prefix?: { text: string; origin: string; meaning: string }; suffix?: { text: string; origin: string; meaning: string; pos: string } } | null {
  for (const p of prefixes) {
    if (word.startsWith(p.prefix) && word.length > p.prefix.length + 2) {
      const afterPrefix = word.slice(p.prefix.length);
      for (const s of suffixes) {
        if (afterPrefix.endsWith(s.suffix) && afterPrefix.length > s.suffix.length + 1) {
          const core = afterPrefix.slice(0, afterPrefix.length - s.suffix.length);
          const resolved = resolveStem(core);
          if (resolved) {
            return {
              root: resolved,
              prefix: { text: p.prefix, origin: p.origin, meaning: p.meaning },
              suffix: { text: s.suffix, origin: s.origin, meaning: s.meaning, pos: s.pos },
            };
          }
        }
      }
      const afterPrefixResolved = resolveStem(afterPrefix);
      if (afterPrefixResolved) {
        return { root: afterPrefix, prefix: { text: p.prefix, origin: p.origin, meaning: p.meaning } };
      }
    }
  }
  for (const s of suffixes) {
    if (word.endsWith(s.suffix) && word.length > s.suffix.length + 1) {
      const stem = word.slice(0, word.length - s.suffix.length);
      const resolved = resolveStem(stem);
      if (resolved) {
        return { root: resolved, suffix: { text: s.suffix, origin: s.origin, meaning: s.meaning, pos: s.pos } };
      }
      for (const p of prefixes) {
        if (stem.startsWith(p.prefix) && stem.length > p.prefix.length + 2) {
          const core = stem.slice(p.prefix.length);
          const coreResolved = resolveStem(core);
          if (coreResolved) {
            return {
              root: coreResolved,
              prefix: { text: p.prefix, origin: p.origin, meaning: p.meaning },
              suffix: { text: s.suffix, origin: s.origin, meaning: s.meaning, pos: s.pos },
            };
          }
        }
      }
    }
  }
  return null;
}

function findAllAffixes(word: string): AffixInfo[] {
  const stripped = stripAffixes(word);
  if (stripped) {
    const result: AffixInfo[] = [];
    if (stripped.prefix) {
      result.push({ type: "prefix", text: `the prefix '${stripped.prefix.text}-' (${stripped.prefix.origin}, meaning '${stripped.prefix.meaning}')` });
    }
    if (stripped.suffix) {
      result.push({ type: "suffix", text: `the suffix '-${stripped.suffix.text}' (${stripped.suffix.origin}, forming ${stripped.suffix.pos}s meaning '${stripped.suffix.meaning}')` });
    }
    return result;
  }

  const inf = detectInflected(word);
  if (inf) {
    return [{ type: "inflection", text: inf.desc, root: inf.base }];
  }

  const r = detectRoot(word);
  if (r) {
    return [{ type: "root", text: `Contains the root '${r.root}' (${r.origin}, meaning '${r.meaning}')` }];
  }

  const c = detectCompound(word);
  if (c) {
    return [{ type: "compound", text: c }];
  }

  return [];
}

function buildEtymologyParts(word: string, lang: string, timeline: string): { origin: string; timeline: string; language: string } {
  const affixes = findAllAffixes(word);

  let origin = "";
  if (affixes.length > 0) {
    if (affixes[0].type === "inflection") {
      origin = affixes[0].text + `. Derived from '${affixes[0].root || "?"}'`;
    } else if (affixes[0].type === "root") {
      origin = affixes[0].text;
    } else if (affixes[0].type === "compound") {
      origin = affixes[0].text;
    } else {
      const desc = affixes.map(a => a.text).join(" and ");
      origin = "Formed from " + desc;
      if (lang !== "Germanic (Old English)" && !origin.toLowerCase().includes(lang.toLowerCase())) {
        origin += `. Of ${lang.toLowerCase()} origin`;
      }
    }
  } else {
    if (lang === "Germanic (Old English)") {
      origin = "Of Germanic (Old English) origin, inherited from Proto-Germanic";
    } else {
      origin = `Of ${lang.toLowerCase()} origin`;
    }
  }

  return { origin, timeline, language: lang };
}

export type EtymologyResult = {
  origin: string;
  timeline: string;
  language: string;
};

export function getEtymology(word: string): EtymologyResult {
  const w = word.toLowerCase().trim();
  if (!w) return { origin: "", timeline: "", language: "" };

  if (curatedEtymologies[w]) {
    const curated = curatedEtymologies[w];
    let timeline = "";
    const tlMatch = curated.match(/(first recorded|coined) in the ([^;]+)/i);
    if (tlMatch) {
      timeline = tlMatch[0].charAt(0).toUpperCase() + tlMatch[0].slice(1);
    }
    let language = "";
    if (curated.includes("Old English")) language = "Germanic (Old English)";
    else if (curated.includes("Greek")) language = "Greek";
    else if (curated.includes("Latin")) language = "Latin";
    else if (curated.includes("Old Norse")) language = "Old Norse";
    else if (curated.includes("French")) language = "French";
    else if (curated.includes("Germanic")) language = "Germanic";
    else if (curated.includes("Arabic")) language = "Arabic";
    else if (curated.includes("Spanish")) language = "Spanish";
    else if (curated.includes("Italian")) language = "Italian";
    else if (curated.includes("Dutch")) language = "Dutch";
    else if (curated.includes("Sanskrit")) language = "Sanskrit";
    else if (curated.includes("Nahuatl")) language = "Nahuatl";
    else if (curated.includes("Taíno")) language = "Taíno";
    else language = detectLanguage(w);
    return { origin: curated, timeline, language };
  }

  const lang = detectLanguage(w);
  const hasStructure = !!(detectPrefixAccurate(w) || detectSuffixAccurate(w));
  const timeline = estimateTimeline(w, lang, hasStructure);
  return buildEtymologyParts(w, lang, timeline);
}
