/**
 * ============================================================================
 * PASTDARG'OM TUMANI 65-SONLI UMUMTA'LIM MAKTABI — SCRIPT.JS
 * To'liq interaktiv dastur kodi:
 * 1. Mobil menyu (Burger)
 * 2. 65-MaktabAI Multimodal (Matn, Vision tahlili & Rasm generatsiyasi)
 * 3. O'quvchilar Jamoaviy Chati (Telegram uslubida)
 * 4. To'garaklar ro'yxati va a'zo bo'lish
 * 5. Yangiliklar va Maqolalar o'qish modali
 * 6. Dars jadvali (1- va 2-smena qo'ng'iroqlari va sinf filtri)
 * 7. TOP-10 Reyting (O'quvchilar va Sinflar)
 * 8. Elektron Kutubxona (Google Drive PDF)
 * 9. Aloqa formasi va Telegram bot integratsiyasi
 * 10. Manba kodlarini ko'rish va yuklab olish
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initClubsSection();
  initNewsSection();
  initScheduleSection();
  initRatingSection();
  initTeachersSection();
  initLibrarySection();
  initContactForm();
  initCommunityChat();
  init65MaktabAI();
  initCodeExportModal();
});

// ----------------------------------------------------------------------------
// DATASETS
// ----------------------------------------------------------------------------
const CLUBS_DATA = [
  {
    id: "it-coding",
    title: "IT va Dasturlash (Web & Python)",
    category: "Axborot Texnologiyalari",
    teacher: "Jasur Alimov",
    teacherRole: "Informatika va IT o'qituvchisi",
    teacherPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    schedule: "Seshanba, Payshanba | 15:00 - 16:30",
    room: "204-kompyuter sinfi",
    targetGrades: "7 - 11 sinflar",
    desc: "Veb-saytlar yaratish (HTML, CSS, JS), Python tilida dasturlash va sun'iy intellekt asoslari.",
    badge: "Eng ommabop"
  },
  {
    id: "english-speaking",
    title: "English Speaking & IELTS Club",
    category: "Chet tillari",
    teacher: "Madina Qosimova",
    teacherRole: "Oliy toifali o'qituvchi (IELTS 8.5)",
    teacherPhoto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    schedule: "Dushanba, Chorshanba, Juma | 14:00 - 15:30",
    room: "108-til xonasi",
    targetGrades: "5 - 11 sinflar",
    desc: "Og'zaki so'zlashuv, grammatika, xalqaro CEFR va IELTS imtihonlariga tizimli tayyorgarlik.",
    badge: "Sertifikat"
  },
  {
    id: "chess-logic",
    title: "Shaxmat va Mantiqiy Tafakkur",
    category: "Aqliy Sport",
    teacher: "Rustam Nurmatov",
    teacherRole: "Sport ustasi, shaxmat murabbiyi",
    teacherPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    schedule: "Shanba | 10:00 - 12:30",
    room: "Sport klub zali",
    targetGrades: "1 - 11 sinflar",
    desc: "Debyutlar, taktik yurishlar, kombinatsiyalar va tuman-viloyat chempionatlariga tayyorgarlik.",
    badge: "Turnir"
  },
  {
    id: "robotics-stem",
    title: "Robototexnika va Sun'iy Intellekt",
    category: "Muhandislik & STEM",
    teacher: "Bobur Mirzayev",
    teacherRole: "Fizika va robototexnika mutaxassisi",
    teacherPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    schedule: "Chorshanba, Shanba | 15:30 - 17:00",
    room: "STEM laboratoriyasi",
    targetGrades: "6 - 10 sinflar",
    desc: "Arduino mikrokontrollerlari, datchiklar, mexanika va avtonom robotlarni yig'ish.",
    badge: "Yangi loyiha"
  },
  {
    id: "young-chemists",
    title: "Yosh Kimyogarlar va Biologlar",
    category: "Tabiiy Fanlar",
    teacher: "Nargiza Rahimova",
    teacherRole: "Biologiya va Kimyo fanlari ustozi",
    teacherPhoto: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
    schedule: "Payshanba | 14:30 - 16:00",
    room: "305-kimyo laboratoriyasi",
    targetGrades: "7 - 11 sinflar",
    desc: "Qiziqarli laboratoriya tajribalari, moddalar reaksiyasi va fan olimpiadalariga tayyorgarlik.",
    badge: "Laboratoriya"
  },
  {
    id: "sports-volleyball",
    title: "Voleybol va Futbol To'garagi",
    category: "Sport va Salomatlik",
    teacher: "Sardor Berdiyev",
    teacherRole: "Jismoniy tarbiya o'qituvchisi",
    teacherPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    schedule: "Seshanba, Juma | 16:00 - 17:30",
    room: "Maktab yopiq sport zali",
    targetGrades: "5 - 11 sinflar",
    desc: "Jamoaviy o'yinlar, jismoniy chidamlilik va maktablararo 'Umid nihollari' musobaqalari.",
    badge: "Sog'lom hayot"
  }
];

const NEWS_DATA = [
  {
    id: "news-olympiad-win",
    title: "65-sonli maktab o'quvchilari Fan olimpiadasida viloyatda 1-o'rinni egallashdi!",
    category: "Yutuqlarimiz",
    date: "12-Oktyabr, 2026",
    author: "Direktor o'rinbosari",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    excerpt: "Pastdarg'om tumani sharafini himoya qilgan o'quvchilarimiz Matematika va Informatika fanlaridan tengsiz deb topildi.",
    content: "Samarqand viloyati bo'yicha o'tkazilgan umumta'lim maktablari o'quvchilari o'rtasidagi asosiy fan olimpiadasining viloyat bosqichida maktabimizning 10- va 11-sinf o'quvchilari faxrli 1-o'rinni qo'lga kiritishdi. O'quvchilarimizga tuman hokimligi va xalq ta'limi bo'limi tomonidan qimmatbaho esdalik sovg'alari topshirildi. Endilikda ular Respublika bosqichida viloyat sharafini himoya qilishadi."
  },
  {
    id: "news-it-hall",
    title: "Maktabimizda zamonaviy IT-laboratoriya va elektron media zali ochildi",
    category: "Maktab hayoti",
    date: "08-Oktyabr, 2026",
    author: "IT koordinatori",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    excerpt: "Eng so'nggi rusumdagi kompyuterlar va yuqori tezlikdagi internet bilan jihozlangan yangi IT-xona o'quvchilar ixtiyoriga berildi.",
    content: "O'quvchilarimizga zamonaviy raqamli ko'nikmalarni egallashlari uchun barcha qulayliklar yaratilmoqda. Yangi ochilgan IT-markazda dasturlash to'garaklari, grafik dizayn va sun'iy intellekt asoslari o'rgatiladi. Har bir o'quvchi xalqaro IT-sertifikatlar olish imkoniyatiga ega bo'ladi."
  },
  {
    id: "news-zakovat",
    title: "\"Zakovat\" intellektual bellashuvida 9-\"A\" sinf jamoasi chempion bo'ldi",
    category: "Tadbirlar",
    date: "02-Oktyabr, 2026",
    author: "Yoshlar yetakchisi",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    excerpt: "Maktab ma'naviyat oyligi doirasida o'tkazilgan bilimlar bellashuvida qizg'in bahslar bo'lib o'tdi.",
    content: "O'quvchilarning mantiqiy fikrlash doirasini kengaytirish, kitobxonlikka qiziqishini oshirish maqsadida an'anaviy Zakovat turniri tashkil etildi. Final bosqichida 9-\"A\" sinf jamoasi barcha raqiblarini ortda qoldirib, Maktab Kubogini qo'lga kiritdi."
  }
];

const BELL_SCHEDULE_1 = [
  { lesson: 1, start: "08:00", end: "08:45", breakMin: "5 min tanaffus" },
  { lesson: 2, start: "08:50", end: "09:35", breakMin: "10 min tanaffus" },
  { lesson: 3, start: "09:45", end: "10:30", breakMin: "15 min (Katta tanaffus)" },
  { lesson: 4, start: "10:45", end: "11:30", breakMin: "5 min tanaffus" },
  { lesson: 5, start: "11:35", end: "12:20", breakMin: "5 min tanaffus" },
  { lesson: 6, start: "12:25", end: "13:10", breakMin: "Smena tugadi" },
];

const BELL_SCHEDULE_2 = [
  { lesson: 1, start: "13:15", end: "14:00", breakMin: "5 min tanaffus" },
  { lesson: 2, start: "14:05", end: "14:50", breakMin: "10 min tanaffus" },
  { lesson: 3, start: "15:00", end: "15:45", breakMin: "15 min (Katta tanaffus)" },
  { lesson: 4, start: "16:00", end: "16:45", breakMin: "5 min tanaffus" },
  { lesson: 5, start: "16:50", end: "17:35", breakMin: "To'garaklar vaqti" },
];

const SCHEDULE_DATA = {
  "9-A": [
    { num: 1, time: "08:00 - 08:45", subject: "Algebra", teacher: "Alisher Ergashev", room: "302", breakAfter: "5 min" },
    { num: 2, time: "08:50 - 09:35", subject: "Ona tili", teacher: "Dilnoza Olimova", room: "205", breakAfter: "10 min" },
    { num: 3, time: "09:45 - 10:30", subject: "Fizika", teacher: "Nargiza Rahimova", room: "304", breakAfter: "15 min (Katta)" },
    { num: 4, time: "10:45 - 11:30", subject: "Informatika (IT)", teacher: "Jasur Alimov", room: "204", breakAfter: "5 min" },
    { num: 5, time: "11:35 - 12:20", subject: "Ingliz tili", teacher: "Madina Qosimova", room: "108", breakAfter: "5 min" },
    { num: 6, time: "12:25 - 13:10", subject: "O'zbekiston tarixi", teacher: "Farhod Jo'rayev", room: "210", breakAfter: "Tugadi" }
  ],
  "10-B": [
    { num: 1, time: "08:00 - 08:45", subject: "Geometriya", teacher: "Alisher Ergashev", room: "302", breakAfter: "5 min" },
    { num: 2, time: "08:50 - 09:35", subject: "Kimyo", teacher: "Nargiza Rahimova", room: "305", breakAfter: "10 min" },
    { num: 3, time: "09:45 - 10:30", subject: "Biologiya", teacher: "Zulfiya Karimova", room: "207", breakAfter: "15 min" },
    { num: 4, time: "10:45 - 11:30", subject: "Adabiyot", teacher: "Dilnoza Olimova", room: "205", breakAfter: "5 min" },
    { num: 5, time: "11:35 - 12:20", subject: "Jismoniy tarbiya", teacher: "Sardor Berdiyev", room: "Sport zal", breakAfter: "Tugadi" }
  ],
  "11-A": [
    { num: 1, time: "08:00 - 08:45", subject: "Fizika (Kvant)", teacher: "Nargiza Rahimova", room: "304", breakAfter: "5 min" },
    { num: 2, time: "08:50 - 09:35", subject: "Matematika", teacher: "Alisher Ergashev", room: "302", breakAfter: "10 min" },
    { num: 3, time: "09:45 - 10:30", subject: "Ingliz tili (IELTS)", teacher: "Madina Qosimova", room: "108", breakAfter: "15 min" },
    { num: 4, time: "10:45 - 11:30", subject: "Huquq asoslari", teacher: "Farhod Jo'rayev", room: "210", breakAfter: "5 min" },
    { num: 5, time: "11:35 - 12:20", subject: "Dasturlash (Python)", teacher: "Jasur Alimov", room: "204", breakAfter: "Tugadi" }
  ],
  "6-B": [
    { num: 1, time: "13:15 - 14:00", subject: "Matematika", teacher: "Oygul Sobirova", room: "102", breakAfter: "5 min" },
    { num: 2, time: "14:05 - 14:50", subject: "Ona tili", teacher: "Gulbahor Mamatova", room: "104", breakAfter: "10 min" },
    { num: 3, time: "15:00 - 15:45", subject: "Botanika", teacher: "Zulfiya Karimova", room: "207", breakAfter: "15 min" },
    { num: 4, time: "16:00 - 16:45", subject: "Ingliz tili", teacher: "Sevara Usmonova", room: "109", breakAfter: "Tugadi" }
  ]
};

const TOP_STUDENTS_DATA = [
  { rank: 1, name: "Azizbek Karimov", grade: "10-A", score: 985, badge: "Oltin nishon", achievement: "Olimpiada chempioni" },
  { rank: 2, name: "Madina Yo'ldosheva", grade: "11-B", score: 968, badge: "Oltin nishon", achievement: "IELTS 7.5 & Maqolalar" },
  { rank: 3, name: "Shohruh Rustamov", grade: "9-A", score: 952, badge: "Kumush nishon", achievement: "IT & Robototexnika" },
  { rank: 4, name: "Zilola Mahmudova", grade: "10-A", score: 940, badge: "Kumush nishon", achievement: "Matematika & Fizika" },
  { rank: 5, name: "Jasur Bekmurodov", grade: "8-V", score: 928, badge: "Bronza nishon", achievement: "Shaxmat chempioni" },
  { rank: 6, name: "Dildora Xoliqova", grade: "11-A", score: 915, badge: "Bronza nishon", achievement: "Adabiyot va Ijod" },
  { rank: 7, name: "Sardor Umrzoqov", grade: "9-B", score: 902, badge: "Faol yetakchi", achievement: "Zakovat sardori" },
  { rank: 8, name: "Kamola Saidova", grade: "7-A", score: 890, badge: "Faol kitobxon", achievement: "Kitobxonlik tanlovi" },
  { rank: 9, name: "Bobur Normatov", grade: "10-B", score: 878, badge: "Sport ustasi", achievement: "Voleybol sardori" },
  { rank: 10, name: "Malika Ismoilova", grade: "8-A", score: 865, badge: "Ijodkor qiz", achievement: "Tasviriy san'at" }
];

const TOP_CLASSES_DATA = [
  { rank: 1, name: "10-\"A\" sinf", teacher: "Alisher Ergashev", score: 98, note: "14 ta tuman va viloyat yutug'i" },
  { rank: 2, name: "9-\"A\" sinf", teacher: "Dilnoza Olimova", score: 95, note: "11 ta Zakovat va IT loyihasi" },
  { rank: 3, name: "11-\"B\" sinf", teacher: "Madina Qosimova", score: 92, note: "9 ta IELTS va fan sertifikati" },
  { rank: 4, name: "8-\"V\" sinf", teacher: "Nargiza Rahimova", score: 89, note: "Sport va shaxmat musobaqalari" }
];

const TEACHERS_DATA = [
  {
    name: "Alisher Ergashev",
    subject: "Matematika va Algebra",
    rank: "Oliy toifali o'qituvchi",
    experience: 18,
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    achievements: "Xalq ta'limi a'lochisi, viloyat fan olimpiadasi koordinatori"
  },
  {
    name: "Dilnoza Olimova",
    subject: "Ona tili va Adabiyot",
    rank: "Oliy toifali o'qituvchi",
    experience: 15,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    achievements: "'Yilning eng yaxshi fan o'qituvchisi' ko'rik tanlovi laureati"
  },
  {
    name: "Jasur Alimov",
    subject: "Informatika va IT",
    rank: "1-toifali mutaxassis",
    experience: 8,
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    achievements: "IT-Park rasmiy mentori, Web va Python to'garagi rahbari"
  },
  {
    name: "Nargiza Rahimova",
    subject: "Fizika va Kimyo",
    rank: "Oliy toifali o'qituvchi",
    experience: 20,
    photo: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80",
    achievements: "STEAM ta'limi bo'yicha xalqaro metodist sertifikati egasi"
  },
  {
    name: "Farhod Jo'rayev",
    subject: "O'zbekiston va Jahon Tarixi",
    rank: "1-toifali o'qituvchi",
    experience: 12,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    achievements: "Tarix fani bo'yicha tuman metodik kengashi a'zosi"
  },
  {
    name: "Madina Qosimova",
    subject: "Ingliz tili (Chet tili)",
    rank: "Oliy toifali o'qituvchi",
    experience: 10,
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80",
    achievements: "IELTS 8.5 sohibi, xalqaro speaking club rahbari"
  }
];

const BOOKS_DATA = [
  {
    id: "b1",
    title: "Algebra va analiz asoslari",
    subject: "Matematika",
    grade: 10,
    author: "Sh.A. Alimov, O.R. Xolmuhamedov",
    size: "14.2 MB",
    driveUrl: "https://drive.google.com/file/d/1algebra10/view?usp=sharing",
    desc: "10-sinf uchun davlat ta'lim standarti asosida tasdiqlangan darslik va amaliy misollar to'plami."
  },
  {
    id: "b2",
    title: "Fizika (Kvant fizikasi va Optika)",
    subject: "Fizika",
    grade: 11,
    author: "P.Q. Habibullayev, A. Boydedayev",
    size: "18.5 MB",
    driveUrl: "https://drive.google.com/file/d/1physics11/view?usp=sharing",
    desc: "11-sinf o'quvchilari uchun elektromagnit to'lqinlar, optika va atom yadrosi fizikasi."
  },
  {
    id: "b3",
    title: "Informatika va Axborot Texnologiyalari",
    subject: "Informatika",
    grade: 9,
    author: "B. Boltayev, A. Azamatov",
    size: "12.8 MB",
    driveUrl: "https://drive.google.com/file/d/1informatics9/view?usp=sharing",
    desc: "Python dasturlash tili asoslari, algoritmik modellar va kiberxavfsizlik darslari."
  },
  {
    id: "b4",
    title: "Ona tili va Adabiyot",
    subject: "Ona tili",
    grade: 9,
    author: "N. Mahmudov, A. Nurmonov",
    size: "16.1 MB",
    driveUrl: "https://drive.google.com/file/d/1uzbek9/view?usp=sharing",
    desc: "Sintaksis, murakkab gap tahlili va mumtoz o'zbek adabiyoti durdonalaridan namunalar."
  },
  {
    id: "b5",
    title: "English: Guess What! Pupil's Book",
    subject: "Ingliz tili",
    grade: 7,
    author: "Cambridge University Press & UzEdu",
    size: "22.4 MB",
    driveUrl: "https://drive.google.com/file/d/1english7/view?usp=sharing",
    desc: "Interaktiv mashqlar, audio dialoglar va zamonaviy xalqaro ingliz tili leksikasi."
  },
  {
    id: "b6",
    title: "Kimyo (Organik kimyo asoslari)",
    subject: "Kimyo",
    grade: 10,
    author: "I.R. Asqarov, N.X. To'xtaboyev",
    size: "15.0 MB",
    driveUrl: "https://drive.google.com/file/d/1chemistry10/view?usp=sharing",
    desc: "Uglevodorodlar, reaksiyalar mexanizmi va amaliy laboratoriya sinovlari."
  }
];

// ----------------------------------------------------------------------------
// 1. MOBILE MENU
// ----------------------------------------------------------------------------
function initMobileMenu() {
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!burgerBtn || !mobileMenu) return;

  burgerBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) {
      mobileMenu.classList.remove('open');
      burgerBtn.classList.remove('active');
      burgerBtn.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.add('open');
      burgerBtn.classList.add('active');
      burgerBtn.setAttribute('aria-expanded', 'true');
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      burgerBtn.classList.remove('active');
      burgerBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ----------------------------------------------------------------------------
// 2. TO'GARAKLAR (CLUBS) SECTION
// ----------------------------------------------------------------------------
function initClubsSection() {
  const container = document.getElementById('clubsGrid');
  if (!container) return;

  container.innerHTML = CLUBS_DATA.map(club => `
    <div class="club-card">
      <div class="club-card-header">
        <span class="club-badge">${club.badge}</span>
        <div class="club-category">${club.category}</div>
        <h3 class="club-title">${club.title}</h3>
      </div>
      <div class="club-card-body">
        <div class="club-teacher-row">
          <img src="${club.teacherPhoto}" alt="${club.teacher}" class="club-teacher-img">
          <div>
            <div class="club-teacher-name">${club.teacher}</div>
            <div class="club-teacher-role">${club.teacherRole}</div>
          </div>
        </div>
        <ul class="club-meta-list">
          <li class="club-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span><strong>Vaqti:</strong> ${club.schedule}</span>
          </li>
          <li class="club-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span><strong>Xona:</strong> ${club.room}</span>
          </li>
          <li class="club-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            <span><strong>Sinflar:</strong> ${club.targetGrades}</span>
          </li>
        </ul>
        <p class="club-desc">${club.desc}</p>
        <button class="btn btn-outline-gold btn-block club-join-btn" data-club="${club.title}">
          <span>To'garakka A'zo Bo'lish</span>
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.club-join-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const clubTitle = btn.getAttribute('data-club');
      // Redirect to Telegram bot with text or prompt user
      const promptText = `Assalomu alaykum! Men "${clubTitle}" to'garagiga a'zo bo'lishni xohlayman.`;
      const botUrl = `http://t.me/pastdargom_65maktab_uzbot?text=${encodeURIComponent(promptText)}`;
      window.open(botUrl, '_blank');
    });
  });
}

// ----------------------------------------------------------------------------
// 3. YANGILIKLAR VA MAQOLALAR (NEWS) SECTION
// ----------------------------------------------------------------------------
function initNewsSection() {
  const container = document.getElementById('newsGrid');
  const modal = document.getElementById('articleModal');
  const closeBtn = document.getElementById('closeArticleModalBtn');

  if (!container || !modal) return;

  container.innerHTML = NEWS_DATA.map(news => `
    <article class="news-card">
      <div class="news-img-box">
        <img src="${news.image}" alt="${news.title}" class="news-img">
        <span class="news-badge">${news.category}</span>
      </div>
      <div class="news-body">
        <div class="news-meta">
          <span>📅 ${news.date}</span>
          <span>✍️ ${news.author}</span>
        </div>
        <h3 class="news-title">${news.title}</h3>
        <p class="news-excerpt">${news.excerpt}</p>
        <button class="news-read-btn" data-id="${news.id}">
          <span>Batafsil o'qish</span>
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  `).join('');

  container.querySelectorAll('.news-read-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = NEWS_DATA.find(n => n.id === id);
      if (!item) return;

      document.getElementById('artModalTitle').textContent = item.title;
      document.getElementById('artModalCategory').textContent = item.category;
      document.getElementById('artModalDate').textContent = item.date;
      document.getElementById('artModalAuthor').textContent = item.author;
      document.getElementById('artModalImg').src = item.image;
      document.getElementById('artModalContent').innerHTML = `
        <p style="font-weight:600; margin-bottom:14px; color:#1e293b;">${item.excerpt}</p>
        <p>${item.content}</p>
      `;

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

// ----------------------------------------------------------------------------
// 4. SCHEDULE SECTION (1- & 2-SMENA & TABLE)
// ----------------------------------------------------------------------------
function initScheduleSection() {
  const bellContainer = document.getElementById('bellScheduleBox');
  const classSelect = document.getElementById('classSelect');
  const tableBody = document.getElementById('scheduleBody');
  const shiftTabs = document.querySelectorAll('.shift-tab');

  if (!bellContainer || !classSelect || !tableBody) return;

  function renderBells(shiftNum) {
    const list = shiftNum === 1 ? BELL_SCHEDULE_1 : BELL_SCHEDULE_2;
    bellContainer.innerHTML = `
      <div style="font-size:13px; font-weight:700; color:#0b1b3d; margin-bottom:12px;">
        🔔 ${shiftNum}-Smena Qo'ng'iroqlar va Tanaffus Vaqtlari:
      </div>
      <div class="bell-grid">
        ${list.map(b => `
          <div class="bell-item">
            <div class="bell-num">${b.lesson}-soat</div>
            <div class="bell-time">${b.start} — ${b.end}</div>
            <div class="bell-break">${b.breakMin}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderSchedule(className) {
    const items = SCHEDULE_DATA[className] || [];
    tableBody.innerHTML = items.map(item => `
      <tr>
        <td style="font-weight:700; color:#64748b;">${item.num}-dars</td>
        <td style="font-weight:600;">${item.time}</td>
        <td class="subject-cell">${item.subject}</td>
        <td>${item.teacher}</td>
        <td><span class="room-badge">${item.room}-xona</span></td>
        <td style="color:#d97706; font-size:13px;">${item.breakAfter}</td>
      </tr>
    `).join('');
  }

  shiftTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      shiftTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const shiftNum = parseInt(tab.getAttribute('data-shift'), 10);
      renderBells(shiftNum);

      // Auto pick suitable class in that shift
      if (shiftNum === 1 && classSelect.value === '6-B') {
        classSelect.value = '9-A';
      } else if (shiftNum === 2 && classSelect.value !== '6-B') {
        classSelect.value = '6-B';
      }
      renderSchedule(classSelect.value);
    });
  });

  classSelect.addEventListener('change', () => {
    renderSchedule(classSelect.value);
  });

  // Initial
  renderBells(1);
  renderSchedule('9-A');
}

// ----------------------------------------------------------------------------
// 5. RATING SECTION (TOP-10)
// ----------------------------------------------------------------------------
function initRatingSection() {
  const container = document.getElementById('ratingContainer');
  const btnStudents = document.getElementById('tabStudentsBtn');
  const btnClasses = document.getElementById('tabClassesBtn');

  if (!container || !btnStudents || !btnClasses) return;

  function renderStudents() {
    btnStudents.classList.add('active');
    btnClasses.classList.remove('active');

    container.innerHTML = `
      <div class="rating-list">
        ${TOP_STUDENTS_DATA.map(st => `
          <div class="rating-item ${st.rank === 1 ? 'top-1' : st.rank === 2 ? 'top-2' : st.rank === 3 ? 'top-3' : ''}">
            <div class="rating-left">
              <div class="rank-circle ${st.rank > 3 ? 'other' : ''}">${st.rank}</div>
              <div>
                <div class="rank-name">${st.name}</div>
                <div class="rank-meta">${st.grade} sinf • ${st.achievement}</div>
              </div>
            </div>
            <div class="rating-right">
              <span class="rank-badge">${st.badge}</span>
              <span class="rank-score">${st.score} ball</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function renderClasses() {
    btnClasses.classList.add('active');
    btnStudents.classList.remove('active');

    container.innerHTML = `
      <div class="rating-list">
        ${TOP_CLASSES_DATA.map(c => `
          <div class="rating-item ${c.rank === 1 ? 'top-1' : ''}">
            <div class="rating-left">
              <div class="rank-circle ${c.rank > 3 ? 'other' : ''}">${c.rank}</div>
              <div>
                <div class="rank-name">${c.name}</div>
                <div class="rank-meta">Sinf rahbari: ${c.teacher}</div>
              </div>
            </div>
            <div class="rating-right">
              <span class="rank-badge">${c.note}</span>
              <span class="rank-score">${c.score}% faollik</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  btnStudents.addEventListener('click', renderStudents);
  btnClasses.addEventListener('click', renderClasses);

  renderStudents();
}

// ----------------------------------------------------------------------------
// 6. TEACHERS SECTION
// ----------------------------------------------------------------------------
function initTeachersSection() {
  const container = document.getElementById('teachersGrid');
  if (!container) return;

  container.innerHTML = TEACHERS_DATA.map(t => `
    <div class="teacher-card">
      <div class="teacher-photo-box">
        <img src="${t.photo}" alt="${t.name}" class="teacher-photo">
      </div>
      <div class="teacher-body">
        <h3 class="teacher-name">${t.name}</h3>
        <div class="teacher-subject">${t.subject}</div>
        <div class="teacher-exp">${t.rank} • ${t.experience} yillik tajriba</div>
        <div class="teacher-achieve">${t.achievements}</div>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------------------
// 7. LIBRARY SECTION (GOOGLE DRIVE PDF)
// ----------------------------------------------------------------------------
function initLibrarySection() {
  const container = document.getElementById('booksGrid');
  const searchInput = document.getElementById('bookSearchInput');
  const gradeFilters = document.querySelectorAll('.grade-chip');
  const modal = document.getElementById('bookModal');
  const closeBtn = document.getElementById('closeBookModalBtn');

  if (!container) return;

  let activeGrade = 'all';
  let searchTerm = '';

  function renderBooks() {
    const filtered = BOOKS_DATA.filter(b => {
      const matchGrade = activeGrade === 'all' || b.grade.toString() === activeGrade;
      const matchSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.subject.toLowerCase().includes(searchTerm.toLowerCase());
      return matchGrade && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #64748b;">
          Mos keladigan darslik topilmadi. Qidiruv so'zini o'zgartirib ko'ring.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(b => `
      <div class="book-card">
        <div class="book-header">
          <span class="book-grade-badge">${b.grade}-sinf</span>
          <span class="book-size">${b.size} (PDF)</span>
        </div>
        <h3 class="book-title">${b.title}</h3>
        <div class="book-author">${b.author}</div>
        <p class="book-desc">${b.desc}</p>
        <div class="book-actions">
          <button class="btn btn-outline-gold btn-sm open-book-btn" data-id="${b.id}">
            <span>O'qish</span>
          </button>
          <a href="${b.driveUrl}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">
            <span>PDF Yuklab olish</span>
          </a>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.open-book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const book = BOOKS_DATA.find(b => b.id === id);
        if (!book) return;

        document.getElementById('bookModalTitle').textContent = book.title;
        document.getElementById('bookModalSubject').textContent = book.subject;
        document.getElementById('bookModalAuthor').textContent = book.author;
        document.getElementById('bookModalGrade').textContent = book.grade;
        document.getElementById('bookModalSize').textContent = book.size;
        document.getElementById('bookModalDesc').textContent = book.desc;
        document.getElementById('bookModalDriveRead').href = book.driveUrl;
        document.getElementById('bookModalDriveDownload').href = book.driveUrl;

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
      });
    });
  }

  gradeFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      gradeFilters.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeGrade = chip.getAttribute('data-grade');
      renderBooks();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    searchTerm = e.target.value.trim();
    renderBooks();
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  renderBooks();
}

// ----------------------------------------------------------------------------
// 8. CONTACT FORM (TELEGRAM BOT REDIRECT)
// ----------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('senderName').value.trim();
    const phone = document.getElementById('senderPhone').value.trim();
    const role = document.getElementById('senderRole').value;
    const msg = document.getElementById('senderMessage').value.trim();

    if (!name || !phone || !msg) {
      alert("Iltimos, barcha majburiy maydonlarni to'ldiring.");
      return;
    }

    // Build telegram message
    const botText = `🏛 65-Maktab veb-saytidan yangi murojaat:\n\n👤 Ism: ${name}\n📞 Tel: ${phone}\n🏷 Mavqei: ${role}\n💬 Xabar:\n${msg}`;
    const botUrl = `http://t.me/pastdargom_65maktab_uzbot?text=${encodeURIComponent(botText)}`;

    // Show friendly confirmation & redirect
    alert("Murojaatingiz qabul qilindi! Endi rasmiy Telegram botimiz orqali tasdiqlash uchun botga yo'naltirilmoqdasiz.");
    window.open(botUrl, '_blank');
    form.reset();
  });
}

// ----------------------------------------------------------------------------
// 9. COMMUNITY CHAT (TELEGRAM-STYLE MODAL)
// ----------------------------------------------------------------------------
function initCommunityChat() {
  const openBtn = document.getElementById('openCommunityChatBtn');
  const mobileOpenBtn = document.getElementById('mobileCommunityBtn');
  const modal = document.getElementById('communityChatModal');
  const closeBtn = document.getElementById('closeCommunityModalBtn');
  const form = document.getElementById('communityForm');
  const listContainer = document.getElementById('communityMessagesList');
  const textInput = document.getElementById('communityText');
  const authorInput = document.getElementById('communityAuthor');
  const gradeInput = document.getElementById('communityGrade');

  if (!modal || !listContainer) return;

  let messages = [
    {
      id: "1",
      author: "Shohruh Rustamov",
      grade: "10-A",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      text: "Salom do'stlar! Ertaga 3-soatda Fizikadan laboratoriya ishi bor, optika formulalarini takrorlab olinglar!",
      time: "09:42",
      likes: 5
    },
    {
      id: "2",
      author: "Zilola Mahmudova",
      grade: "10-A",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      text: "Ha, darslikdagi 45-betdagi masalalarni '65-MaktabAI' yordamchisiga tekshirtirib oldim, juda oson ekan.",
      time: "09:45",
      likes: 8
    },
    {
      id: "3",
      author: "Azizbek Karimov",
      grade: "9-B",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      text: "IT to'garagida Web dasturlashni boshlayapmiz! Kim qiziqsa, Seshanba kuni soat 15:00 da 204-xonaga kelinglar.",
      time: "10:12",
      likes: 11
    }
  ];

  // Load from localStorage if present
  try {
    const saved = localStorage.getItem('school_community_messages');
    if (saved) {
      messages = JSON.parse(saved);
    }
  } catch (err) {}

  function renderMessages() {
    listContainer.innerHTML = messages.map(m => `
      <div class="comm-msg">
        <img src="${m.avatar}" alt="${m.author}" class="comm-avatar">
        <div class="comm-bubble">
          <div class="comm-header">
            <span class="comm-name">${m.author}</span>
            <span class="comm-grade">${m.grade} sinf</span>
            <span class="comm-time">${m.time}</span>
          </div>
          <p class="comm-text">${m.text}</p>
          <div class="comm-footer">
            <button class="like-btn" data-id="${m.id}">
              ❤️ <span>${m.likes}</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    listContainer.scrollTop = listContainer.scrollHeight;

    listContainer.querySelectorAll('.like-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const target = messages.find(m => m.id === id);
        if (target) {
          target.likes += 1;
          saveAndRender();
        }
      });
    });
  }

  function saveAndRender() {
    try {
      localStorage.setItem('school_community_messages', JSON.stringify(messages));
    } catch (e) {}
    renderMessages();
  }

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    renderMessages();
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  openBtn?.addEventListener('click', openModal);
  mobileOpenBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = textInput.value.trim();
    if (!text) return;

    const author = authorInput.value.trim() || "Iqtidorli O'quvchi";
    const grade = gradeInput.value || "10-A";
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

    messages.push({
      id: Date.now().toString(),
      author,
      grade,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      text,
      time: timeStr,
      likes: 0
    });

    textInput.value = '';
    saveAndRender();
  });
}

// ----------------------------------------------------------------------------
// 10. "65-MAKTABAI": MULTIMODAL (VISION) & IMAGE GENERATION ASSISTANT
// ----------------------------------------------------------------------------
function init65MaktabAI() {
  const fabBtn = document.getElementById('openAiModalBtn');
  const modal = document.getElementById('aiChatModal');
  const closeBtn = document.getElementById('closeAiModalBtn');
  const clearBtn = document.getElementById('clearAiChatBtn');
  const form = document.getElementById('aiChatForm');
  const textInput = document.getElementById('aiChatInput');
  const messagesBox = document.getElementById('aiChatMessages');
  const chips = document.querySelectorAll('.chip-btn');

  // Vision Image upload elements
  const attachBtn = document.getElementById('aiAttachBtn');
  const fileInput = document.getElementById('aiImageFileInput');
  const previewStrip = document.getElementById('attachedImagePreviewStrip');
  const thumbImg = document.getElementById('attachedImgThumb');
  const thumbName = document.getElementById('attachedImgName');
  const removeImgBtn = document.getElementById('removeAttachedImgBtn');
  const generateImgBtn = document.getElementById('aiGenerateImageBtn');

  if (!fabBtn || !modal || !form || !messagesBox) return;

  let attachedImageBase64 = null;
  let attachedImageMime = null;
  let chatHistory = [];

  function openAiModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    textInput.focus();
  }

  function closeAiModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  fabBtn.addEventListener('click', openAiModal);
  closeBtn?.addEventListener('click', closeAiModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAiModal();
  });

  clearBtn?.addEventListener('click', () => {
    chatHistory = [];
    messagesBox.innerHTML = `
      <div class="chat-bubble ai">
        <div class="bubble-content">
          <p><strong>Assalomu alaykum!</strong> Suhbat tozalandi. Men <strong>65-MaktabAI</strong> o'qituvchingizman. Qanday masala yoki dars bo'yicha yordam beray?</p>
        </div>
        <span class="bubble-time">Hozir</span>
      </div>
    `;
  });

  // Attach button triggers hidden file input
  attachBtn?.addEventListener('click', () => {
    fileInput?.click();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Iltimos, faqat rasm faylini tanlang (jpg, png, webp).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64Data = result.split(',')[1];
      attachedImageBase64 = base64Data;
      attachedImageMime = file.type;

      thumbImg.src = result;
      thumbName.textContent = file.name;
      previewStrip.style.display = 'block';
    };
    reader.readAsDataURL(file);
  });

  removeImgBtn?.addEventListener('click', () => {
    attachedImageBase64 = null;
    attachedImageMime = null;
    fileInput.value = '';
    previewStrip.style.display = 'none';
  });

  // Generate Image Shortcut button
  generateImgBtn?.addEventListener('click', () => {
    textInput.value = "Menga rasmini chizib ber: ";
    textInput.focus();
  });

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      textInput.value = prompt;
      form.dispatchEvent(new Event('submit'));
    });
  });

  function appendBubble(role, contentHtml, imageSrc = null) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let imgBlock = '';
    if (imageSrc) {
      imgBlock = `<img src="${imageSrc}" alt="Foydalanuvchi rasmi" class="chat-image-preview">`;
    }

    bubble.innerHTML = `
      <div class="bubble-content">
        ${imgBlock}
        ${contentHtml}
      </div>
      <span class="bubble-time">${timeStr}</span>
    `;

    messagesBox.appendChild(bubble);
    messagesBox.scrollTop = messagesBox.scrollHeight;
    return bubble;
  }

  // Handle Send
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = textInput.value.trim();

    if (!message && !attachedImageBase64) return;

    const currentImageBase64 = attachedImageBase64;
    const currentImageMime = attachedImageMime;
    const currentThumbSrc = thumbImg.src;

    // Clear input & preview
    textInput.value = '';
    attachedImageBase64 = null;
    attachedImageMime = null;
    fileInput.value = '';
    previewStrip.style.display = 'none';

    // Append user bubble
    appendBubble('user', `<p>${escapeHtml(message || "Masala / darslik rasmini tahlil qiling.")}</p>`, currentImageBase64 ? currentThumbSrc : null);

    // Check if it's an image generation request
    const isImageRequest = message.toLowerCase().startsWith('menga rasmini chizib ber:') || 
                           message.toLowerCase().includes('rasm chizib ber') || 
                           message.toLowerCase().startsWith('/image ');

    // Show AI thinking bubble
    const loadingBubble = appendBubble('ai', `<p><em>65-MaktabAI o'ylamoqda...</em></p>`);

    try {
      if (isImageRequest) {
        // Strip command
        const imagePrompt = message.replace(/^menga rasmini chizib ber:\s*/i, '')
                                   .replace(/^\/image\s*/i, '')
                                   .trim();

        const res = await fetch('/api/gemini/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: imagePrompt })
        });

        const data = await res.json();
        loadingBubble.remove();

        if (data.imageUrl) {
          appendBubble('ai', `
            <p>Mana siz so'ragan tasvir: <strong>"${escapeHtml(imagePrompt)}"</strong></p>
            <div class="ai-generated-image-card">
              <img src="${data.imageUrl}" alt="${escapeHtml(imagePrompt)}">
            </div>
            <p style="font-size:12px; color:#64748b; margin-top:6px;">65-MaktabAI tomonidan Imagen texnologiyasi asosida yaratildi.</p>
          `);
        } else {
          appendBubble('ai', `
            <p><strong>Rasm yaratish natijasi:</strong></p>
            <p>${escapeHtml(data.description || "Tasvir yaratish uchun to'liq tavsif tayyorlandi.")}</p>
          `);
        }
      } else {
        // Standard or Vision chat
        const reqBody = {
          message,
          history: chatHistory.slice(-8),
        };

        if (currentImageBase64) {
          reqBody.image = {
            data: currentImageBase64,
            mimeType: currentImageMime
          };
        }

        const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody)
        });

        const data = await res.json();
        loadingBubble.remove();

        if (data.reply) {
          // Format basic markdown like bold and lists
          const formatted = formatAiText(data.reply);
          appendBubble('ai', formatted);

          chatHistory.push({ role: 'user', text: message });
          chatHistory.push({ role: 'model', text: data.reply });
        } else {
          appendBubble('ai', `<p style="color:#ef4444;">${escapeHtml(data.error || "Javob olishda xatolik yuz berdi.")}</p>`);
        }
      }
    } catch (err) {
      loadingBubble.remove();
      // Graceful educational fallback
      appendBubble('ai', `
        <p><strong>65-MaktabAI javobi:</strong></p>
        <p>Salom! Savolingiz qabul qilindi. Pastdarg'om tumani 65-sonli maktabi bo'yicha to'garaklar, dars jadvali va olimpiada tayyorgarligi haqidagi barcha ma'lumotlar saytimiz bo'limlarida keltirilgan.</p>
        <p>Qo'shimcha darsliklar va savollar uchun Telegram botimizga ham murojaat qilishingiz mumkin: <a href="http://t.me/pastdargom_65maktab_uzbot" target="_blank" style="color:#2563eb; font-weight:700;">@pastdargom_65maktab_uzbot</a></p>
      `);
    }
  });

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  function formatAiText(text) {
    let html = escapeHtml(text);
    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    return `<p>${html}</p>`;
  }
}

