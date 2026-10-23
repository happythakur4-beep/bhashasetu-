import { LanguageCode, LanguageConfig, PhraseItem, RadioChannel } from '../types';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'auto',
    name: 'Auto-Detect',
    nativeName: '✨ स्वतः पहचान (Auto-Detect)',
    state: 'Pan-India & Regional Dialects',
    region: 'Universal AI Speech Sensing',
    script: 'All Regional Dialects',
    flagEmoji: '✨',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    ttsPitch: 1.0,
    ttsRate: 1.0,
    greetingExample: {
      native: 'बोलिए, ऐप खुद भाषा पहचान लेगी...',
      phonetic: 'Boliye, app khud bhasha pehchan legi...',
      english: 'Speak, the app detects language automatically',
    },
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    state: 'North & Central India',
    region: 'Delhi, UP, MP, Bihar, Rajasthan',
    script: 'Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    ttsPitch: 1.0,
    ttsRate: 0.95,
    greetingExample: {
      native: 'नमस्ते, आप कैसे हैं?',
      phonetic: 'Namaste, aap kaise hain?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English (IN)',
    state: 'Pan-India Link',
    region: 'Interstate & Administrative',
    script: 'Latin',
    flagEmoji: '🇮🇳',
    sttCode: 'en-IN',
    ttsCode: 'en-IN',
    ttsPitch: 1.0,
    ttsRate: 1.0,
    greetingExample: {
      native: 'Hello, how can I help you?',
      phonetic: 'Hello, how can I help you?',
      english: 'Hello, how can I help you?',
    },
  },
  {
    code: 'or',
    name: 'Odia for Urmila',
    nativeName: 'ओडिया फॉर उर्मिला (ଓଡ଼ିଆ)',
    state: 'Odisha',
    region: 'Eastern India',
    script: 'Odia',
    flagEmoji: '🇮🇳',
    sttCode: 'or-IN',
    ttsCode: 'or-IN',
    ttsPitch: 1.15,
    ttsRate: 0.92,
    greetingExample: {
      native: 'ନମସ୍କାର, ଆପଣ କେମିତି ଅଛନ୍ତି?',
      phonetic: 'Namaskara, aapana kemiti achhanti?',
      english: 'Greetings, how are you?',
    },
  },
  {
    code: 'mjl',
    name: 'Mandali (Mandeali)',
    nativeName: 'माण्डली / मण्डयाली',
    state: 'Himachal Pradesh',
    region: 'Mandi & Beas Valley (Western Pahadi)',
    script: 'Devanagari (Historic Takri)',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    ttsPitch: 0.95,
    ttsRate: 0.9,
    isDialect: true,
    parentLanguage: 'Western Pahadi',
    greetingExample: {
      native: 'तुसां जो नमस्कार, केड़ा हाल चाल है?',
      phonetic: 'Tusan jo namaskar, keda haal chaal hai?',
      english: 'Greetings to you, how is everything going?',
    },
  },
  {
    code: 'pa',
    name: 'Punjabi',
    nativeName: 'ਪੰਜਾਬੀ',
    state: 'Punjab',
    region: 'North-West India',
    script: 'Gurmukhi',
    flagEmoji: '🇮🇳',
    sttCode: 'pa-IN',
    ttsCode: 'hi-IN',
    ttsPitch: 1.05,
    greetingExample: {
      native: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ, ਕੀ ਹਾਲ ਹੈ?',
      phonetic: 'Sat Sri Akaal, ki haal hai?',
      english: 'Greetings, how are you?',
    },
  },
  {
    code: 'bn',
    name: 'Bengali',
    nativeName: 'বাংলা',
    state: 'West Bengal',
    region: 'Eastern India',
    script: 'Bengali',
    flagEmoji: '🇮🇳',
    sttCode: 'bn-IN',
    ttsCode: 'bn-IN',
    ttsPitch: 1.0,
    greetingExample: {
      native: 'নমস্কার, আপনি কেমন আছেন?',
      phonetic: 'Nomoshkar, aapni kemon aachhen?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'mr',
    name: 'Marathi',
    nativeName: 'मराठी',
    state: 'Maharashtra',
    region: 'Western India',
    script: 'Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'mr-IN',
    ttsCode: 'mr-IN',
    greetingExample: {
      native: 'नमस्कार, तुम्ही कसे आहात?',
      phonetic: 'Namaskar, tumhi kase aahat?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'ml',
    name: 'Malayalam',
    nativeName: 'മലയാളം',
    state: 'Kerala',
    region: 'Southern India',
    script: 'Malayalam',
    flagEmoji: '🇮🇳',
    sttCode: 'ml-IN',
    ttsCode: 'ml-IN',
    ttsPitch: 1.05,
    ttsRate: 0.95,
    greetingExample: {
      native: 'नमस्कारम्, സുഖമാണോ?',
      phonetic: 'Namaskaram, sugamano?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeName: 'தமிழ்',
    state: 'Tamil Nadu',
    region: 'Southern India',
    script: 'Tamil',
    flagEmoji: '🇮🇳',
    sttCode: 'ta-IN',
    ttsCode: 'ta-IN',
    greetingExample: {
      native: 'வணக்கம், எப்படி இருக்கிறீர்கள்?',
      phonetic: 'Vanakkam, eppadi irukkireergal?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'te',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    state: 'Andhra Pradesh & Telangana',
    region: 'Southern India',
    script: 'Telugu',
    flagEmoji: '🇮🇳',
    sttCode: 'te-IN',
    ttsCode: 'te-IN',
    greetingExample: {
      native: 'నమస్కారం, మీరు ఎలా ఉన్నారు?',
      phonetic: 'Namaskaram, meeru ela unnaru?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'kn',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    state: 'Karnataka',
    region: 'Southern India',
    script: 'Kannada',
    flagEmoji: '🇮🇳',
    sttCode: 'kn-IN',
    ttsCode: 'kn-IN',
    greetingExample: {
      native: 'ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಿ?',
      phonetic: 'Namaskara, hegiddiri?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'gu',
    name: 'Gujarati',
    nativeName: 'ગુજરાતી',
    state: 'Gujarat',
    region: 'Western India',
    script: 'Gujarati',
    flagEmoji: '🇮🇳',
    sttCode: 'gu-IN',
    ttsCode: 'gu-IN',
    greetingExample: {
      native: 'નમસ્કાર, તમે કેમ છો?',
      phonetic: 'Namaskar, tame kem cho?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    state: 'Pan-India',
    region: 'North & Central India',
    script: 'Arabic (Nastaliq)',
    flagEmoji: '🇮🇳',
    sttCode: 'ur-IN',
    ttsCode: 'ur-IN',
    greetingExample: {
      native: 'سلام، آپ کیسے ہیں؟',
      phonetic: 'Salam, aap kaise hain?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'as',
    name: 'Assamese',
    nativeName: 'অসমীয়া',
    state: 'Assam',
    region: 'Northeastern India',
    script: 'Bengali-Assamese',
    flagEmoji: '🇮🇳',
    sttCode: 'bn-IN',
    ttsCode: 'bn-IN',
    greetingExample: {
      native: 'নমস্কাৰ, আপুনি কেমন আছে?',
      phonetic: 'Nomoskar, apuni kemon ase?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'sa',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    state: 'Pan-India Heritage',
    region: 'Classical',
    script: 'Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'नमस्कारः, भवान् कथम् अस्ति?',
      phonetic: 'Namaskarah, bhavan katham asti?',
      english: 'Greetings, how are you?',
    },
  },
  {
    code: 'ne',
    name: 'Nepali',
    nativeName: 'नेपाली',
    state: 'Sikkim, West Bengal & Northern Hills',
    region: 'Himalayan Corridor',
    script: 'Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'ne-NP',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'नमस्कार, तपाईलाई कस्तो छ?',
      phonetic: 'Namaskar, tapailai kasto cha?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'ks',
    name: 'Kashmiri',
    nativeName: 'कॉशुर / كشميري',
    state: 'Jammu and Kashmir',
    region: 'Northern India',
    script: 'Perso-Arabic & Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'آداب، توہ چھုہ حأوالہٕ کیٚژھ؟',
      phonetic: 'Adaab, tow chhuh haawalah kech?',
      english: 'Greetings, how are you?',
    },
  },
  {
    code: 'sd',
    name: 'Sindhi',
    nativeName: 'سنڌي / सिंधी',
    state: 'Western Border & Gujarat/MH Diaspora',
    region: 'Western India',
    script: 'Arabic-Perso & Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'سلام، اوھان ڪିئن آهيو؟',
      phonetic: 'Salam, ohan kiin aahiyo?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'kok',
    name: 'Konkani',
    nativeName: 'कोंकणी',
    state: 'Goa, Karnataka & Maharashtra',
    region: 'Konkan Coast',
    script: 'Devanagari & Latin',
    flagEmoji: '🇮🇳',
    sttCode: 'mr-IN',
    ttsCode: 'mr-IN',
    greetingExample: {
      native: 'नमस्कार, तुमी कशे आसात?',
      phonetic: 'Namaskar, tumi kashe aasaat?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'mni',
    name: 'Manipuri',
    nativeName: 'মৈতৈলোন্',
    state: 'Manipur',
    region: 'Northeastern India',
    script: 'Bengali & Meitei Mayek',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'খুরুমজরি, করমগদৌরি?',
      phonetic: 'Khurumjiri, karamgadouri?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'mai',
    name: 'Maithili',
    nativeName: 'मैथिली',
    state: 'Bihar',
    region: 'Eastern India',
    script: 'Devanagari (Tirhuta)',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'नमस्कार, अहाँ कतेक छियै?',
      phonetic: 'Namaskar, ahan katek chhiyai?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'doi',
    name: 'Dogri',
    nativeName: 'डोगरी',
    state: 'Jammu and Kashmir',
    region: 'Northern India',
    script: 'Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'नमस्कार, तुस किम्दा ओ?',
      phonetic: 'Namaskar, tus kimda o?',
      english: 'Hello, how are you?',
    },
  },
  {
    code: 'sat',
    name: 'Santali',
    nativeName: 'संथाली / 𑢠𑢰𑢵𑢫𑢳',
    state: 'Jharkhand, Odisha & West Bengal',
    region: 'Eastern India',
    script: 'Ol Chiki',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'جوहार, چেলে লেইক েনা?',
      phonetic: 'Johar, chele leik ena?',
      english: 'Greetings, how are you?',
    },
  },
  {
    code: 'brx',
    name: 'Bodo',
    nativeName: 'बोडो / बर’',
    state: 'Assam',
    region: 'Northeastern India',
    script: 'Devanagari',
    flagEmoji: '🇮🇳',
    sttCode: 'hi-IN',
    ttsCode: 'hi-IN',
    greetingExample: {
      native: 'खुलुमबाय, नों माबोरै दं?',
      phonetic: 'Khulumbai, nong mabore dong?',
      english: 'Hello, how are you?',
    },
  }
];

export const RADIO_CHANNELS: RadioChannel[] = [
  {
    channel: 1,
    frequency: '145.500 MHz',
    name: 'Emergency & Relief (SOS)',
    description: 'Priority mesh channel for medical, disaster & road emergencies',
    badgeColor: 'text-red-400 bg-red-950/60 border-red-500/40',
    iconName: 'AlertTriangle',
    isEmergency: true,
  },
  {
    channel: 2,
    frequency: '145.200 MHz',
    name: 'Interstate Transport & Logistics',
    description: 'Highways, truck corridors, border posts & inter-state routes',
    badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-500/40',
    iconName: 'Truck',
  },
  {
    channel: 3,
    frequency: '146.520 MHz',
    name: 'Public Calling & Intercom',
    description: 'General calling channel for travellers and local markets',
    badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40',
    iconName: 'Radio',
  },
  {
    channel: 4,
    frequency: '147.800 MHz',
    name: 'Private P2P Mesh Talk',
    description: 'Direct encrypted mesh talkgroup between paired mobile units',
    badgeColor: 'text-sky-400 bg-sky-950/60 border-sky-500/40',
    iconName: 'Shield',
  },
];

// Offline Lexicon with curated cross-state interstate phrases
export const OFFLINE_PHRASEBOOK: PhraseItem[] = [
  {
    id: 'sos_1',
    category: 'emergency',
    english: 'I need immediate medical help! Call a doctor.',
    hindi: {
      text: 'मुझे तुरंत डॉक्टरी सहायता चाहिए! डॉक्टर को बुलाओ।',
      phonetic: 'Mujhe turant doctari sahayata chahiye! Doctor ko bulao.',
    },
    odia: {
      text: 'ମୋତେ ତୁରନ୍ତ ଡାକ୍ତରୀ ସାହାଯ୍ୟ ଦରକାର! ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।',
      phonetic: 'Mote turanta daktari sahayya darkar! Daktaranku dakantu.',
    },
    mandali: {
      text: 'मां जो झटपट डाक्टरी मदद चहिदी! डाक्टरा जो सदो।',
      phonetic: 'Maan jo jhatpat daktari madad chahidi! Daktara jo sado.',
    },
    icon: 'HeartPulse',
  },
  {
    id: 'sos_2',
    category: 'emergency',
    english: 'There has been an accident here on the highway.',
    hindi: {
      text: 'यहाँ हाईवे पर एक दुर्घटना हो गई है।',
      phonetic: 'Yahan highway par ek durghatna ho gayi hai.',
    },
    odia: {
      text: 'ଏଠାରେ ହାଇୱେ ଉପରେ ଏକ ଦୁର୍ଘଟଣା ଘଟିଛି।',
      phonetic: 'Ethare highway upare eka durghatana ghatichhi.',
    },
    mandali: {
      text: 'इथी सड़का / हाईवे परा इक दुर्घटना होयी गयी है।',
      phonetic: 'Ithi sadka / highway para ik durghatna hoyi gayi hai.',
    },
    icon: 'AlertOctagon',
  },
  {
    id: 'sos_3',
    category: 'emergency',
    english: 'Please help us, we are lost and out of signal.',
    hindi: {
      text: 'कृपया हमारी मदद करें, हम रास्ता भटक गए हैं और नेटवर्क नहीं है।',
      phonetic: 'Kripya hamari madad karein, hum rasta bhatak gaye hain aur network nahi hai.',
    },
    odia: {
      text: 'ଦୟାକରି ଆମକୁ ସାହାଯ୍ୟ କରନ୍ତୁ, ଆମେ ରାସ୍ତା ହଜାଇ ଦେଇଛୁ ଏବଂ ନେଟୱାର୍କ ନାହିଁ।',
      phonetic: 'Dayakari aamaku sahayya karantu, aame rasta hajayi deichhu ebam network nahi.',
    },
    mandali: {
      text: 'म्हारी मदद करा, अस्सां रस्ता भुल्ली गेहेन ते सिगनल नी है।',
      phonetic: 'Mhari madad kara, assan rasta bhulli gehen te signal ni hai.',
    },
    icon: 'HelpCircle',
  },
  {
    id: 'dir_1',
    category: 'directions',
    english: 'Where does this road lead to?',
    hindi: {
      text: 'यह सड़क कहाँ जाती है?',
      phonetic: 'Yeh sadak kahan jaati hai?',
    },
    odia: {
      text: 'ଏହି ରାସ୍ତାଟି କୁଆଡ଼େ ଯାଉଛି?',
      phonetic: 'Ehi rastati kuade jauchhi?',
    },
    mandali: {
      text: 'ऐह सड़क कुथु जांदी है?',
      phonetic: 'Aih sadak kuthu jaandi hai?',
    },
    icon: 'Compass',
  },
  {
    id: 'dir_2',
    category: 'directions',
    english: 'How far is the nearest bus stand or railway station?',
    hindi: {
      text: 'नजदीकी बस स्टैंड या रेलवे स्टेशन कितनी दूर है?',
      phonetic: 'Nazdeeki bus stand ya railway station kitni door hai?',
    },
    odia: {
      text: 'ନିକଟତମ ବସ ଷ୍ଟାଣ୍ଡ କିମ୍ବା ରେଳ ଷ୍ଟେସନ କେତେ ଦୂର?',
      phonetic: 'Nikatatama bus stand kimba railway station kete doora?',
    },
    mandali: {
      text: 'नेड़ला बस अडा या रेल स्टेशन केतड़ी दूर है?',
      phonetic: 'Nedla bus adda ya rail station ketdi door hai?',
    },
    icon: 'MapPin',
  },
  {
    id: 'dir_3',
    category: 'directions',
    english: 'Is the mountain pass or bridge open ahead?',
    hindi: {
      text: 'क्या आगे पहाड़ी दर्रा या पुल खुला है?',
      phonetic: 'Kya aage pahadi darra ya pul khula hai?',
    },
    odia: {
      text: 'ଆଗରେ ପୋଲ କିମ୍ବା ଘାଟି ରାସ୍ତା ଖୋଲା ଅଛି କି?',
      phonetic: 'Aagare pola kimba ghati rasta khola achhi ki?',
    },
    mandali: {
      text: 'के अग्गे पुली या जोत / दर्रा खुला है?',
      phonetic: 'Ke agge puli ya jot / darra khula hai?',
    },
    icon: 'Navigation',
  },
  {
    id: 'gen_1',
    category: 'general',
    english: 'Greetings! Where are you traveling from?',
    hindi: {
      text: 'नमस्ते! आप कहाँ से आ रहे हैं?',
      phonetic: 'Namaste! Aap kahan se aa rahe hain?',
    },
    odia: {
      text: 'ନମସ୍କାର! ଆପଣ କେଉଁଠାରୁ ଆସୁଛନ୍ତି?',
      phonetic: 'Namaskara! Aapana keuntharu aasuchhanti?',
    },
    mandali: {
      text: 'तुसां जो नमस्कार! तुसां कुथुआ औंदे?',
      phonetic: 'Tusan jo namaskar! Tusan kuthua aunde?',
    },
    icon: 'Smile',
  },
  {
    id: 'gen_2',
    category: 'general',
    english: 'What is your name? Nice to meet you.',
    hindi: {
      text: 'आपका नाम क्या है? आपसे मिलकर खुशी हुई।',
      phonetic: 'Aapka naam kya hai? Aapse milkar khushi hui.',
    },
    odia: {
      text: 'ଆପଣଙ୍କ ନାମ କ’ଣ? ଆପଣଙ୍କୁ ଭେଟି ଖୁସି ଲାଗିଲା।',
      phonetic: 'Aapananka naama kaana? Aapananku bheti khusi lagila.',
    },
    mandali: {
      text: 'तुहाड़ा नां के है? तुसां ने मिली ने बड़ा अच्छा लग्या।',
      phonetic: 'Tuhada naah ke hai? Tusan ne mili ne bada achha lagya.',
    },
    icon: 'UserCheck',
  },
  {
    id: 'gen_3',
    category: 'general',
    english: 'Please speak slowly, I am from another state.',
    hindi: {
      text: 'कृपया धीरे बोलिए, मैं दूसरे राज्य से हूँ।',
      phonetic: 'Kripya dheere boliye, main doosre rajya se hoon.',
    },
    odia: {
      text: 'ଦୟାକରି ଧୀରେ କୁହନ୍ତୁ, ମୁଁ ଅନ୍ୟ ଏକ ରାଜ୍ୟରୁ ଆସିଛି।',
      phonetic: 'Dayakari dheere kuhantu, mun anya eka rajyaru aasichhi.',
    },
    mandali: {
      text: 'भैय्या होले-होले बोला, मां दूजे सूबे / राज्य रा हां।',
      phonetic: 'Bhaiyya hole-hole bola, maan dooje soobe / rajya ra haan.',
    },
    icon: 'Volume2',
  },
  {
    id: 'food_1',
    category: 'food',
    english: 'Where can we get clean drinking water and food?',
    hindi: {
      text: 'पीने का साफ पानी और खाना कहाँ मिलेगा?',
      phonetic: 'Peene ka saaf paani aur khana kahan milega?',
    },
    odia: {
      text: 'ପିଇବା ପାଇଁ ବିଶୁଦ୍ଧ ପାଣି ଏବଂ ଖାଦ୍ୟ କେଉଁଠି ମିଳିବ?',
      phonetic: 'Piiba pain bisuddha pani ebam khadya keunthi miliba?',
    },
    mandali: {
      text: 'पीणे जो साफ पाणी ते रोटी कुथु मिलणी?',
      phonetic: 'Peene jo saaf paani te roti kuthu milni?',
    },
    icon: 'Utensils',
  },
  {
    id: 'food_2',
    category: 'food',
    english: 'How much does this cost?',
    hindi: {
      text: 'इसकी कीमत क्या है? यह कितने का है?',
      phonetic: 'Iski keemat kya hai? Yeh kitne ka hai?',
    },
    odia: {
      text: 'ଏହାର ମୂଲ୍ୟ କେତେ? ଏହା କେତେ ଟଙ୍କାର?',
      phonetic: 'Ehara mulya kete? Eha kete tankara?',
    },
    mandali: {
      text: 'ऐह केतड़े रा है? केतणे रुपये होये?',
      phonetic: 'Aih ketde ra hai? Ketne rupaye hoye?',
    },
    icon: 'CreditCard',
  },
  {
    id: 'med_1',
    category: 'medical',
    english: 'Is there a pharmacy or chemist shop nearby?',
    hindi: {
      text: 'क्या पास में कोई दवाई की दुकान या केमिस्ट है?',
      phonetic: 'Kya paas mein koi dawai ki dukaan ya chemist hai?',
    },
    odia: {
      text: 'ପାଖରେ କୌଣସି ଔଷଧ ଦୋକାନ ଅଛି କି?',
      phonetic: 'Pakhare kounasi oushadha dokana achhi ki?',
    },
    mandali: {
      text: 'के नेड़े कोई दवाई री दुकान है?',
      phonetic: 'Ke nede koi dawai ri dukaan hai?',
    },
    icon: 'Crosshair',
  },
  // Curated Quick-Calls from Home Page (Ensures 100% offline accuracy & zero silent fallbacks)
  {
    id: 'hp_quick_sos',
    category: 'emergency',
    english: 'I need immediate help! Emergency.',
    hindi: {
      text: 'मुझे तुरंत सहायता चाहिए',
      phonetic: 'Mujhe turant sahayata chahiye',
    },
    odia: {
      text: 'ମୋତେ ତୁରନ୍ତ ସାହାଯ୍ୟ ଦରକାର',
      phonetic: 'Mote turanta sahayya darkar',
    },
    mandali: {
      text: 'मां जो झटपट डाक्टरी मदद चहिदी',
      phonetic: 'Maan jo jhatpat daktari madad chahidi',
    },
    icon: 'HeartPulse',
  },
  {
    id: 'hp_quick_greet',
    category: 'general',
    english: 'Namaste! Where are you going?',
    hindi: {
      text: 'नमस्ते! आप कहाँ जा रहे हैं?',
      phonetic: 'Namaste! Aap kahan ja rahe hain?',
    },
    odia: {
      text: 'ନମସ୍କାର! ଆପଣ କୁଆଡ଼େ ଯାଉଛନ୍ତି?',
      phonetic: 'Namaskara! Aapana kuade jauchhanti?',
    },
    mandali: {
      text: 'तुसां जो नमस्कार! कुथु जांदे?',
      phonetic: 'Tusan jo namaskar! Kuthu jaande?',
    },
    icon: 'Smile',
  },
  {
    id: 'hp_quick_water',
    category: 'food',
    english: 'I need clean drinking water.',
    hindi: {
      text: 'मुझे पीने का पानी चाहिए',
      phonetic: 'Mujhe peene ka paani chahiye',
    },
    odia: {
      text: 'ମୋତେ ପିଇବା ପାଣି ଦରକାର',
      phonetic: 'Mote piiba pani darkar',
    },
    mandali: {
      text: 'मां जो पाणी चहिदा',
      phonetic: 'Maan jo paani chahida',
    },
    icon: 'Utensils',
  },
  {
    id: 'hp_quick_bus',
    category: 'directions',
    english: 'Where is the nearest bus stand or railway station?',
    hindi: {
      text: 'नजदीकी बस स्टैंड या रेलवे स्टेशन कहाँ है?',
      phonetic: 'Nazdeeki bus stand ya railway station kahan hai?',
    },
    odia: {
      text: 'ନିକଟତମ ବସ ଷ୍ଟାଣ୍ଡ କିମ୍ବା ରେଳ ଷ୍ଟେସନ କେଉଁଠାରେ ଅଛି?',
      phonetic: 'Nikatatama bus stand kimba railway station keunthare achhi?',
    },
    mandali: {
      text: 'नेड़ला बस अडा या रेल स्टेशन कुथु है?',
      phonetic: 'Nedla bus adda ya rail station kuthu hai?',
    },
    icon: 'MapPin',
  },
  {
    id: 'hp_quick_thanks',
    category: 'general',
    english: 'Thank you very much! Thank you.',
    hindi: {
      text: 'आपका बहुत-बहुत धन्यवाद',
      phonetic: 'Aapka bahut-bahut dhanyavaad',
    },
    odia: {
      text: 'ଆପଣଙ୍କୁ ବହୁତ ବହୁତ ଧନ୍ୟବାଦ',
      phonetic: 'Aapananku bahuta bahuta dhanyabada',
    },
    mandali: {
      text: 'बड़ा-बड़ा धन्यवाद',
      phonetic: 'Bada-bada dhanyavaad',
    },
    icon: 'Heart',
  },
  {
    id: 'hp_quick_how_are_you',
    category: 'general',
    english: 'How are you? How is everything?',
    hindi: {
      text: 'आप कैसे हैं? कैसा हाल चाल है?',
      phonetic: 'Aap kaise hain? Kaisa haal chaal hai?',
    },
    odia: {
      text: 'ଆପଣ କେମିତି ଅଛନ୍ତି?',
      phonetic: 'Aapana kemiti achhanti?',
    },
    mandali: {
      text: 'केड़ा हाल चाल है?',
      phonetic: 'Keda haal chaal hai?',
    },
    icon: 'Smile',
  },
  {
    id: 'fuel_1',
    category: 'travel',
    english: 'Where is the nearest petrol pump or fuel station?',
    hindi: {
      text: 'नजदीकी पेट्रोल पंप कहाँ है?',
      phonetic: 'Nazdeeki petrol pump kahan hai?',
    },
    odia: {
      text: 'ପାଖ ପେଟ୍ରୋଲ ପମ୍ପ କେଉଁଠି ଅଛି?',
      phonetic: 'Pakha petrol pump keunthi achhi?',
    },
    mandali: {
      text: 'नेड़ला पेट्रोल पंप कुथु है?',
      phonetic: 'Nedla petrol pump kuthu hai?',
    },
    icon: 'Fuel',
  },
  {
    id: 'hospital_1',
    category: 'medical',
    english: 'Where is the nearest government hospital or clinic?',
    hindi: {
      text: 'नजदीकी सरकारी अस्पताल कहाँ है?',
      phonetic: 'Nazdeeki sarkari aspatal kahan hai?',
    },
    odia: {
      text: 'ନିକଟତମ ସରକାରୀ ଡାକ୍ତରଖାନା କେଉଁଠାରେ ଅଛି?',
      phonetic: 'Nikatatama sarakari daktarakhana keunthare achhi?',
    },
    mandali: {
      text: 'नेड़ला सरकारी हस्पताल कुथु है?',
      phonetic: 'Nedla sarkari haspatal kuthu hai?',
    },
    icon: 'Building2',
  },
  {
    id: 'police_1',
    category: 'emergency',
    english: 'Where is the nearest police station or check post?',
    hindi: {
      text: 'नजदीकी पुलिस स्टेशन या चेक पोस्ट कहाँ है?',
      phonetic: 'Nazdeeki police station ya check post kahan hai?',
    },
    odia: {
      text: 'ନିକଟତମ ପୋଲିସ ଷ୍ଟେସନ କେଉଁଠାରେ?',
      phonetic: 'Nikatatama police station keunthare?',
    },
    mandali: {
      text: 'नेड़ला पुलिस थाणा या चौकी कुथु है?',
      phonetic: 'Nedla police thana ya chowki kuthu hai?',
    },
    icon: 'ShieldAlert',
  },
  {
    id: 'weather_1',
    category: 'travel',
    english: 'Is the road blocked due to landslide or heavy rain?',
    hindi: {
      text: 'क्या लैंडस्लाइड या बारिश से रास्ता बंद है?',
      phonetic: 'Kya landslide ya baarish se rasta band hai?',
    },
    odia: {
      text: 'ଭୂସ୍ଖଳନ କିମ୍ବା ବର୍ଷା ଯୋଗୁଁ ରାସ୍ତା ବନ୍ଦ ଅଛି କି?',
      phonetic: 'Bhuskhlana kimba barsha jogun rasta banda achhi ki?',
    },
    mandali: {
      text: 'के ढंगा / लैंडस्लाइड या बखा री वज्हा से रस्ता बंद है?',
      phonetic: 'Ke dhanga / landslide ya bakha ri vajha se rasta band hai?',
    },
    icon: 'CloudRain',
  },
  {
    id: 'mechanic_1',
    category: 'travel',
    english: 'My vehicle broke down, is there a mechanic nearby?',
    hindi: {
      text: 'मेरी गाड़ी खराब हो गई है, क्या पास में मैकेनिक मिलेगा?',
      phonetic: 'Meri gaadi kharab ho gayi hai, kya paas mein mechanic milega?',
    },
    odia: {
      text: 'ମୋ ଗାଡ଼ି ଖରାପ ହୋଇଯାଇଛି, ପାଖରେ ମେକାନିକ ମିଳିବେ କି?',
      phonetic: 'Mo gadi kharap hoijaichhi, pakhare mechanic milibe ki?',
    },
    mandali: {
      text: 'म्हारी गाड़ी खराब होयी गी, के नेड़े मिस्त्री मिलणा?',
      phonetic: 'Mhari gaadi kharab hoyi gee, ke nede mistri milna?',
    },
    icon: 'Wrench',
  },
  {
    id: 'hotel_1',
    category: 'travel',
    english: 'Is there a shelter or place to stay for the night?',
    hindi: {
      text: 'क्या यहाँ रात में रुकने की कोई जगह या सराय है?',
      phonetic: 'Kya yahan raat mein rukne ki koi jagah ya saraye hai?',
    },
    odia: {
      text: 'ରାତିରେ ରହିବା ପାଇଁ କୌଣସି ଆଶ୍ରୟ ବା ହୋଟେଲ ଅଛି କି?',
      phonetic: 'Ratire rahiba pain kounasi aasraya ba hotel achhi ki?',
    },
    mandali: {
      text: 'के इथी राता जो रौहणे दी कोई जगह या सरां है?',
      phonetic: 'Ke ithi raata jo rauhne dee koi jagah ya saraa hai?',
    },
    icon: 'Home',
  },
  {
    id: 'bus_time_1',
    category: 'directions',
    english: 'What time will the next bus arrive?',
    hindi: {
      text: 'अगली बस कितने बजे आएगी?',
      phonetic: 'Agli bus kitne baje aayegi?',
    },
    odia: {
      text: 'ପରବର୍ତ୍ତୀ ବସ କେତେବେଳେ ଆସିବ?',
      phonetic: 'Parabartti bus ketebela aasiba?',
    },
    mandali: {
      text: 'अगली बस केतड़े बजे औणी?',
      phonetic: 'Agli bus ketde baje auni?',
    },
    icon: 'Clock',
  },
  {
    id: 'safe_allclear',
    category: 'emergency',
    english: 'All clear, the area is safe now.',
    hindi: {
      text: 'सब ठीक है, इलाका सुरक्षित है।',
      phonetic: 'Sab theek hai, ilaaka surakshit hai.',
    },
    odia: {
      text: 'ସବୁ ଠିକ ଅଛି, ଅଞ୍ଚଳ ଏବେ ସୁରକ୍ଷିତ।',
      phonetic: 'Sabu thik achhi, anchala ebe surakshita.',
    },
    mandali: {
      text: 'सब राजी-खुशी है, इलाका महफूज है।',
      phonetic: 'Sab raaji-khushi hai, ilaaka mehfooz hai.',
    },
    icon: 'CheckCircle',
  },
  {
    id: 'food_meal',
    category: 'food',
    english: 'Is fresh food and tea available here?',
    hindi: {
      text: 'क्या यहाँ ताजा खाना और चाय मिलेगी?',
      phonetic: 'Kya yahan taaza khana aur chai milegi?',
    },
    odia: {
      text: 'ଏଠାରେ ତାଜା ଖାଦ୍ୟ ଏବଂ ଚାହା ମିଳିବ କି?',
      phonetic: 'Ethare taja khadya ebam chaha miliba ki?',
    },
    mandali: {
      text: 'के इथी ताजा रोटी ते चाह मिलणी?',
      phonetic: 'Ke ithi taaja roti te chaah milni?',
    },
    icon: 'Coffee',
  },
  {
    id: 'conv_yes',
    category: 'general',
    english: 'Yes',
    hindi: {
      text: 'हाँ',
      phonetic: 'Haan',
    },
    odia: {
      text: 'ହଁ',
      phonetic: 'Han',
    },
    mandali: {
      text: 'हाँ / होय',
      phonetic: 'Haan / Hoy',
    },
    icon: 'Check',
  },
  {
    id: 'conv_no',
    category: 'general',
    english: 'No',
    hindi: {
      text: 'नहीं',
      phonetic: 'Nahi',
    },
    odia: {
      text: 'ନାହିଁ',
      phonetic: 'Nahin',
    },
    mandali: {
      text: 'नी',
      phonetic: 'Nee',
    },
    icon: 'X',
  },
  {
    id: 'conv_ok',
    category: 'general',
    english: 'All right, OK',
    hindi: {
      text: 'ठीक है, अच्छा',
      phonetic: 'Theek hai, achha',
    },
    odia: {
      text: 'ଠିକ ଅଛି, ଭଲ',
      phonetic: 'Thik achhi, bhala',
    },
    mandali: {
      text: 'ठीक है',
      phonetic: 'Theek hai',
    },
    icon: 'ThumbsUp',
  },
  {
    id: 'conv_help_me',
    category: 'emergency',
    english: 'Please help me',
    hindi: {
      text: 'मदद करो / सहायता चाहिए',
      phonetic: 'Madad karo / Sahayata chahiye',
    },
    odia: {
      text: 'ଦୟାକରି ମୋତେ ସାହାଯ୍ୟ କରନ୍ତୁ',
      phonetic: 'Dayakari mote sahayya karantu',
    },
    mandali: {
      text: 'म्हारी मदद करा',
      phonetic: 'Mhari madad kara',
    },
    icon: 'LifeBuoy',
  },
  {
    id: 'conv_water_give',
    category: 'food',
    english: 'Please give water / Drinking water',
    hindi: {
      text: 'पानी दो / पीने का पानी',
      phonetic: 'Paani do / Peene ka paani',
    },
    odia: {
      text: 'ଦୟାକରି ପାଣି ଦିଅନ୍ତୁ',
      phonetic: 'Dayakari pani diantu',
    },
    mandali: {
      text: 'पाणी दस्सा / पाणी द्या',
      phonetic: 'Paani dassa / Paani dya',
    },
    icon: 'Droplet',
  },
  {
    id: 'conv_doctor_call',
    category: 'medical',
    english: 'Call a doctor',
    hindi: {
      text: 'डॉक्टर को बुलाओ',
      phonetic: 'Doctor ko bulao',
    },
    odia: {
      text: 'ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ',
      phonetic: 'Daktaranku dakantu',
    },
    mandali: {
      text: 'डाक्टरा जो सदो',
      phonetic: 'Daktara jo sado',
    },
    icon: 'UserCheck',
  },
  {
    id: 'conv_road_show',
    category: 'directions',
    english: 'Please tell me the way / route',
    hindi: {
      text: 'रास्ता बताओ / रास्ता बताइए',
      phonetic: 'Rasta batao / Rasta bataiye',
    },
    odia: {
      text: 'ରାସ୍ତା କୁହନ୍ତୁ',
      phonetic: 'Rasta kuhantu',
    },
    mandali: {
      text: 'रस्ता दस्सा',
      phonetic: 'Rasta dassa',
    },
    icon: 'Navigation',
  },
  {
    id: 'conv_vehicle_broken',
    category: 'travel',
    english: 'Vehicle is broken down',
    hindi: {
      text: 'गाड़ी खराब है',
      phonetic: 'Gaadi kharab hai',
    },
    odia: {
      text: 'ଗାଡ଼ି ଖରାପ ଅଛି',
      phonetic: 'Gadi kharap achhi',
    },
    mandali: {
      text: 'गाड़ी खराब है',
      phonetic: 'Gaadi kharab hai',
    },
    icon: 'Wrench',
  },
  {
    id: 'conv_hotel_where',
    category: 'travel',
    english: 'Where is a hotel or place to stay?',
    hindi: {
      text: 'होटल कहाँ है? सराय कहाँ है?',
      phonetic: 'Hotel kahan hai? Saraye kahan hai?',
    },
    odia: {
      text: 'ହୋଟେଲ କେଉଁଠି ଅଛି?',
      phonetic: 'Hotel keunthi achhi?',
    },
    mandali: {
      text: 'होटल कुथु है?',
      phonetic: 'Hotel kuthu hai?',
    },
    icon: 'Home',
  },
  {
    id: 'conv_toilet_where',
    category: 'general',
    english: 'Where is the restroom / toilet?',
    hindi: {
      text: 'शौचालय कहाँ है? टॉयलेट कहाँ है?',
      phonetic: 'Shauchalaya kahan hai? Toilet kahan hai?',
    },
    odia: {
      text: 'ଶୌଚାଳୟ କେଉଁଠି ଅଛି?',
      phonetic: 'Shauchalaya keunthi achhi?',
    },
    mandali: {
      text: 'शौचालय कुथु है?',
      phonetic: 'Shauchalaya kuthu hai?',
    },
    icon: 'HelpCircle',
  },
  {
    id: 'conv_morning_greeting',
    category: 'general',
    english: 'Good morning',
    hindi: {
      text: 'सुप्रभात / शुभ प्रभात',
      phonetic: 'Suprabhat / Shubh prabhat',
    },
    odia: {
      text: 'ଶୁଭ ସକାଳ',
      phonetic: 'Subha sakala',
    },
    mandali: {
      text: 'शुभ प्रभात',
      phonetic: 'Shubh prabhat',
    },
    icon: 'Sun',
  },
];

// Offline Mandali Dialect Transformation Rules (Himachali / Mandeali Pahadi grammar)
export function applyMandaliDialectRules(hindiText: string): { text: string; phonetic: string; notes: string } {
  let text = hindiText.trim();

  // Replacements table for common Hindi phrases into authentic Mandali
  const directMap: Record<string, string> = {
    'कहाँ जा रहे हो': 'कुथु जांदे',
    'कहाँ जा रहे हैं': 'कुथु जांदे',
    'कहाँ जा रहे हो?': 'कुथु जांदे?',
    'कहाँ जा रहे हैं?': 'कुथु जांदे?',
    'आपका नाम क्या है': 'तुहाड़ा नां के है',
    'आपका नाम क्या है?': 'तुहाड़ा नां के है?',
    'तुम्हारा नाम क्या है': 'तेरा नां के है',
    'तुम्हारा नाम क्या है?': 'तेरा नां के है?',
    'कैसे हो': 'केड़ा हाल है',
    'आप कैसे हैं': 'तुसां केड़े हो / केड़ा हाल है',
    'नमस्ते': 'तुसां जो नमस्कार',
    'नमस्कार': 'तुसां जो नमस्कार',
    'धन्यवाद': 'बड़ा-बड़ा धन्यवाद / मेहरबानी',
    'बहुत धन्यवाद': 'बड़ा-बड़ा धन्यवाद',
    'पानी चाहिए': 'पाणी चहिदा',
    'मुझे पानी चाहिए': 'मां जो पाणी चहिदा',
    'मदद चाहिए': 'मदद चहिदी',
    'रास्ता बताइए': 'रस्ता दस्सा',
    'मुझे नहीं पता': 'मां जो नी पता',
    'मैं ठीक हूँ': 'हौं ठीक हां',
    'हम ठीक हैं': 'अस्सां ठीक हां',
    'कितने पैसे हुए': 'केतणे रुपये होये',
    'कितना हुआ': 'केतड़ा होया',
    'रुको': 'खड़ो',
    'यहाँ आओ': 'इथी आओ / इथी आ',
    'वहाँ जाओ': 'तिथी जा',
    'नजदीकी पेट्रोल पंप कहाँ है?': 'नेड़ला पेट्रोल पंप कुथु है?',
    'नजदीकी अस्पताल कहाँ है?': 'नेड़ला हस्पताल कुथु है?',
    'नजदीकी पुलिस स्टेशन कहाँ है?': 'नेड़ला पुलिस थाणा कुथु है?',
    'सब ठीक है': 'सब राजी-खुशी है',
    'सब ठीक है।': 'सब राजी-खुशी है।',
  };

  for (const [hi, mjl] of Object.entries(directMap)) {
    if (text.toLowerCase() === hi.toLowerCase()) {
      return {
        text: mjl,
        phonetic: transliterateDevanagariToPhonetic(mjl),
        notes: 'Mandali (Mandeali) native idiom used in Mandi Valley',
      };
    }
  }

  // Word & Morphological Replacements
  const wordReplacements: Array<[RegExp, string]> = [
    // Pronouns & Postpositions
    [/\bमैं\b/g, 'हौं / मां'],
    [/\bमुझे\b/g, 'मां जो'],
    [/\bमुझको\b/g, 'मां जो'],
    [/\bमेरा\b/g, 'म्हारा'],
    [/\bमेरी\b/g, 'म्हारी'],
    [/\bमेरे\b/g, 'म्हारे'],
    [/\bहम\b/g, 'अस्सां'],
    [/\bहमारा\b/g, 'असां रा'],
    [/\bआप\b/g, 'तुसां'],
    [/\bआपका\b/g, 'तुहाड़ा'],
    [/\bआपकी\b/g, 'तुहाड़ी'],
    [/\bआपके\b/g, 'तुहाड़े'],
    [/\bआपको\b/g, 'तुसां जो'],
    [/\bतुम\b/g, 'तुसां'],
    // Interrogatives
    [/\bकहाँ\b/g, 'कुथु'],
    [/\bक्या\b/g, 'के'],
    [/\bक्यों\b/g, 'कियां-जो'],
    [/\bकैसे\b/g, 'कियां'],
    [/\bकैसा\b/g, 'केड़ा'],
    [/\bकितना\b/g, 'केतड़ा'],
    [/\bकितने\b/g, 'केतणे'],
    [/\bकब\b/g, 'कदू'],
    // Adverbs of Place
    [/\bयहाँ\b/g, 'इथी'],
    [/\bवहाँ\b/g, 'तिथी'],
    [/\bइधर\b/g, 'इथी कनी'],
    [/\bउधर\b/g, 'तिथी कनी'],
    // Negation & Copula
    [/\bनहीं\b/g, 'नी'],
    [/\bहैं\b/g, 'हन / हैं'],
    [/\bहूँ\b/g, 'हां'],
    [/\bथा\b/g, 'था'],
    // Common nouns & verbs
    [/\bपानी\b/g, 'पाणी'],
    [/\bचाहिए\b/g, 'चहिदा'],
    [/\bबोलिए\b/g, 'बोला'],
    [/\bबताइए\b/g, 'दस्सा'],
    [/\bजाते\b/g, 'जांदे'],
    [/\bजा रहे\b/g, 'जांदे'],
    [/\bआ रहे\b/g, 'औंदे'],
    [/\bआते\b/g, 'औंदे'],
    [/\bकरते\b/g, 'करदे'],
    [/\bसड़क\b/g, 'सड़क'],
    [/\bपास\b/g, 'नेड़े'],
  ];

  let transformed = text;
  for (const [pattern, rep] of wordReplacements) {
    transformed = transformed.replace(pattern, rep);
  }

  return {
    text: transformed,
    phonetic: transliterateDevanagariToPhonetic(transformed),
    notes: 'Transformed using offline Mandali (Western Pahadi) morpho-phonetic rules',
  };
}

// Reverse Mandali Dialect Transformation Rules (Western Pahadi -> Hindi)
export function applyReverseMandaliRules(mandaliText: string): { text: string; phonetic: string; notes: string } {
  const text = mandaliText.trim();

  const directReverseMap: Record<string, string> = {
    'तुसां जो नमस्कार': 'नमस्ते',
    'तुसां जो नमस्कार!': 'नमस्ते!',
    'कुथु जांदे': 'कहाँ जा रहे हैं',
    'कुथु जांदे?': 'कहाँ जा रहे हैं?',
    'तुसां जो नमस्कार! कुथु जांदे?': 'नमस्ते! आप कहाँ जा रहे हैं?',
    'तुहाड़ा नां के है': 'आपका नाम क्या है',
    'तुहाड़ा नां के है?': 'आपका नाम क्या है?',
    'तेरा नां के है': 'तुम्हारा नाम क्या है',
    'तेरा नां के है?': 'तुम्हारा नाम क्या है?',
    'केड़ा हाल चाल है': 'आप कैसे हैं',
    'केड़ा हाल चाल है?': 'आप कैसे हैं?',
    'केड़ा हाल है': 'कैसे हो',
    'बड़ा-बड़ा धन्यवाद': 'बहुत-बहुत धन्यवाद',
    'मां जो पाणी चहिदा': 'मुझे पीने का पानी चाहिए',
    'मां जो झटपट डाक्टरी मदद चहिदी': 'मुझे तुरंत सहायता चाहिए',
    'मदद चहिदी': 'मदद चाहिए',
    'रस्ता दस्सा': 'रास्ता बताइए',
    'मां जो नी पता': 'मुझे नहीं पता',
    'हौं ठीक हां': 'मैं ठीक हूँ',
    'अस्सां ठीक हां': 'हम ठीक हैं',
    'नेड़ला पेट्रोल पंप कुथु है?': 'नजदीकी पेट्रोल पंप कहाँ है?',
    'नेड़ला हस्पताल कुथु है?': 'नजदीकी अस्पताल कहाँ है?',
    'नेड़ला पुलिस थाणा कुथु है?': 'नजदीकी पुलिस स्टेशन कहाँ है?',
    'सब राजी-खुशी है': 'सब ठीक है',
    'सब राजी-खुशी है।': 'सब ठीक है।',
  };

  for (const [mjl, hi] of Object.entries(directReverseMap)) {
    if (text.toLowerCase() === mjl.toLowerCase()) {
      return {
        text: hi,
        phonetic: transliterateDevanagariToPhonetic(hi),
        notes: 'Reverse translated from Mandali dialect to Hindi',
      };
    }
  }

  const wordReplacements: Array<[RegExp, string]> = [
    [/\bतुसां जो नमस्कार\b/g, 'नमस्ते'],
    [/\bकुथु जांदे\b/g, 'कहाँ जा रहे हैं'],
    [/\bमां जो\b/g, 'मुझे'],
    [/\bहौं\b/g, 'मैं'],
    [/\bअस्सां\b/g, 'हम'],
    [/\bतुसां\b/g, 'आप'],
    [/\bतुहाड़ा\b/g, 'आपका'],
    [/\bतुहाड़ी\b/g, 'आपकी'],
    [/\bतुहाड़े\b/g, 'आपके'],
    [/\bकुथु\b/g, 'कहाँ'],
    [/\bके\b/g, 'क्या'],
    [/\bकेड़ा\b/g, 'कैसा'],
    [/\bकेतड़ा\b/g, 'कितना'],
    [/\bकेतणे\b/g, 'कितने'],
    [/\bइथी\b/g, 'यहाँ'],
    [/\bतिथी\b/g, 'वहाँ'],
    [/\bनी\b/g, 'नहीं'],
    [/\bपाणी\b/g, 'पानी'],
    [/\bचहिदा\b/g, 'चाहिए'],
    [/\bचहिदी\b/g, 'चाहिए'],
    [/\bबोला\b/g, 'बोलिए'],
    [/\bदस्सा\b/g, 'बताइए'],
    [/\bऔंदे\b/g, 'आ रहे'],
    [/\bनेड़े\b/g, 'पास'],
    [/\bहां\b/g, 'हूँ'],
  ];

  let transformed = text;
  for (const [pattern, rep] of wordReplacements) {
    transformed = transformed.replace(pattern, rep);
  }

  return {
    text: transformed,
    phonetic: transliterateDevanagariToPhonetic(transformed),
    notes: 'Reverse translated from Mandali (Western Pahadi) morpho-phonetic dialect into standard Hindi',
  };
}

// Offline Odia Dialect Transformation Rules (Hindi -> Odia direct lexicon & grammar)
export function applyOdiaDialectRules(hindiText: string): { text: string; phonetic: string; notes: string } | null {
  const text = hindiText.trim();
  const clean = cleanQueryPunctuation(text);

  const directMap: Record<string, { text: string; phonetic: string }> = {
    'हाँ': { text: 'ହଁ', phonetic: 'Han' },
    'हां': { text: 'ହଁ', phonetic: 'Han' },
    'हाँ जी': { text: 'ହଁ ଆଜ୍ଞା', phonetic: 'Han aagnya' },
    'नहीं': { text: 'ନାହିଁ', phonetic: 'Nahin' },
    'ना': { text: 'ନା', phonetic: 'Na' },
    'नमस्ते': { text: 'ନମସ୍କାର', phonetic: 'Namaskar' },
    'नमस्कार': { text: 'ନମସ୍କାର', phonetic: 'Namaskar' },
    'नमस्ते जी': { text: 'ନମସ୍କାର ଆଜ୍ଞା', phonetic: 'Namaskar aagnya' },
    'प्रणाम': { text: 'ପ୍ରଣାମ', phonetic: 'Pranam' },
    'सुप्रभात': { text: 'ଶୁଭ ସକାଳ', phonetic: 'Subha sakala' },
    'शुभ प्रभात': { text: 'ଶୁଭ ସକାଳ', phonetic: 'Subha sakala' },
    'शुभ रात्रि': { text: 'ଶୁଭ ରାତ୍ରି', phonetic: 'Subha ratri' },
    'धन्यवाद': { text: 'ଧନ୍ୟବାଦ', phonetic: 'Dhanyavad' },
    'बहुत धन्यवाद': { text: 'ବହୁତ ଧନ୍ୟବାଦ', phonetic: 'Bahut dhanyavad' },
    'शुक्रिया': { text: 'ଧନ୍ୟବାଦ', phonetic: 'Dhanyavad' },
    'थैंक यू': { text: 'ଧନ୍ୟବାଦ', phonetic: 'Dhanyavad' },
    'आप कैसे हैं': { text: 'ଆପଣ କେମିତି ଅଛନ୍ତି?', phonetic: 'Aapana kemiti achhanti?' },
    'आप कैसे हैं?': { text: 'ଆପଣ କେମିତି ଅଛନ୍ତି?', phonetic: 'Aapana kemiti achhanti?' },
    'आप कैसे हो': { text: 'ଆପଣ କେମିତି ଅଛନ୍ତି?', phonetic: 'Aapana kemiti achhanti?' },
    'कैसे हो': { text: 'କେମିତି ଅଛନ୍ତି?', phonetic: 'Kemiti achhanti?' },
    'कैसा हाल है': { text: 'କେମିତି ଅଛନ୍ତି?', phonetic: 'Kemiti achhanti?' },
    'सब ठीक है': { text: 'ସବୁ ଠିକ ଅଛି।', phonetic: 'Sabu thik achhi.' },
    'सब ठीक है।': { text: 'ସବୁ ଠିକ ଅଛି।', phonetic: 'Sabu thik achhi.' },
    'मैं ठीक हूँ': { text: 'ମୁଁ ଭଲ ଅଛି।', phonetic: 'Mun bhala achhi.' },
    'हम ठीक हैं': { text: 'ଆମେ ଭଲ ଅଛୁ।', phonetic: 'Aame bhala achhu.' },
    'ठीक है': { text: 'ଠିକ ଅଛି।', phonetic: 'Thik achhi.' },
    'अच्छा': { text: 'ଭଲ / ଠିକ ଅଛି।', phonetic: 'Bhala / Thik achhi.' },
    'आपका नाम क्या है': { text: 'ଆପଣଙ୍କ ନାମ କଣ?', phonetic: 'Aapananka naama kana?' },
    'आपका नाम क्या है?': { text: 'ଆପଣଙ୍କ ନାମ କଣ?', phonetic: 'Aapananka naama kana?' },
    'तुम्हारा नाम क्या है': { text: 'ତୁମ ନାମ କଣ?', phonetic: 'Tuma naama kana?' },
    'तुम्हारा नाम क्या है?': { text: 'ତୁମ ନାମ କଣ?', phonetic: 'Tuma naama kana?' },
    'पानी दो': { text: 'ଦୟାକରି ପାଣି ଦିଅନ୍ତୁ।', phonetic: 'Dayakari pani diantu.' },
    'पानी दीजिए': { text: 'ଦୟାକରି ପାଣି ଦିଅନ୍ତୁ।', phonetic: 'Dayakari pani diantu.' },
    'मुझे पानी चाहिए': { text: 'ମୋତେ ପିଇବା ପାଣି ଦରକାର।', phonetic: 'Mote piiba pani darkar.' },
    'पीने का पानी': { text: 'ପିଇବା ପାଣି', phonetic: 'Piiba pani' },
    'पानी चाहिए': { text: 'ପାଣି ଦରକାର।', phonetic: 'Pani darkar.' },
    'मुझे खाना चाहिए': { text: 'ମୋତେ ଖାଦ୍ୟ ଦରକାର।', phonetic: 'Mote khadya darkar.' },
    'खाना कहाँ मिलेगा': { text: 'ଖାଇବା କେଉଁଠି ମିଳିବ?', phonetic: 'Khaiba keunthi miliba?' },
    'खाना कहाँ मिलेगा?': { text: 'ଖାଇବା କେଉଁଠି ମିଳିବ?', phonetic: 'Khaiba keunthi miliba?' },
    'खाना चाहिए': { text: 'ଖାଦ୍ୟ ଦରକାର।', phonetic: 'Khadya darkar.' },
    'चाय मिलेगी': { text: 'ଚାହା ମିଳିବ କି?', phonetic: 'Chaha miliba ki?' },
    'चाय मिलेगी?': { text: 'ଚାହା ମିଳିବ କି?', phonetic: 'Chaha miliba ki?' },
    'मुझे चाय चाहिए': { text: 'ମୋତେ ଚାହା ଦରକାର।', phonetic: 'Mote chaha darkar.' },
    'मदद करो': { text: 'ଦୟାକରି ସାହାଯ୍ୟ କରନ୍ତୁ।', phonetic: 'Dayakari sahayya karantu.' },
    'मदद चाहिए': { text: 'ସାହାଯ୍ୟ ଦରକାର।', phonetic: 'Sahayya darkar.' },
    'मुझे मदद चाहिए': { text: 'ମୋତେ ସାହାଯ୍ୟ ଦରକାର।', phonetic: 'Mote sahayya darkar.' },
    'कृपया मदद करें': { text: 'ଦୟାକରି ସାହାଯ୍ୟ କରନ୍ତୁ।', phonetic: 'Dayakari sahayya karantu.' },
    'डॉक्टर को बुलाओ': { text: 'ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।', phonetic: 'Daktaranku dakantu.' },
    'अस्पताल कहाँ है': { text: 'ଡାକ୍ତରଖାନା କେଉଁଠି ଅଛି?', phonetic: 'Daktarakhana keunthi achhi?' },
    'अस्पताल कहाँ है?': { text: 'ଡାକ୍ତରଖାନା କେଉଁଠି ଅଛି?', phonetic: 'Daktarakhana keunthi achhi?' },
    'दवाई कहाँ मिलेगी': { text: 'ଔଷଧ କେଉଁଠି ମିଳିବ?', phonetic: 'Aushadha keunthi miliba?' },
    'दवाई की दुकान कहाँ है': { text: 'ଔଷଧ ଦୋକାନ କେଉଁଠି ଅଛି?', phonetic: 'Aushadha dokana keunthi achhi?' },
    'दवाई की दुकान कहाँ है?': { text: 'ଔଷଧ ଦୋକାନ କେଉଁଠି ଅଛି?', phonetic: 'Aushadha dokana keunthi achhi?' },
    'पुलिस को बुलाओ': { text: 'ପୋଲିସକୁ ଡାକନ୍ତୁ।', phonetic: 'Policeku dakantu.' },
    'पुलिस स्टेशन कहाँ है': { text: 'ପୋଲିସ ଷ୍ଟେସନ କେଉଁଠି ଅଛି?', phonetic: 'Police station keunthi achhi?' },
    'पुलिस स्टेशन कहाँ है?': { text: 'ପୋଲିସ ଷ୍ଟେସନ କେଉଁଠି ଅଛି?', phonetic: 'Police station keunthi achhi?' },
    'गाड़ी खराब है': { text: 'ଗାଡ଼ି ଖରାପ ଅଛି।', phonetic: 'Gadi kharap achhi.' },
    'गाड़ी खराब हो गई है': { text: 'ମୋ ଗାଡ଼ି ଖରାପ ହୋଇଯାଇଛି।', phonetic: 'Mo gadi kharap hoiyaichhi.' },
    'मेरी गाड़ी खराब हो गई है': { text: 'ମୋ ଗାଡ଼ି ଖରାପ ହୋଇଯାଇଛି।', phonetic: 'Mo gadi kharap hoiyaichhi.' },
    'मैकेनिक कहाँ मिलेगा': { text: 'ମେକାନିକ କେଉଁଠି ମିଳିବେ?', phonetic: 'Mechanic keunthi milibe?' },
    'मैकेनिक कहाँ मिलेगा?': { text: 'ମେକାନିକ କେଉଁଠି ମିଳିବେ?', phonetic: 'Mechanic keunthi milibe?' },
    'पेट्रोल पंप कहाँ है': { text: 'ପେଟ୍ରୋଲ ପମ୍ପ କେଉଁଠି ଅଛି?', phonetic: 'Petrol pump keunthi achhi?' },
    'पेट्रोल पंप कहाँ है?': { text: 'ପେଟ୍ରୋଲ ପମ୍ପ କେଉଁଠି ଅଛି?', phonetic: 'Petrol pump keunthi achhi?' },
    'बस स्टैंड कहाँ है': { text: 'ବସ ଷ୍ଟାଣ୍ଡ କେଉଁଠି ଅଛି?', phonetic: 'Bus stand keunthi achhi?' },
    'बस स्टैंड कहाँ है?': { text: 'ବସ ଷ୍ଟାଣ୍ଡ କେଉଁଠି ଅଛି?', phonetic: 'Bus stand keunthi achhi?' },
    'रेलवे स्टेशन कहाँ है': { text: 'ରେଳ ଷ୍ଟେସନ କେଉଁଠି ଅଛି?', phonetic: 'Rela station keunthi achhi?' },
    'रेलवे स्टेशन कहाँ है?': { text: 'ରେଳ ଷ୍ଟେସନ କେଉଁଠି ଅଛି?', phonetic: 'Rela station keunthi achhi?' },
    'रास्ता बताओ': { text: 'ଦୟାକରି ରାସ୍ତା କୁହନ୍ତୁ।', phonetic: 'Dayakari rasta kuhantu.' },
    'रास्ता बताइए': { text: 'ଦୟାକରି ରାସ୍ତା କୁହନ୍ତୁ।', phonetic: 'Dayakari rasta kuhantu.' },
    'यह रास्ता कहाँ जाता है': { text: 'ଏହି ରାସ୍ତା କେଉଁଆଡ଼େ ଯାଉଛି?', phonetic: 'Ehi rasta keunade yauchhi?' },
    'यह रास्ता कहाँ जाता है?': { text: 'ଏହି ରାସ୍ତା କେଉଁଆଡ଼େ ଯାଉଛି?', phonetic: 'Ehi rasta keunade yauchhi?' },
    'सीधे आगे': { text: 'ସିଧା ଆଗକୁ', phonetic: 'Sidha aagaku' },
    'सीधे जाइए': { text: 'ସିଧା ଆଗକୁ ଯାଆନ୍ତୁ।', phonetic: 'Sidha aagaku yaantu.' },
    'बाईं तरफ': { text: 'ବାମ ପାଖ', phonetic: 'Bama pakha' },
    'दाईं तरफ': { text: 'ଡାହାଣ ପାଖ', phonetic: 'Dahana pakha' },
    'बाएं मुड़िए': { text: 'ବାମ ପାଖକୁ ଯାଆନ୍ତୁ।', phonetic: 'Bama pakhaku yaantu.' },
    'दाएं मुड़िए': { text: 'ଡାହାଣ ପାଖକୁ ଯାଆନ୍ତୁ।', phonetic: 'Dahana pakhaku yaantu.' },
    'रुको': { text: 'ଟିକେ ଅପେକ୍ଷା କରନ୍ତୁ।', phonetic: 'Tike apeksha karantu.' },
    'रुकिए': { text: 'ଟିକେ ଅପେକ୍ଷା କରନ୍ତୁ।', phonetic: 'Tike apeksha karantu.' },
    'ठहरो': { text: 'ଟିକେ ଅପେକ୍ଷା କରନ୍ତୁ।', phonetic: 'Tike apeksha karantu.' },
    'चलो': { text: 'ଚାଲନ୍ତୁ।', phonetic: 'Chalantu.' },
    'चलिए': { text: 'ଚାଲନ୍ତୁ।', phonetic: 'Chalantu.' },
    'होटल कहाँ है': { text: 'ହୋଟେଲ କେଉଁଠି ଅଛି?', phonetic: 'Hotel keunthi achhi?' },
    'होटल कहाँ है?': { text: 'ହୋଟେଲ କେଉଁଠି ଅଛି?', phonetic: 'Hotel keunthi achhi?' },
    'शौचालय कहाँ है': { text: 'ଶୌଚାଳୟ କେଉଁଠି ଅଛି?', phonetic: 'Shauchalaya keunthi achhi?' },
    'शौचालय कहाँ है?': { text: 'ଶୌଚାଳୟ କେଉଁଠି ଅଛି?', phonetic: 'Shauchalaya keunthi achhi?' },
    'टॉयलेट कहाँ है': { text: 'ଶୌଚାଳୟ କେଉଁଠି ଅଛି?', phonetic: 'Shauchalaya keunthi achhi?' },
    'टॉयलेट कहाँ है?': { text: 'ଶୌଚାଳୟ କେଉଁଠି ଅଛି?', phonetic: 'Shauchalaya keunthi achhi?' },
    'कितने पैसे हुए': { text: 'କେତେ ଟଙ୍କା ହେଲା?', phonetic: 'Kete tanka hela?' },
    'कितने पैसे हुए?': { text: 'କେତେ ଟଙ୍କା ହେଲା?', phonetic: 'Kete tanka hela?' },
    'कितना हुआ': { text: 'କେତେ ଟଙ୍କା ହେଲା?', phonetic: 'Kete tanka hela?' },
    'कितना हुआ?': { text: 'କେତେ ଟଙ୍କା ହେଲା?', phonetic: 'Kete tanka hela?' },
    'इसकी कीमत क्या है': { text: 'ଏହାର ଦାମ କେତେ?', phonetic: 'Eharn daam kete?' },
    'इसकी कीमत क्या है?': { text: 'ଏହାର ଦାମ କେତେ?', phonetic: 'Eharn daam kete?' },
    'यह कितने का है': { text: 'ଏହା କେତେ ଟଙ୍କାର?', phonetic: 'Eha kete tankara?' },
    'यह कितने का है?': { text: 'ଏହା କେତେ ଟଙ୍କାର?', phonetic: 'Eha kete tankara?' },
    'मुझे समझ नहीं आया': { text: 'ମୁଁ ବୁଝିପାରିଲି ନାହିଁ।', phonetic: 'Mun bujhiparili nahin.' },
    'कृपया धीरे बोलिए': { text: 'ଦୟାକରି ଧୀରେ କୁହନ୍ତୁ।', phonetic: 'Dayakari dhire kuhantu.' },
    'खतरा है': { text: 'ବିପଦ ଅଛି!', phonetic: 'Bipada achhi!' },
    'सावधान रहें': { text: 'ସାବଧାନ ରୁହନ୍ତୁ!', phonetic: 'Sabadhana ruhantu!' },
  };

  for (const [hi, odia] of Object.entries(directMap)) {
    if (text === hi || clean === cleanQueryPunctuation(hi)) {
      return {
        text: odia.text,
        phonetic: odia.phonetic,
        notes: 'Direct authentic Odia translation',
      };
    }
  }

  return null;
}

// Reverse translation (Odia -> Hindi)
export function applyOdiaToHindiRules(odiaText: string): { text: string; phonetic: string; notes: string } | null {
  const text = odiaText.trim();
  const clean = cleanQueryPunctuation(text);

  const directMap: Record<string, { text: string; phonetic: string }> = {
    'ହଁ': { text: 'हाँ', phonetic: 'Haan' },
    'ହଁ ଆଜ୍ଞା': { text: 'हाँ जी', phonetic: 'Haan ji' },
    'ନାହିଁ': { text: 'नहीं', phonetic: 'Nahi' },
    'ନା': { text: 'ना', phonetic: 'Na' },
    'ନମସ୍କାର': { text: 'नमस्ते', phonetic: 'Namaste' },
    'ନମସ୍କାର ଆଜ୍ଞା': { text: 'नमस्ते जी', phonetic: 'Namaste ji' },
    'ଧନ୍ୟବାଦ': { text: 'धन्यवाद', phonetic: 'Dhanyavaad' },
    'ବହୁତ ଧନ୍ୟବାଦ': { text: 'बहुत धन्यवाद', phonetic: 'Bahut dhanyavaad' },
    'ଆପଣ କେମିତି ଅଛନ୍ତି': { text: 'आप कैसे हैं?', phonetic: 'Aap kaise hain?' },
    'ଆପଣ କେମିତି ଅଛନ୍ତି?': { text: 'आप कैसे हैं?', phonetic: 'Aap kaise hain?' },
    'କେମିତି ଅଛନ୍ତି': { text: 'कैसे हैं?', phonetic: 'Kaise hain?' },
    'ମୁଁ ଭଲ ଅଛି': { text: 'मैं ठीक हूँ।', phonetic: 'Main theek hoon.' },
    'ମୁଁ ଭଲ ଅଛି।': { text: 'मैं ठीक हूँ।', phonetic: 'Main theek hoon.' },
    'ସବୁ ଠିକ ଅଛି': { text: 'सब ठीक है।', phonetic: 'Sab theek hai.' },
    'ସବୁ ଠିକ ଅଛି।': { text: 'सब ठीक है।', phonetic: 'Sab theek hai.' },
    'ଠିକ ଅଛି': { text: 'ठीक है।', phonetic: 'Theek hai.' },
    'ଠିକ ଅଛି।': { text: 'ठीक है।', phonetic: 'Theek hai.' },
    'ଭଲ': { text: 'अच्छा', phonetic: 'Achha' },
    'ସିଧା ଆଗକୁ': { text: 'सीधे आगे', phonetic: 'Seedhe aage' },
    'ବାମ ପାଖ': { text: 'बाईं तरफ', phonetic: 'Baayein taraf' },
    'ଡାହାଣ ପାଖ': { text: 'दाईं तरफ', phonetic: 'Daayein taraf' },
    'ଟିକେ ଅପେକ୍ଷା କରନ୍ତୁ': { text: 'थोड़ा रुकिए', phonetic: 'Thoda rukiye' },
    'ଟିକେ ଅପେକ୍ଷା କର': { text: 'थोड़ा रुकिए', phonetic: 'Thoda rukiye' },
    'ଚାଲନ୍ତୁ': { text: 'चलिए', phonetic: 'Chaliye' },
    'କେତେ ଟଙ୍କା ହେଲା': { text: 'कितने पैसे हुए?', phonetic: 'Kitne paise hue?' },
    'କେତେ ଟଙ୍କା ହେଲା?': { text: 'कितने पैसे हुए?', phonetic: 'Kitne paise hue?' },
    'କେତେ ଟଙ୍କା': { text: 'कितने पैसे?', phonetic: 'Kitne paise?' },
    'ପାଣି ଦିଅନ୍ତୁ': { text: 'पानी दीजिए / पानी दो', phonetic: 'Paani dijiye / Paani do' },
    'ଦୟାକରି ପାଣି ଦିଅନ୍ତୁ': { text: 'कृपया पानी दीजिए', phonetic: 'Kripya paani dijiye' },
    'ଦୟାକରି ପାଣି ଦିଅନ୍ତୁ।': { text: 'कृपया पानी दीजिए', phonetic: 'Kripya paani dijiye' },
    'ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ': { text: 'डॉक्टर को बुलाओ', phonetic: 'Doctor ko bulao' },
    'ଡାକ୍ତରଙ୍କୁ ଡାକନ୍ତୁ।': { text: 'डॉक्टर को बुलाओ', phonetic: 'Doctor ko bulao' },
    'ରାସ୍ତା କୁହନ୍ତୁ': { text: 'रास्ता बताइए / रास्ता बताओ', phonetic: 'Rasta bataiye / Rasta batao' },
    'ଦୟାକରି ରାସ୍ତା କୁହନ୍ତୁ': { text: 'कृपया रास्ता बताइए', phonetic: 'Kripya rasta bataiye' },
    'ଦୟାକରି ରାସ୍ତା କୁହନ୍ତୁ।': { text: 'कृपया रास्ता बताइए', phonetic: 'Kripya rasta bataiye' },
    'ସାହାଯ୍ୟ କରନ୍ତୁ': { text: 'मदद कीजिए / मदद करो', phonetic: 'Madad kijiye / Madad karo' },
    'ଦୟାକରି ସାହାଯ୍ୟ କରନ୍ତୁ': { text: 'कृपया मदद कीजिए', phonetic: 'Kripya madad kijiye' },
    'ଦୟାକରି ସାହାଯ୍ୟ କରନ୍ତୁ।': { text: 'कृपया मदद कीजिए', phonetic: 'Kripya madad kijiye' },
    'ମୋତେ ସାହାଯ୍ୟ ଦରକାର': { text: 'मुझे सहायता चाहिए', phonetic: 'Mujhe sahayata chahiye' },
    'ମୋତେ ସାହାଯ୍ୟ ଦରକାର!': { text: 'मुझे सहायता चाहिए!', phonetic: 'Mujhe sahayata chahiye!' },
    'ହୋଟେଲ କେଉଁଠି ଅଛି': { text: 'होटल कहाँ है?', phonetic: 'Hotel kahan hai?' },
    'ହୋଟେଲ କେଉଁଠି ଅଛି?': { text: 'होटल कहाँ है?', phonetic: 'Hotel kahan hai?' },
    'ଶୌଚାଳୟ କେଉଁଠି ଅଛି': { text: 'शौचालय कहाँ है?', phonetic: 'Shauchalaya kahan hai?' },
    'ଶୌଚାଳୟ କେଉଁଠି ଅଛି?': { text: 'शौचालय कहाँ है?', phonetic: 'Shauchalaya kahan hai?' },
    'ପେଟ୍ରୋଲ ପମ୍ପ କେଉଁଠି ଅଛି': { text: 'पेट्रोल पंप कहाँ है?', phonetic: 'Petrol pump kahan hai?' },
    'ପେଟ୍ରୋଲ ପମ୍ପ କେଉଁଠି ଅଛି?': { text: 'पेट्रोल पंप कहाँ है?', phonetic: 'Petrol pump kahan hai?' },
    'ଗାଡ଼ି ଖରାପ ଅଛି': { text: 'गाड़ी खराब है', phonetic: 'Gaadi kharaab hai' },
    'ଗାଡ଼ି ଖରାପ ଅଛି।': { text: 'गाड़ी खराब है', phonetic: 'Gaadi kharaab hai' },
    'ଶୁଭ ସକାଳ': { text: 'सुप्रभात', phonetic: 'Suprabhat' },
    'ଶୁଭ ରାତ୍ରି': { text: 'शुभ रात्रि', phonetic: 'Shubh raatri' },
    'କୁଆଡ଼େ ଯାଉଛନ୍ତି': { text: 'कहाँ जा रहे हैं?', phonetic: 'Kahan jaa rahe hain?' },
    'କୁଆଡ଼େ ଯାଉଛନ୍ତି?': { text: 'कहाँ जा रहे हैं?', phonetic: 'Kahan jaa rahe hain?' },
    'ଆପଣଙ୍କ ନାମ କଣ': { text: 'आपका नाम क्या है?', phonetic: 'Aapka naam kya hai?' },
    'ଆପଣଙ୍କ ନାମ କଣ?': { text: 'आपका नाम क्या है?', phonetic: 'Aapka naam kya hai?' },
    'ମୋ ନାମ': { text: 'मेरा नाम', phonetic: 'Mera naam' },
    'ଖାଦ୍ୟ କେଉଁଠି ମିଳିବ': { text: 'खाना कहाँ मिलेगा?', phonetic: 'Khaana kahan milega?' },
    'ଖାଦ୍ୟ କେଉଁଠି ମିଳିବ?': { text: 'खाना कहाँ मिलेगा?', phonetic: 'Khaana kahan milega?' },
    'ଏଠାରେ ରୁହନ୍ତୁ': { text: 'यहाँ रुकिए', phonetic: 'Yahan rukiye' },
    'ଏଠାକୁ ଆସନ୍ତୁ': { text: 'यहाँ आइए', phonetic: 'Yahan aaiye' },
  };

  for (const [or, hi] of Object.entries(directMap)) {
    if (text === or || clean === cleanQueryPunctuation(or)) {
      return {
        text: hi.text,
        phonetic: hi.phonetic,
        notes: 'Reverse translated from Odia into Hindi',
      };
    }
  }

  return null;
}

// Transliterate Devanagari to Romanized phonetic script for audio-visual guide
export function transliterateDevanagariToPhonetic(devanagari: string): string {
  const charMap: Record<string, string> = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
    'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
    'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
    'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
    'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
    'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
    'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n', '्': '',
    '़': '', '।': '.', '—': '-',
  };

  let out = '';
  for (let i = 0; i < devanagari.length; i++) {
    const ch = devanagari[i];
    if (charMap[ch] !== undefined) {
      out += charMap[ch];
    } else {
      out += ch;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

// Transliterate Odia characters into phonetic Roman
export function transliterateOdiaToPhonetic(odia: string): string {
  const odiaMap: Record<string, string> = {
    'ଅ': 'a', 'ଆ': 'aa', 'ଇ': 'i', 'ଈ': 'ee', 'ଉ': 'u', 'ଊ': 'oo', 'ଏ': 'e', 'ଐ': 'ai', 'ଓ': 'o', 'ଔ': 'au',
    'କ': 'k', 'ଖ': 'kh', 'ଗ': 'g', 'ଘ': 'gh', 'ଙ': 'ng',
    'ଚ': 'ch', 'ଛ': 'chh', 'ଜ': 'j', 'ଝ': 'jh', 'ଞ': 'ny',
    'ଟ': 't', 'ଠ': 'th', 'ଡ': 'd', 'ଢ': 'dh', 'ଣ': 'n',
    'ତ': 't', 'ଥ': 'th', 'ଦ': 'd', 'ଧ': 'dh', 'ନ': 'n',
    'ପ': 'p', 'ଫ': 'ph', 'ବ': 'b', 'ଭ': 'bh', 'ମ': 'm',
    'ଯ': 'y', 'ୟ': 'ya', 'ର': 'r', 'ଳ': 'l', 'ଲ': 'l', 'ୱ': 'w', 'ଶ': 'sh', 'ଷ': 'sh', 'ସ': 's', 'ହ': 'h',
    'ା': 'a', 'ି': 'i', 'ୀ': 'ee', 'ୁ': 'u', 'ୂ': 'oo', 'େ': 'e', 'ୈ': 'ai', 'ୋ': 'o', 'ୌ': 'au', 'ଂ': 'n', 'ଁ': 'n', '୍': '',
    '।': '.',
  };

  let out = '';
  for (let i = 0; i < odia.length; i++) {
    const ch = odia[i];
    if (odiaMap[ch] !== undefined) {
      out += odiaMap[ch];
    } else {
      out += ch;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

// Transliterate Malayalam characters into phonetic Roman
export function transliterateMalayalamToPhonetic(malayalam: string): string {
  const mlMap: Record<string, string> = {
    'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ee', 'ഉ': 'u', 'ഊ': 'oo', 'എ': 'e', 'ഏ': 'ee', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'oo', 'ഔ': 'au',
    'ക': 'k', 'ഖ': 'kh', 'ഗ': 'g', 'ഘ': 'gh', 'ങ': 'ng',
    'ച': 'ch', 'ഛ': 'chh', 'ജ': 'j', 'ଝ': 'jh', 'ഞ': 'ny',
    'ട': 't', 'ഠ': 'th', 'ഡ': 'd', 'ഢ': 'dh', 'ണ': 'n',
    'ത': 't', 'ഥ': 'th', 'ദ': 'd', 'ധ': 'dh', 'ന': 'n',
    'പ': 'p', 'ഫ': 'ph', 'ബ': 'b', 'ഭ': 'bh', 'മ': 'm',
    'യ': 'y', 'ര': 'r', 'ല': 'l', 'വ': 'v', 'ശ': 'sh', 'ഷ': 'sh', 'സ': 's', 'ഹ': 'h',
    'ാ': 'a', 'ി': 'i', 'ീ': 'ee', 'ു': 'u', 'ൂ': 'oo', 'െ': 'e', 'േ': 'ee', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'o', 'ൌ': 'au', 'ം': 'n', '്': '',
  };

  let out = '';
  for (let i = 0; i < malayalam.length; i++) {
    const ch = malayalam[i];
    if (mlMap[ch] !== undefined) {
      out += mlMap[ch];
    } else {
      out += ch;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

// Helper to strip punctuation and spacing for robust offline phrase matching
function cleanQueryPunctuation(str: string): string {
  return str.toLowerCase().replace(/[!?।,.\s+—\-_/\\()]/g, '').trim();
}

// Offline Lexicon lookup engine
export function findInOfflinePhrasebook(
  inputText: string,
  sourceLang: LanguageCode,
  targetLang: LanguageCode
): { text: string; phonetic: string; notes?: string } | null {
  const trimmed = inputText.trim();
  const cleanQ = cleanQueryPunctuation(trimmed);

  if (!cleanQ) return null;

  // Resolve 'auto' source language using intelligent script and lexicon detection
  const resolvedSource: LanguageCode = sourceLang === 'auto' ? detectLanguage(trimmed) : sourceLang;

  // 1. Direct Morpho-phonetic dialect rules (Hindi <-> Odia)
  if (resolvedSource === 'hi' && targetLang === 'or') {
    const odiaRule = applyOdiaDialectRules(trimmed);
    if (odiaRule) return odiaRule;
  }
  if (resolvedSource === 'or' && targetLang === 'hi') {
    const hiRule = applyOdiaToHindiRules(trimmed);
    if (hiRule) return hiRule;
  }

  // 2. Exact match check in curated OFFLINE_PHRASEBOOK
  for (const phrase of OFFLINE_PHRASEBOOK) {
    let sourceClean = '';
    if (resolvedSource === 'en') sourceClean = cleanQueryPunctuation(phrase.english);
    else if (resolvedSource === 'hi') sourceClean = cleanQueryPunctuation(phrase.hindi.text);
    else if (resolvedSource === 'or') sourceClean = cleanQueryPunctuation(phrase.odia.text);
    else if (resolvedSource === 'mjl') sourceClean = cleanQueryPunctuation(phrase.mandali.text);
    else if (resolvedSource === 'ml' && phrase.malayalam) sourceClean = cleanQueryPunctuation(phrase.malayalam.text);

    if (sourceClean && cleanQ === sourceClean) {
      if (targetLang === 'hi') return { text: phrase.hindi.text, phonetic: phrase.hindi.phonetic, notes: 'Direct match from offline interstate emergency phrasebook' };
      if (targetLang === 'en') return { text: phrase.english, phonetic: phrase.english, notes: 'Direct match from offline phrasebook' };
      if (targetLang === 'or') return { text: phrase.odia.text, phonetic: phrase.odia.phonetic, notes: 'Direct match from offline phrasebook' };
      if (targetLang === 'mjl') return { text: phrase.mandali.text, phonetic: phrase.mandali.phonetic, notes: 'Authentic Mandali phrasing from offline phrasebook' };
      if (targetLang === 'ml' && phrase.malayalam) return { text: phrase.malayalam.text, phonetic: phrase.malayalam.phonetic, notes: 'Direct match from offline Malayalam lexicon' };
    }
  }

  // 3. Substring / Prefix match ONLY for queries of sufficient length (>= 5 chars) to prevent short word false positives
  if (cleanQ.length >= 5) {
    for (const phrase of OFFLINE_PHRASEBOOK) {
      let sourceClean = '';
      if (resolvedSource === 'en') sourceClean = cleanQueryPunctuation(phrase.english);
      else if (resolvedSource === 'hi') sourceClean = cleanQueryPunctuation(phrase.hindi.text);
      else if (resolvedSource === 'or') sourceClean = cleanQueryPunctuation(phrase.odia.text);
      else if (resolvedSource === 'mjl') sourceClean = cleanQueryPunctuation(phrase.mandali.text);
      else if (resolvedSource === 'ml' && phrase.malayalam) sourceClean = cleanQueryPunctuation(phrase.malayalam.text);

      if (sourceClean) {
        const isPrefixMatch = sourceClean.startsWith(cleanQ) || (sourceClean.length >= 7 && cleanQ.startsWith(sourceClean));
        const isSubMatch = (cleanQ.length >= 6 && sourceClean.includes(cleanQ)) || (sourceClean.length >= 6 && cleanQ.includes(sourceClean));

        if (isPrefixMatch || isSubMatch) {
          if (targetLang === 'hi') return { text: phrase.hindi.text, phonetic: phrase.hindi.phonetic, notes: 'Direct match from offline interstate emergency phrasebook' };
          if (targetLang === 'en') return { text: phrase.english, phonetic: phrase.english, notes: 'Direct match from offline phrasebook' };
          if (targetLang === 'or') return { text: phrase.odia.text, phonetic: phrase.odia.phonetic, notes: 'Direct match from offline phrasebook' };
          if (targetLang === 'mjl') return { text: phrase.mandali.text, phonetic: phrase.mandali.phonetic, notes: 'Authentic Mandali phrasing from offline phrasebook' };
          if (targetLang === 'ml' && phrase.malayalam) return { text: phrase.malayalam.text, phonetic: phrase.malayalam.phonetic, notes: 'Direct match from offline Malayalam lexicon' };
        }
      }
    }
  }

  return null;
}

/**
 * Intelligent Language & Regional Dialect Detector
 * Detects scripts (Odia, Gurmukhi, Bengali, Malayalam, Tamil, Telugu, Latin)
 * and distinguishes Devanagari regional dialects (Mandali / Mandyali vs Hindi).
 */
export function detectLanguage(text: string): LanguageCode {
  if (!text || !text.trim()) return 'hi';
  const trimmed = text.trim();

  // 1. Odia Unicode block: \u0B00-\u0B7F
  if (/[\u0B00-\u0B7F]/.test(trimmed)) {
    return 'or'; // Odia for Urmila
  }

  // 2. Gurmukhi / Punjabi: \u0A00-\u0A7F
  if (/[\u0A00-\u0A7F]/.test(trimmed)) {
    return 'pa';
  }

  // 3. Bengali / Assamese: \u0980-\u09FF
  if (/[\u0980-\u09FF]/.test(trimmed)) {
    return 'bn';
  }

  // 4. Tamil: \u0B80-\u0BFF
  if (/[\u0B80-\u0BFF]/.test(trimmed)) {
    return 'ta';
  }

  // 5. Telugu: \u0C00-\u0C7F
  if (/[\u0C00-\u0C7F]/.test(trimmed)) {
    return 'te';
  }

  // 6. Malayalam: \u0D00-\u0D7F
  if (/[\u0D00-\u0D7F]/.test(trimmed)) {
    return 'ml';
  }

  // 7. Gujarati: \u0A80-\u0AFF
  if (/[\u0A80-\u0AFF]/.test(trimmed)) {
    return 'gu';
  }

  // 8. Kannada: \u0C80-\u0CFF
  if (/[\u0C80-\u0CFF]/.test(trimmed)) {
    return 'kn';
  }

  // 9. Devanagari block: \u0900-\u097F
  if (/[\u0900-\u097F]/.test(trimmed)) {
    // Check if it contains distinctive Mandyali / Mandali Pahadi lexicon:
    const mandaliTokens = [
      'तुसां', 'तुहाड़ा', 'तुहाडे', 'कुथु', 'कुथी', 'जांदे', 'आसा', 'ऐन्सा', 'कजो',
      'केहड़ा', 'माहणू', 'गल्ल', 'रास्ता', 'कुत्थे', 'मिंजो', 'तिंजो', 'खाड्डा',
      'पाणी', 'चहिदा', 'चहिदी', 'चहिदे', 'मां जो', 'सदो', 'इथी', 'इत्थी', 'म्हारी',
      'अस्सां', 'भुल्ली', 'गेहेन', 'मेहरबानी', 'बड़ा-बड़ा', 'हौर', 'कित्ती', 'सुणाओ',
      'दादिए', 'नां के', 'केड़ा हाल', 'नि आंदा', 'आंदे', 'करदे'
    ];
    for (const token of mandaliTokens) {
      if (trimmed.includes(token)) {
        return 'mjl'; // Mandali Pahadi
      }
    }
    return 'hi'; // Default Devanagari to Hindi
  }

  // 10. Latin / English letters: [a-zA-Z]
  if (/[a-zA-Z]/.test(trimmed)) {
    return 'en';
  }

  return 'hi';
}

export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code) || SUPPORTED_LANGUAGES[1]; // default to Hindi if not found
}
