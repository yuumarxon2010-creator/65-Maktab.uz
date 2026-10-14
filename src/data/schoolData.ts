export interface Teacher {
  id: string;
  name: string;
  subject: string;
  rank: string;
  experience: number;
  photo: string;
  achievements: string;
}

export interface Club {
  id: string;
  name: string;
  category: string;
  teacher: string;
  teacherRole: string;
  teacherPhoto: string;
  schedule: string;
  room: string;
  targetGrades: string;
  description: string;
  badge: string;
  color: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
  featured?: boolean;
}

export interface CommunityMessage {
  id: string;
  author: string;
  grade: string;
  avatar: string;
  text: string;
  time: string;
  fileAttachment?: {
    name: string;
    type: 'image' | 'file';
    url: string;
  };
  likes: number;
}

export interface StudentRankItem {
  rank: number;
  name: string;
  grade: string;
  score: number;
  badge: string;
  category: string;
  quarter: string;
}

export interface ClassRankItem {
  rank: number;
  className: string;
  teacher: string;
  activityScore: number;
  achievementsCount: number;
}

export interface ScheduleItem {
  id: string;
  lessonNumber: number;
  time: string;
  breakAfter: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface ShiftInfo {
  shiftNumber: 1 | 2;
  title: string;
  timeRange: string;
  grades: string;
  description: string;
}

export interface LibraryBook {
  id: string;
  title: string;
  subject: string;
  grade: number;
  author: string;
  year: number;
  fileSize: string;
  format: string;
  pages: number;
  color: string;
  driveUrl: string;
  description: string;
}

export interface AchievementItem {
  id: string;
  studentName: string;
  grade: string;
  title: string;
  competition: string;
  medal: 'gold' | 'silver' | 'bronze' | 'special';
  year: string;
  mentor: string;
  photo: string;
}

// ----------------------------------------------------------------------------
// MAKTAB MA'LUMOTLARI VA ALOQA
// ----------------------------------------------------------------------------
export const SCHOOL_INFO = {
  number: 65,
  name: "Pastdarg'om tumani 65-sonli umumta'lim maktabi",
  shortName: "65-sonli Maktab",
  district: "Pastdarg'om tumani",
  region: "Samarqand viloyati",
  address: "Samarqand viloyati, Pastdarg'om tumani, Maktab ko'chasi 65-uy",
  motto: "Kelajak bunyodkorlari tarbiya topadigan maskan",
  subMotto: "Zamonaviy IT, sifatli ta'lim, intellektual salohiyat va mustahkam ma'naviyat uyg'unlashgan dargoh.",
  // Display email vs Actual recipient mailto
  displayEmail: "65maktab.uz@gmail.com",
  actualEmail: "y.u.umarxon2010@gmail.com",
  phoneDisplay: "+998 77 293 64 88",
  phoneRaw: "+998772936488",
  telegramBotUrl: "http://t.me/pastdargom_65maktab_uzbot",
  telegramChannelUrl: "https://t.me/pastdargom_65maktab",
  workingHours: "Dushanba - Shanba: 08:00 - 18:00 (Yakshanba dam olish)",
  stats: {
    students: "1,240+",
    teachers: "78",
    classrooms: "42",
    olympiadWinners: "35+",
    universityAdmission: "92%",
    digitalBooks: "500+",
  },
};

// ----------------------------------------------------------------------------
// TO'GARAKLAR RO'YXATI (CLUBS SECTION)
// ----------------------------------------------------------------------------
export const SCHOOL_CLUBS: Club[] = [
  {
    id: "it-coding",
    name: "IT va Dasturlash (Web & Python)",
    category: "Axborot Texnologiyalari",
    teacher: "Jasur Alimov",
    teacherRole: "Informatika va IT o'qituvchisi",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    schedule: "Seshanba, Payshanba | 15:00 - 16:30",
    room: "204-kompyuter sinfi",
    targetGrades: "7 - 11 sinflar",
    description: "Veb-saytlar yaratish (HTML, CSS, JS) va Python tilida dasturlash, algoritmik fikrlash hamda sun'iy intellekt asoslari.",
    badge: "Eng ommabop",
    color: "from-blue-600 to-indigo-700",
  },
  {
    id: "english-speaking",
    name: "English Speaking & IELTS Club",
    category: "Chet tillari",
    teacher: "Madina Qosimova",
    teacherRole: "Oliy toifali ingliz tili ustozi (IELTS 8.5)",
    teacherPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    schedule: "Dushanba, Chorshanba, Juma | 14:00 - 15:30",
    room: "108-til xonasi",
    targetGrades: "5 - 11 sinflar",
    description: "Og'zaki so'zlashuv, grammatika, xalqaro CEFR va IELTS imtihonlariga tizimli tayyorgarlik.",
    badge: "Sertifikat beriladi",
    color: "from-emerald-600 to-teal-700",
  },
  {
    id: "chess-logic",
    name: "Shaxmat va Mantiqiy Tafakkur",
    category: "Aqliy Sport",
    teacher: "Rustam Nurmatov",
    teacherRole: "Sport ustasi, shaxmat murabbiyi",
    teacherPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    schedule: "Shanba | 10:00 - 12:30",
    room: "Sport klub zali",
    targetGrades: "1 - 11 sinflar",
    description: "Debyutlar, taktik yurishlar va musobaqa strategiyasi. Tuman hamda viloyat turnirlariga yo'llanma.",
    badge: "Olimpiada zaxirasi",
    color: "from-amber-600 to-orange-700",
  },
  {
    id: "robotics-stem",
    name: "Robototexnika va Sun'iy Intellekt",
    category: "Muhandislik & STEM",
    teacher: "Bobur Mirzayev",
    teacherRole: "Fizika va robototexnika mutaxassisi",
    teacherPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    schedule: "Chorshanba, Shanba | 15:30 - 17:00",
    room: "STEM laboratoriyasi",
    targetGrades: "6 - 10 sinflar",
    description: "Arduino mikrokontrollerlari, datchiklar, mexanika va avtonom robotlarni yig'ish hamda dasturlash.",
    badge: "Yangi loyiha",
    color: "from-purple-600 to-violet-700",
  },
  {
    id: "young-chemists",
    name: "Yosh Kimyogarlar va Biologlar",
    category: "Tabiiy Fanlar",
    teacher: "Nargiza Rahimova",
    teacherRole: "Biologiya va Kimyo fanlari ustozi",
    teacherPhoto: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
    schedule: "Payshanba | 14:30 - 16:00",
    room: "305-kimyo laboratoriyasi",
    targetGrades: "7 - 11 sinflar",
    description: "Qiziqarli laboratoriya tajribalari, moddalar reaksiyasi va fan olimpiadalariga maxsus tayyorgarlik.",
    badge: "Amaliy laboratoriya",
    color: "from-rose-600 to-pink-700",
  },
  {
    id: "sports-volleyball",
    name: "Voleybol va Futbol To'garagi",
    category: "Sport va Salomatlik",
    teacher: "Sardor Berdiyev",
    teacherRole: "Jismoniy tarbiya fani o'qituvchisi",
    teacherPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    schedule: "Seshanba, Juma | 16:00 - 17:30",
    room: "Maktab yopiq sport zali",
    targetGrades: "5 - 11 sinflar",
    description: "Jamoaviy o'yinlar, jismoniy chidamlilik va umumta'lim maktablararo 'Umid nihollari' musobaqalariga tayyorgarlik.",
    badge: "Sog'lom hayot",
    color: "from-cyan-600 to-blue-700",
  },
];

// ----------------------------------------------------------------------------
// YANGILIKLAR VA MAQOLALAR TASMASI (NEWS & ARTICLES)
// ----------------------------------------------------------------------------
export const SCHOOL_NEWS: NewsArticle[] = [
  {
    id: "news-olympiad-win",
    title: "65-sonli maktab o'quvchilari Fan olimpiadasida viloyatda 1-o'rinni egallashdi!",
    excerpt: "Pastdarg'om tumani sharafini himoya qilgan o'quvchilarimiz Matematika va Informatika fanlaridan tengsiz deb topildi.",
    content: "Samarqand viloyati bo'yicha o'tkazilgan umumta'lim maktablari o'quvchilari o'rtasidagi asosiy fan olimpiadasining viloyat bosqichida maktabimizning 10- va 11-sinf o'quvchilari faxrli 1-o'rinni qo'lga kiritishdi. O'quvchilarimizga tuman hokimligi va xalq ta'limi bo'limi tomonidan qimmatbaho esdalik sovg'alari topshirildi. Endilikda ular Respublika bosqichida viloyat sharafini himoya qilishadi.",
    category: "Yutuqlarimiz",
    date: "12-Oktyabr, 2026",
    author: "Direktor o'rinbosari",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    readTime: "3 daqiqa",
    featured: true,
  },
  {
    id: "news-it-hall",
    title: "Maktabimizda zamonaviy IT-laboratoriya va elektron media zali ochildi",
    excerpt: "Eng so'nggi rusumdagi kompyuterlar va yuqori tezlikdagi internet bilan jihozlangan yangi IT-xona o'quvchilar ixtiyoriga berildi.",
    content: "O'quvchilarimizga zamonaviy raqamli ko'nikmalarni egallashlari uchun barcha qulayliklar yaratilmoqda. Yangi ochilgan IT-markazda dasturlash to'garaklari, grafik dizayn va sun'iy intellekt asoslari o'rgatiladi. Har bir o'quvchi xalqaro IT-sertifikatlar olish imkoniyatiga ega bo'ladi.",
    category: "Maktab hayoti",
    date: "08-Oktyabr, 2026",
    author: "IT koordinatori",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    readTime: "2 daqiqa",
  },
  {
    id: "news-zakovat",
    title: "\"Zakovat\" intellektual bellashuvida 9-\"A\" sinf jamoasi chempion bo'ldi",
    excerpt: "Maktab ma'naviyat oyligi doirasida o'tkazilgan bilimlar bellashuvida qizg'in bahslar bo'lib o'tdi.",
    content: "O'quvchilarning mantiqiy fikrlash doirasini kengaytirish, kitobxonlikka qiziqishini oshirish maqsadida an'anaviy Zakovat turniri tashkil etildi. Final bosqichida 9-\"A\" sinf jamoasi barcha raqiblarini ortda qoldirib, Maktab Kubogini qo'lga kiritdi.",
    category: "Tadbirlar",
    date: "02-Oktyabr, 2026",
    author: "Yoshlar yetakchisi",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    readTime: "2 daqiqa",
  },
];

// ----------------------------------------------------------------------------
// O'QUVCHILAR UCHUN JAMOAVIY CHAT (COMMUNITY CHAT INITIAL DATA)
// ----------------------------------------------------------------------------
export const INITIAL_COMMUNITY_MESSAGES: CommunityMessage[] = [
  {
    id: "msg-1",
    author: "Shohruh Rustamov",
    grade: "10-A sinf",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    text: "Salom barchaga! Ertaga 1-smena uchun dars jadvali o'zgarmadimi? 3-soatda fizika laboratoriya ishi bormi?",
    time: "09:42",
    likes: 4,
  },
  {
    id: "msg-2",
    author: "Zilola Mahmudova",
    grade: "10-A sinf",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    text: "Salom Shohruh! Ha, ustoz aytdilar, ertaga optika bo'yicha amaliy ish qilamiz. Formulalarni takrorlab kelish kerak.",
    time: "09:45",
    likes: 6,
  },
  {
    id: "msg-3",
    author: "Azizbek Karimov",
    grade: "9-B sinf",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    text: "IT to'garagiga yangi ro'yxatdan o'tganlar bormi? Seshanba kuni soat 15:00 da 204-xonada birinchi dars ekan!",
    time: "10:12",
    likes: 8,
  },
  {
    id: "msg-4",
    author: "Dildora Xoliqova",
    grade: "11-B sinf",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    text: "Kutubxonadan 10-sinf Geometriya darsligini yuklab oldim, juda qulay ekan! 65-MaktabAI yordamchisi ham misollarni zo'r tushuntirib beryapti.",
    time: "11:05",
    likes: 12,
  },
];

// ----------------------------------------------------------------------------
// O'QITUVCHILAR RO'YXATI
// ----------------------------------------------------------------------------
export const TEACHERS_LIST: Teacher[] = [
  {
    id: "t-1",
    name: "Alisher Ergashev",
    subject: "Matematika va Algebra",
    rank: "Oliy toifali o'qituvchi",
    experience: 18,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    achievements: "Xalq ta'limi a'lochisi, viloyat olimpiadasi koordinatori",
  },
  {
    id: "t-2",
    name: "Dilnoza Olimova",
    subject: "Ona tili va Adabiyot",
    rank: "Oliy toifali o'qituvchi",
    experience: 15,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    achievements: "'Yilning eng yaxshi fan o'qituvchisi' tanlovi laureati",
  },
  {
    id: "t-3",
    name: "Jasur Alimov",
    subject: "Informatika va Dasturlash",
    rank: "1-toifali o'qituvchi",
    experience: 8,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    achievements: "IT-Park mentor, Maktab dasturlash to'garagi rahbari",
  },
  {
    id: "t-4",
    name: "Nargiza Rahimova",
    subject: "Fizika va Astronomiya",
    rank: "Oliy toifali o'qituvchi",
    experience: 20,
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
    achievements: "STEAM ta'limi bo'yicha xalqaro sertifikat sohibi",
  },
  {
    id: "t-5",
    name: "Farhod Jo'rayev",
    subject: "O'zbekiston va Jahon Tarixi",
    rank: "1-toifali o'qituvchi",
    experience: 12,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    achievements: "Tarix fani bo'yicha tuman metodik kengashi a'zosi",
  },
  {
    id: "t-6",
    name: "Madina Qosimova",
    subject: "Ingliz tili (Foreign Language)",
    rank: "Oliy toifali o'qituvchi",
    experience: 10,
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    achievements: "IELTS 8.5 sertifikati, Speaking Club rahbari",
  },
];

// ----------------------------------------------------------------------------
// QO'NG'IROQLAR VA SMENA JADVALI
// ----------------------------------------------------------------------------
export const SHIFTS: ShiftInfo[] = [
  {
    shiftNumber: 1,
    title: "1-Smena (Yuqori va bitiruvchi sinflar)",
    timeRange: "08:00 — 12:55",
    grades: "8, 9, 10, 11-sinflar",
    description: "Asosiy o'quv dasturi, chuqurlashtirilgan fanlar va laboratoriya mashg'ulotlari.",
  },
  {
    shiftNumber: 2,
    title: "2-Smena (Boshlang'ich va o'rta sinflar)",
    timeRange: "13:15 — 17:50",
    grades: "5, 6, 7-sinflar",
    description: "Pedagogik me'yorlarga moslashtirilgan darslar, to'garaklar va mustaqil ta'lim.",
  },
];

export const BELL_SCHEDULE_SHIFT_1 = [
  { lesson: 1, start: "08:00", end: "08:45", breakMinutes: "5 daqiqa tanaffus" },
  { lesson: 2, start: "08:50", end: "09:35", breakMinutes: "10 daqiqa tanaffus" },
  { lesson: 3, start: "09:45", end: "10:30", breakMinutes: "15 daqiqa (Katta tanaffus & nonushta)" },
  { lesson: 4, start: "10:45", end: "11:30", breakMinutes: "5 daqiqa tanaffus" },
  { lesson: 5, start: "11:35", end: "12:20", breakMinutes: "5 daqiqa tanaffus" },
  { lesson: 6, start: "12:25", end: "13:10", breakMinutes: "Smena almashinuvi" },
];

export const BELL_SCHEDULE_SHIFT_2 = [
  { lesson: 1, start: "13:15", end: "14:00", breakMinutes: "5 daqiqa tanaffus" },
  { lesson: 2, start: "14:05", end: "14:50", breakMinutes: "10 daqiqa tanaffus" },
  { lesson: 3, start: "15:00", end: "15:45", breakMinutes: "15 daqiqa (Katta tanaffus)" },
  { lesson: 4, start: "16:00", end: "16:45", breakMinutes: "5 daqiqa tanaffus" },
  { lesson: 5, start: "16:50", end: "17:35", breakMinutes: "To'garaklar vaqti" },
];

// ----------------------------------------------------------------------------
// SINF BO'YICHA DARS JADVALLARI
// ----------------------------------------------------------------------------
export const CLASS_SCHEDULES: Record<string, ScheduleItem[]> = {
  "9-A": [
    { id: "s1", lessonNumber: 1, time: "08:00 - 08:45", breakAfter: "5 min", subject: "Algebra", teacher: "Alisher Ergashev", room: "302" },
    { id: "s2", lessonNumber: 2, time: "08:50 - 09:35", breakAfter: "10 min", subject: "Ona tili", teacher: "Dilnoza Olimova", room: "205" },
    { id: "s3", lessonNumber: 3, time: "09:45 - 10:30", breakAfter: "15 min (Katta tanaffus)", subject: "Fizika", teacher: "Nargiza Rahimova", room: "304" },
    { id: "s4", lessonNumber: 4, time: "10:45 - 11:30", breakAfter: "5 min", subject: "Informatika", teacher: "Jasur Alimov", room: "204" },
    { id: "s5", lessonNumber: 5, time: "11:35 - 12:20", breakAfter: "5 min", subject: "Ingliz tili", teacher: "Madina Qosimova", room: "108" },
    { id: "s6", lessonNumber: 6, time: "12:25 - 13:10", breakAfter: "Tugadi", subject: "Tarix", teacher: "Farhod Jo'rayev", room: "210" },
  ],
  "10-B": [
    { id: "s7", lessonNumber: 1, time: "08:00 - 08:45", breakAfter: "5 min", subject: "Geometriya", teacher: "Alisher Ergashev", room: "302" },
    { id: "s8", lessonNumber: 2, time: "08:50 - 09:35", breakAfter: "10 min", subject: "Kimyo", teacher: "Saodat Yusupova", room: "305" },
    { id: "s9", lessonNumber: 3, time: "09:45 - 10:30", breakAfter: "15 min", subject: "Biologiya", teacher: "Zulfiya Karimova", room: "207" },
    { id: "s10", lessonNumber: 4, time: "10:45 - 11:30", breakAfter: "5 min", subject: "Adabiyot", teacher: "Dilnoza Olimova", room: "205" },
    { id: "s11", lessonNumber: 5, time: "11:35 - 12:20", breakAfter: "5 min", subject: "Jismoniy tarbiya", teacher: "Sardor Berdiyev", room: "Sport zal" },
  ],
  "11-A": [
    { id: "s12", lessonNumber: 1, time: "08:00 - 08:45", breakAfter: "5 min", subject: "Fizika", teacher: "Nargiza Rahimova", room: "304" },
    { id: "s13", lessonNumber: 2, time: "08:50 - 09:35", breakAfter: "10 min", subject: "Matematika", teacher: "Alisher Ergashev", room: "302" },
    { id: "s14", lessonNumber: 3, time: "09:45 - 10:30", breakAfter: "15 min", subject: "Ingliz tili", teacher: "Madina Qosimova", room: "108" },
    { id: "s15", lessonNumber: 4, time: "10:45 - 11:30", breakAfter: "5 min", subject: "Huquq asoslari", teacher: "Farhod Jo'rayev", room: "210" },
    { id: "s16", lessonNumber: 5, time: "11:35 - 12:20", breakAfter: "5 min", subject: "Dasturlash (IT)", teacher: "Jasur Alimov", room: "204" },
  ],
  "6-B": [
    { id: "s17", lessonNumber: 1, time: "13:15 - 14:00", breakAfter: "5 min", subject: "Matematika", teacher: "Oygul Sobirova", room: "102" },
    { id: "s18", lessonNumber: 2, time: "14:05 - 14:50", breakAfter: "10 min", subject: "Ona tili", teacher: "Gulbahor Mamatova", room: "104" },
    { id: "s19", lessonNumber: 3, time: "15:00 - 15:45", breakAfter: "15 min", subject: "Botanika (Biologiya)", teacher: "Zulfiya Karimova", room: "207" },
    { id: "s20", lessonNumber: 4, time: "16:00 - 16:45", breakAfter: "5 min", subject: "Ingliz tili", teacher: "Sevara Usmonova", room: "109" },
  ],
};

// ----------------------------------------------------------------------------
// O'QUVCHILAR TOP-10 REYTINGI (FAOLIYAT VA YUTUQLAR MEZONI)
// ----------------------------------------------------------------------------
export const TOP_STUDENTS: StudentRankItem[] = [
  { rank: 1, name: "Azizbek Karimov", grade: "10-A", score: 985, badge: "Oltin nishon", category: "Olimpiada chempioni", quarter: "1-chorak" },
  { rank: 2, name: "Madina Yo'ldosheva", grade: "11-B", score: 968, badge: "Oltin nishon", category: "IELTS 7.5 & Maqolalar", quarter: "1-chorak" },
  { rank: 3, name: "Shohruh Rustamov", grade: "9-A", score: 952, badge: "Kumush nishon", category: "IT & Robototexnika", quarter: "1-chorak" },
  { rank: 4, name: "Zilola Mahmudova", grade: "10-A", score: 940, badge: "Kumush nishon", category: "Matematika & Fizika", quarter: "1-chorak" },
  { rank: 5, name: "Jasur Bekmurodov", grade: "8-V", score: 928, badge: "Bronza nishon", category: "Shaxmat chempioni", quarter: "1-chorak" },
  { rank: 6, name: "Dildora Xoliqova", grade: "11-A", score: 915, badge: "Bronza nishon", category: "Adabiyot va Ijod", quarter: "1-chorak" },
  { rank: 7, name: "Sardor Umrzoqov", grade: "9-B", score: 902, badge: "Faol yetakchi", category: "Zakovat sardori", quarter: "1-chorak" },
  { rank: 8, name: "Kamola Saidova", grade: "7-A", score: 890, badge: "Faol kitobxon", category: "Kitobxonlik tanlovi", quarter: "1-chorak" },
  { rank: 9, name: "Bobur Normatov", grade: "10-B", score: 878, badge: "Sport ustasi", category: "Voleybol sardori", quarter: "1-chorak" },
  { rank: 10, name: "Malika Ismoilova", grade: "8-A", score: 865, badge: "Ijodkor qiz", category: "Rasm va Tasviriy san'at", quarter: "1-chorak" },
];

export const TOP_CLASSES: ClassRankItem[] = [
  { rank: 1, className: "10-\"A\" sinf", teacher: "Alisher Ergashev", activityScore: 98, achievementsCount: 14 },
  { rank: 2, className: "9-\"A\" sinf", teacher: "Dilnoza Olimova", activityScore: 95, achievementsCount: 11 },
  { rank: 3, className: "11-\"B\" sinf", teacher: "Madina Qosimova", activityScore: 92, achievementsCount: 9 },
  { rank: 4, className: "8-\"V\" sinf", teacher: "Nargiza Rahimova", activityScore: 89, achievementsCount: 7 },
];

// ----------------------------------------------------------------------------
// ELEKTRON KUTUBXONA (GOOGLE DRIVE PDF HAVOLALARI BILAN)
// ----------------------------------------------------------------------------
export const LIBRARY_BOOKS: LibraryBook[] = [
  {
    id: "b1",
    title: "Algebra va analiz asoslari",
    subject: "Matematika",
    grade: 10,
    author: "Sh.A. Alimov, O.R. Xolmuhamedov",
    year: 2024,
    fileSize: "14.2 MB",
    format: "PDF",
    pages: 288,
    color: "from-blue-600 to-indigo-800",
    driveUrl: "https://drive.google.com/file/d/1example_algebra_10/view?usp=sharing",
    description: "10-sinf uchun davlat ta'lim standarti asosida tasdiqlangan asosiy darslik va amaliy mashqlar to'plami.",
  },
  {
    id: "b2",
    title: "Fizika (Kvant fizikasi va Optika)",
    subject: "Fizika",
    grade: 11,
    author: "P.Q. Habibullayev, A. Boydedayev",
    year: 2024,
    fileSize: "18.5 MB",
    format: "PDF",
    pages: 320,
    color: "from-amber-600 to-orange-800",
    driveUrl: "https://drive.google.com/file/d/1example_physics_11/view?usp=sharing",
    description: "11-sinf o'quvchilari uchun elektromagnit to'lqinlar, optika va atom yadrosi fizikasi bo'yicha to'liq qo'llanma.",
  },
  {
    id: "b3",
    title: "Informatika va Axborot Texnologiyalari",
    subject: "Informatika",
    grade: 9,
    author: "B. Boltayev, A. Azamatov",
    year: 2025,
    fileSize: "12.8 MB",
    format: "PDF",
    pages: 240,
    color: "from-emerald-600 to-teal-800",
    driveUrl: "https://drive.google.com/file/d/1example_informatics_9/view?usp=sharing",
    description: "Python dasturlash tili asoslari, algoritmik modellar va kiberxavfsizlik darslari.",
  },
  {
    id: "b4",
    title: "Ona tili va Adabiyot",
    subject: "Ona tili",
    grade: 9,
    author: "N. Mahmudov, A. Nurmonov",
    year: 2023,
    fileSize: "16.1 MB",
    format: "PDF",
    pages: 272,
    color: "from-rose-600 to-pink-800",
    driveUrl: "https://drive.google.com/file/d/1example_uzbek_9/view?usp=sharing",
    description: "Sintaksis, murakkab gap tahlili va o'zbek adabiyoti durdonalaridan namunalar.",
  },
  {
    id: "b5",
    title: "English: Guess What! Pupil's Book",
    subject: "Ingliz tili",
    grade: 7,
    author: "Cambridge University Press & UzEdu",
    year: 2024,
    fileSize: "22.4 MB",
    format: "PDF",
    pages: 180,
    color: "from-purple-600 to-indigo-800",
    driveUrl: "https://drive.google.com/file/d/1example_english_7/view?usp=sharing",
    description: "Interaktiv topshiriqlar, audio dialoglar va zamonaviy ingliz tili leksikasi.",
  },
  {
    id: "b6",
    title: "Kimyo (Organik kimyo asoslari)",
    subject: "Kimyo",
    grade: 10,
    author: "I.R. Asqarov, N.X. To'xtaboyev",
    year: 2024,
    fileSize: "15.0 MB",
    format: "PDF",
    pages: 256,
    color: "from-cyan-600 to-blue-800",
    driveUrl: "https://drive.google.com/file/d/1example_chemistry_10/view?usp=sharing",
    description: "Uglevodorodlar, reaksiyalar mexanizmi va laboratoriya sinovlari.",
  },
];