// ----------------------------------------------------------------------------
// 11. CODE EXPORT MODAL (INDEX.HTML, STYLE.CSS, SCRIPT.JS, DECAP CMS)
// ----------------------------------------------------------------------------
function initCodeExportModal() {
  const modal = document.getElementById('codeExportModal');
  const openBtn = document.getElementById('footerCodeBtn');
  const closeBtn = document.getElementById('closeCodeModalBtn');
  const codeBox = document.getElementById('codeSnippetContent');
  const fileLabel = document.getElementById('codeFileNameDisplay');
  const copyBtn = document.getElementById('copyCodeBtn');
  const downloadBtn = document.getElementById('downloadCodeBtn');
  const tabs = document.querySelectorAll('.code-tab-btn');

  if (!modal || !openBtn || !codeBox) return;

  let currentTab = 'html';

  const FILES_CONTENT = {
    html: `<!-- 65-SONLI MAKTAB: INDEX.HTML TO'LIQ KODI -->\n` + (document.documentElement.outerHTML || ''),
    css: `/* 65-SONLI MAKTAB: STYLE.CSS TO'LIQ KODI */\n/* To'q ko'k va oltin ranglar tizimi */`,
    js: `/** 65-SONLI MAKTAB: SCRIPT.JS TO'LIQ KODI */\n/* Interaktiv mantiq va 65-MaktabAI */`,
    admin_html: `<!-- 65-SONLI MAKTAB: ADMIN/INDEX.HTML (DECAP CMS) -->\n<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="utf-8" />\n  <title>Admin Panel — Pastdarg'om tumani 65-sonli Umumta'lim Maktabi</title>\n  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>\n</head>\n<body>\n  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>\n</body>\n</html>`,
    admin_yml: `# 65-SONLI MAKTAB: ADMIN/CONFIG.YML (DECAP CMS)\nbackend:\n  name: git-gateway\n  branch: main\nlocal_backend: true\nmedia_folder: "public/uploads"\ncollections:\n  - name: "togaraklar"\n    label: "To'garaklar (Clubs)"\n  - name: "yangiliklar"\n    label: "Yangiliklar va Maqolalar"\n  - name: "kutubxona"\n    label: "Elektron Kutubxona (PDF)"\n  - name: "jadval"\n    label: "Dars Jadvali"\n  - name: "reyting"\n    label: "O'quvchilar Reytingi"`
  };

  // Fetch actual css & js if possible
  fetch('style.css').then(r => r.text()).then(t => { FILES_CONTENT.css = t; }).catch(() => {});
  fetch('script.js').then(r => r.text()).then(t => { FILES_CONTENT.js = t; }).catch(() => {});
  fetch('admin/config.yml').then(r => r.text()).then(t => { FILES_CONTENT.admin_yml = t; }).catch(() => {});

  function showTab(key) {
    currentTab = key;
    tabs.forEach(t => t.classList.remove('active'));
    document.querySelector(`[data-file="${key}"]`)?.classList.add('active');

    const names = {
      html: 'index.html (Sayt strukturasi va bo\'limlari)',
      css: 'style.css (Dizayn, ranglar va moslashuvchanlik)',
      js: 'script.js (Interaktiv funksiyalar va 65-MaktabAI)',
      admin_html: 'admin/index.html (Decap CMS boshqaruv interfeysi)',
      admin_yml: 'admin/config.yml (Bosh Ega va Admin huquqlari)'
    };

    fileLabel.textContent = names[key] || key;
    codeBox.textContent = FILES_CONTENT[key] || "Yuklanmoqda...";
  }

  tabs.forEach(t => {
    t.addEventListener('click', () => {
      showTab(t.getAttribute('data-file'));
    });
  });

  openBtn.addEventListener('click', () => {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    showTab('html');
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  copyBtn?.addEventListener('click', () => {
    const text = codeBox.textContent || '';
    navigator.clipboard.writeText(text).then(() => {
      const prev = copyBtn.textContent;
      copyBtn.textContent = "Nusxalandi! ✓";
      setTimeout(() => { copyBtn.textContent = prev; }, 2000);
    });
  });

  downloadBtn?.addEventListener('click', () => {
    const text = codeBox.textContent || '';
    const fileNames = {
      html: 'index.html',
      css: 'style.css',
      js: 'script.js',
      admin_html: 'admin_index.html',
      admin_yml: 'admin_config.yml'
    };
    const filename = fileNames[currentTab] || 'code.txt';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });
}
