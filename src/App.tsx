import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  Users, 
  GraduationCap, 
  Cpu, 
  Menu, 
  X, 
  Download, 
  Send, 
  Bot, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Code2, 
  Layers, 
  MessageSquare, 
  Image as ImageIcon, 
  Paperclip, 
  Heart,
  ChevronRight,
  ShieldAlert,
  Flame
} from 'lucide-react';

import { 
  SCHOOL_INFO, 
  SCHOOL_CLUBS, 
  SCHOOL_NEWS, 
  INITIAL_COMMUNITY_MESSAGES,
  TEACHERS_LIST, 
  SHIFTS, 
  BELL_SCHEDULE_SHIFT_1, 
  BELL_SCHEDULE_SHIFT_2, 
  CLASS_SCHEDULES, 
  TOP_STUDENTS, 
  TOP_CLASSES, 
  LIBRARY_BOOKS,
  Club,
  NewsArticle,
  CommunityMessage,
  LibraryBook
} from './data/schoolData.ts';

import { 
  STANDALONE_HTML, 
  STANDALONE_CSS, 
  STANDALONE_JS, 
  ADMIN_CONFIG_YML, 
  ADMIN_HTML 
} from './data/sourceCode.ts';

export default function App() {
  // Navigation & UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeShift, setActiveShift] = useState<1 | 2>(1);
  const [selectedClass, setSelectedClass] = useState<string>('9-A');
  const [ratingTab, setRatingTab] = useState<'students' | 'classes'>('students');

  // Library search and filter
  const [bookSearch, setBookSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [previewBook, setPreviewBook] = useState<LibraryBook | null>(null);

  // News article modal
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);

  // Code Export Modal
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'html' | 'css' | 'js' | 'admin_html' | 'admin_yml'>('html');
  const [copiedCode, setCopiedCode] = useState(false);

  // Community Chat Modal & Messages
  const [communityModalOpen, setCommunityModalOpen] = useState(false);
  const [communityMessages, setCommunityMessages] = useState<CommunityMessage[]>(() => {
    try {
      const saved = localStorage.getItem('school_community_messages');
      return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_MESSAGES;
    } catch {
      return INITIAL_COMMUNITY_MESSAGES;
    }
  });
  const [newCommunityText, setNewCommunityText] = useState('');
  const [communityAuthor, setCommunityAuthor] = useState('Iqtidorli O\'quvchi');
  const [communityGrade, setCommunityGrade] = useState('10-A');

  // 65-MaktabAI Chat State (Multimodal + Image Generation)
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{
    id: string;
    role: 'user' | 'model';
    text: string;
    imagePreview?: string;
    generatedImage?: string;
    time: string;
  }>>([
    {
      id: 'welcome',
      role: 'model',
      text: "Assalomu alaykum! Men Pastdarg'om tumani 65-sonli umumta'lim maktabining \"65-MaktabAI\" intellektual o'qituvchisiman.\n\n📚 Fanlar bo'yicha savollaringiz bormi? Masala yoki darslik rasmini biriktiring (Vision tahlili) yoki 'Menga rasmini chizib ber: ...' deb yozing!",
      time: 'Hozir'
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [attachedImageBase64, setAttachedImageBase64] = useState<string | null>(null);
  const [attachedImageMime, setAttachedImageMime] = useState<string | null>(null);
  const [attachedImagePreview, setAttachedImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aiChatEndRef = useRef<HTMLDivElement>(null);
  const communityChatEndRef = useRef<HTMLDivElement>(null);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRole, setContactRole] = useState('Ota-ona');
  const [contactMessage, setContactMessage] = useState('');

  // Auto scroll chat
  useEffect(() => {
    if (aiModalOpen) {
      aiChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, aiModalOpen]);

  useEffect(() => {
    if (communityModalOpen) {
      communityChatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [communityMessages, communityModalOpen]);

  // Filtered books
  const filteredBooks = useMemo(() => {
    return LIBRARY_BOOKS.filter(book => {
      const matchGrade = selectedGrade === 'all' || book.grade === selectedGrade;
      const matchSearch = book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
                          book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
                          book.subject.toLowerCase().includes(bookSearch.toLowerCase());
      return matchGrade && matchSearch;
    });
  }, [bookSearch, selectedGrade]);

  // Handle Image attachment for AI Vision
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Iltimos, faqat rasm faylini yuklang (JPG, PNG, WebP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAttachedImagePreview(result);
      const base64Data = result.split(',')[1];
      setAttachedImageBase64(base64Data);
      setAttachedImageMime(file.type);
    };
    reader.readAsDataURL(file);
  };

  const removeAttachedImage = () => {
    setAttachedImageBase64(null);
    setAttachedImageMime(null);
    setAttachedImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Send message to 65-MaktabAI
  const handleSendAiMessage = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = customPrompt || aiInput.trim();
    if (!promptToSend && !attachedImageBase64) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const currentImgBase64 = attachedImageBase64;
    const currentImgMime = attachedImageMime;
    const currentImgPreview = attachedImagePreview;

    // Reset inputs
    setAiInput('');
    removeAttachedImage();

    // Append user message
    const userMsgId = Date.now().toString();
    setAiMessages(prev => [
      ...prev,
      {
        id: userMsgId,
        role: 'user',
        text: promptToSend || "Iltimos, yuklangan masala rasmini tahlil qilib, to'liq yechimini ko'rsating.",
        imagePreview: currentImgPreview || undefined,
        time: timeStr
      }
    ]);

    setAiLoading(true);

    // Check if it's an image generation request
    const isImageRequest = promptToSend.toLowerCase().startsWith('menga rasmini chizib ber:') || 
                           promptToSend.toLowerCase().includes('rasm chizib ber') || 
                           promptToSend.toLowerCase().startsWith('/image ');

    try {
      if (isImageRequest) {
        const cleanPrompt = promptToSend.replace(/^menga rasmini chizib ber:\s*/i, '')
                                        .replace(/^\/image\s*/i, '')
                                        .trim();

        const res = await fetch('/api/gemini/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: cleanPrompt })
        });
        const data = await res.json();

        if (data.imageUrl) {
          setAiMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: `Mana siz so'ragan tasvir: **"${cleanPrompt}"**`,
              generatedImage: data.imageUrl,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setAiMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: data.description || "Rasm generatsiyasi yakunlandi.",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      } else {
        // Standard or Multimodal Vision request
        const historyPayload = aiMessages.slice(-6).map(m => ({
          role: m.role,
          text: m.text
        }));

        const reqBody: any = {
          message: promptToSend,
          history: historyPayload
        };

        if (currentImgBase64) {
          reqBody.image = {
            data: currentImgBase64,
            mimeType: currentImgMime
          };
        }

        const res = await fetch('/api/gemini/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(reqBody)
        });

        const data = await res.json();

        if (data.reply) {
          setAiMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: data.reply,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setAiMessages(prev => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: 'model',
              text: data.error || "65-MaktabAI bilan bog'lanishda xatolik yuz berdi.",
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      }
    } catch (err: any) {
      setAiMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: "Pastdarg'om tumani 65-sonli maktab serveriga ulanishda texnik uzilish. Iltimos, Telegram botimiz orqali ham bog'lanishingiz mumkin: @pastdargom_65maktab_uzbot",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Community Chat new message
  const handleSendCommunityMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommunityText.trim()) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: CommunityMessage = {
      id: Date.now().toString(),
      author: communityAuthor.trim() || "Iqtidorli O'quvchi",
      grade: communityGrade,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
      text: newCommunityText.trim(),
      time: timeStr,
      likes: 0
    };

    const updated = [...communityMessages, newMsg];
    setCommunityMessages(updated);
    try {
      localStorage.setItem('school_community_messages', JSON.stringify(updated));
    } catch {}
    setNewCommunityText('');
  };

  // Like community message
  const handleLikeCommunityMessage = (id: string) => {
    const updated = communityMessages.map(m => {
      if (m.id === id) {
        return { ...m, likes: m.likes + 1 };
      }
      return m;
    });
    setCommunityMessages(updated);
    try {
      localStorage.setItem('school_community_messages', JSON.stringify(updated));
    } catch {}
  };

  // Contact form submission -> Redirect to Telegram Bot
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || !contactMessage) {
      alert("Iltimos, barcha maydonlarni to'ldiring.");
      return;
    }

    const botMessage = `🏛 Pastdarg'om tumani 65-maktab saytidan murojaat:\n\n👤 Ism: ${contactName}\n📞 Tel: ${contactPhone}\n🏷 Mavqei: ${contactRole}\n💬 Xabar:\n${contactMessage}`;
    const botUrl = `${SCHOOL_INFO.telegramBotUrl}?text=${encodeURIComponent(botMessage)}`;

    alert("Murojaatingiz tayyorlandi! Rasmiy Telegram botimizga yo'naltirilmoqdasiz.");
    window.open(botUrl, '_blank');

    setContactName('');
    setContactPhone('');
    setContactMessage('');
  };

  // Copy code helper
  const handleCopyCode = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    });
  };

  // Download file helper
  const handleDownloadCode = (key: string) => {
    const fileNames: Record<string, string> = {
      html: 'index.html',
      css: 'style.css',
      js: 'script.js',
      admin_html: 'admin_index.html',
      admin_yml: 'admin_config.yml'
    };
    const contents: Record<string, string> = {
      html: STANDALONE_HTML,
      css: STANDALONE_CSS,
      js: STANDALONE_JS,
      admin_html: ADMIN_HTML,
      admin_yml: ADMIN_CONFIG_YML
    };

    const filename = fileNames[key] || 'school_code.txt';
    const content = contents[key] || '';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white">
      
      {/* --------------------------------------------------------------------- */}
      {/* TOP ANNOUNCEMENT BAR                                                  */}
      {/* --------------------------------------------------------------------- */}
      <aside className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Yangi o'quv choragi: To'garaklar va "65-MaktabAI" multimodal yordamchisi faol ishlamoqda!</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            {/* Exact display email with actual mailto */}
            <a 
              href={`mailto:${SCHOOL_INFO.actualEmail}`} 
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              title="Maktub yo'llash"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{SCHOOL_INFO.displayEmail}</span>
            </a>
            {/* Exact phone number */}
            <a 
              href={`tel:${SCHOOL_INFO.phoneRaw}`} 
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              title="Qo'ng'iroq qilish"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{SCHOOL_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </aside>

      {/* --------------------------------------------------------------------- */}
      {/* MAIN HEADER & NAVIGATION                                              */}
      {/* --------------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 bg-[#0b1b3d]/95 backdrop-blur-md border-b border-white/10 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-12 relative flex items-center justify-center">
              <svg viewBox="0 0 36 40" fill="none" className="w-full h-full drop-shadow">
                <path d="M18 2L3 8V19C3 28.5 9.5 35.8 18 38C26.5 35.8 33 28.5 33 19V8L18 2Z" fill="#0F2856" stroke="#F59E0B" strokeWidth="2"/>
                <path d="M18 9L22 17H14L18 9Z" fill="#F59E0B"/>
                <path d="M10 24C10 21 14 19 18 19C22 19 26 21 26 24V26H10V24Z" fill="#FFFFFF"/>
              </svg>
              <span className="absolute text-white font-extrabold text-sm pt-2">65</span>
            </div>
            <div>
              <div className="text-[10px] tracking-widest uppercase font-bold text-amber-400">Pastdarg'om tumani</div>
              <div className="text-base sm:text-lg font-extrabold leading-tight tracking-tight">65-sonli Umumta'lim Maktabi</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 font-semibold text-sm">
            <a href="#hero" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Bosh sahifa</a>
            <a href="#about" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Haqida</a>
            <a href="#clubs" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">To'garaklar</a>
            <a href="#news" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Yangiliklar</a>
            <a href="#schedule" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Dars jadvali</a>
            <a href="#rating" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Reyting</a>
            <a href="#library" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Kutubxona</a>
            <a href="#contact" className="px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors">Aloqa</a>
          </nav>

          {/* Actions: Community Chat, Admin, Code Viewer, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Community Chat Button */}
            <button
              onClick={() => setCommunityModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Jamoaviy Chat</span>
            </button>

            {/* Admin Decap CMS link */}
            <a 
              href="/admin/index.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all border border-white/10"
              title="Decap CMS boshqaruv paneli"
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Admin Panel</span>
            </a>

            {/* Code Viewer Modal Trigger */}
            <button
              onClick={() => setCodeModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white shadow-md transition-all"
              title="HTML, CSS, JS va Admin kodlari"
            >
              <Code2 className="w-4 h-4" />
              <span className="hidden md:inline">Kodlarni olish</span>
            </button>

            {/* Hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-2">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">Bosh sahifa</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">Maktab haqida</a>
            <a href="#clubs" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">To'garaklar ro'yxati</a>
            <a href="#news" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">Yangiliklar va Maqolalar</a>
            <a href="#schedule" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">Dars jadvali (1 & 2-smena)</a>
            <a href="#rating" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">O'quvchilar Reytingi</a>
            <a href="#library" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">Elektron Kutubxona (PDF)</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-slate-200 hover:bg-white/10">Aloqa va Joylashuv</a>
            <button
              onClick={() => { setMobileMenuOpen(false); setCommunityModalOpen(true); }}
              className="w-full text-left px-3 py-2 rounded-lg bg-amber-500/20 text-amber-400 font-bold"
            >
              💬 O'quvchilar Jamoaviy Chati
            </button>
          </div>
        )}
      </header>

      {/* --------------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                                       */}
      {/* --------------------------------------------------------------------- */}
      <section id="hero" className="relative bg-gradient-to-br from-[#071228] via-[#0b1b3d] to-[#152d5b] text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Pastdarg'om tumani namunali ta'lim maskani</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            Kelajak bunyodkorlari <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">tarbiya topadigan</span> maskan
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Pastdarg'om tumani 65-sonli umumta'lim maktabida zamonaviy axborot texnologiyalari, fan to'garaklari, chuqur ta'lim dasturi va "65-MaktabAI" intellektual yordamchisi!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <a href="#about" className="px-6 py-3.5 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2">
              <span>Batafsil ma'lumot</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#schedule" className="px-6 py-3.5 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>Dars jadvali</span>
            </a>
            <a href="#clubs" className="px-6 py-3.5 rounded-xl font-bold bg-transparent hover:bg-white/10 text-amber-400 border border-amber-400/40 transition-all flex items-center gap-2">
              <Flame className="w-4 h-4" />
              <span>To'garaklarga a'zo bo'lish</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl">
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">{SCHOOL_INFO.stats.students}</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Iqtidorli o'quvchilar</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">{SCHOOL_INFO.stats.teachers} nafar</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Tajribali ustozlar</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">{SCHOOL_INFO.stats.olympiadWinners}</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">Olimpiada sovrindorlari</div>
            </div>
            <div className="p-3">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">{SCHOOL_INFO.stats.universityAdmission}</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium">OTM talabasi bo'lish</div>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 2. MAKTAB HAQIDA (ABOUT)                                              */}
      {/* --------------------------------------------------------------------- */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Bizning maskan</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">Pastdarg'om tumani 65-sonli maktab haqida</h2>
            <p className="text-slate-600 leading-relaxed">
              O'quvchilarimizning intellektual salohiyatini yuksaltirish, mustaqil fikrlaydigan, vatanparvar va raqobatbardosh yoshlar etib tarbiyalash bizning oliy vazifamizdir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] mb-2">Oliy toifali ustozlar</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Maktabimizda ko'p yillik tajribaga ega xalq ta'limi a'lochilari, xalqaro sertifikatli til egalari va yosh novatorlar saboq beradi.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-5">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] mb-2">Zamonaviy IT & STEM</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Zamonaviy kompyuter sinflari, yuqori tezlikdagi internet, aqlli doskalar, Python va Robototexnika laboratoriyasi.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] mb-2">Boy kutubxona & Media</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                10,000 dan ortiq darsliklar va badiiy kitoblar hamda har bir sinf darsliklarining ochiq Google Drive PDF elektron shakllari.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0b1b3d] mb-2">Sport va Iqtidor</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Yopiq sport zallari, shaxmat klubi, voleybol va stol tennisi to'garaklari muntazam musobaqalarga tayyorgarlik ko'radi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 3. TO'GARAKLAR RO'YXATI (CLUBS SECTION - NEW)                          */}
      {/* --------------------------------------------------------------------- */}
      <section id="clubs" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Iqtidor va Mahorat</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">Maktabimizdagi Fan va Qiziqish To'garaklari</h2>
            <p className="text-slate-600 leading-relaxed">
              Darsdan so'ng o'quvchilarimiz bo'sh vaqtlarini mazmunli o'tkazishlari uchun tashkil etilgan bepul va chuqurlashtirilgan to'garaklar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {SCHOOL_CLUBS.map(club => (
              <div key={club.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className={`p-5 bg-gradient-to-r ${club.color} text-white relative`}>
                  <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 bg-amber-400 text-slate-950 rounded-full">
                    {club.badge}
                  </span>
                  <div className="text-xs uppercase font-bold text-amber-200 mb-1">{club.category}</div>
                  <h3 className="text-xl font-bold leading-snug">{club.name}</h3>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                    <img src={club.teacherPhoto} alt={club.teacher} className="w-12 h-12 rounded-full object-cover border-2 border-amber-500" />
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{club.teacher}</div>
                      <div className="text-xs text-slate-500">{club.teacherRole}</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-700 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span><strong>Vaqti:</strong> {club.schedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span><strong>Xona:</strong> {club.room}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                      <span><strong>Mo'ljallangan:</strong> {club.targetGrades}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed mb-6 flex-1">
                    {club.description}
                  </p>

                  <a 
                    href={`${SCHOOL_INFO.telegramBotUrl}?text=${encodeURIComponent(`Assalomu alaykum! Men "${club.name}" to'garagiga a'zo bo'lishni xohlayman.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl font-bold text-xs text-center border border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-500 hover:text-white transition-all"
                  >
                    To'garakka A'zo Bo'lish
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#0b1b3d] to-[#1e3a8a] text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div>
              <h4 className="text-lg font-bold mb-1">Yangi to'garak ochish yoki taklif kiritmoqchimisiz?</h4>
              <p className="text-slate-300 text-sm">Maktabimiz Telegram bot orqali istalgan taklif va arizalaringizni qoldirishingiz mumkin.</p>
            </div>
            <a 
              href={SCHOOL_INFO.telegramBotUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm whitespace-nowrap shadow transition-all"
            >
              Telegram Botga yozish
            </a>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 4. YANGILIKLAR VA MAQOLALAR TASMASI (NEWS & ARTICLES)                 */}
      {/* --------------------------------------------------------------------- */}
      <section id="news" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Maktab Hayoti</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">So'nggi Yangiliklar va Maqolalar</h2>
            <p className="text-slate-600 leading-relaxed">
              O'quvchilarimizning tuman, viloyat va respublika miqyosidagi yutuqlari hamda maktab hayotidagi muhim voqealar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SCHOOL_NEWS.map(news => (
              <article key={news.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                <div className="relative h-52 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 bg-[#0b1b3d] text-white rounded-lg">
                    {news.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3 font-medium">
                    <span>📅 {news.date}</span>
                    <span>•</span>
                    <span>✍️ {news.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1b3d] leading-snug mb-3">
                    {news.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-1">
                    {news.excerpt}
                  </p>
                  <button
                    onClick={() => setReadingArticle(news)}
                    className="self-start text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5"
                  >
                    <span>Batafsil o'qish</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 5. DARS JADVALI (SCHEDULE SECTION)                                    */}
      {/* --------------------------------------------------------------------- */}
      <section id="schedule" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">O'quv tartibi</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">Dars Jadvali va Qo'ng'iroqlar Vaqti</h2>
            <p className="text-slate-600 leading-relaxed">
              1-smena va 2-smena dars va tanaffus vaqtlari, sinflar bo'yicha moslashuvchan jadval.
            </p>
          </div>

          {/* Shift tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-8">
            {SHIFTS.map(shift => (
              <button
                key={shift.shiftNumber}
                onClick={() => {
                  setActiveShift(shift.shiftNumber);
                  if (shift.shiftNumber === 1 && selectedClass === '6-B') setSelectedClass('9-A');
                  if (shift.shiftNumber === 2 && selectedClass !== '6-B') setSelectedClass('6-B');
                }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  activeShift === shift.shiftNumber 
                    ? 'border-amber-500 bg-white shadow-md' 
                    : 'border-slate-200 bg-white/60 hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-black text-amber-600 tracking-wider">
                  {shift.shiftNumber}-SMENA
                </div>
                <div className="text-base font-bold text-slate-900 mt-1">{shift.timeRange}</div>
                <div className="text-xs text-slate-500 mt-0.5">{shift.grades}</div>
              </button>
            ))}
          </div>

          {/* Bells timetable preview */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>{activeShift}-Smena Qo'ng'iroqlar va Tanaffuslar tartibi:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {(activeShift === 1 ? BELL_SCHEDULE_SHIFT_1 : BELL_SCHEDULE_SHIFT_2).map(bell => (
                <div key={bell.lesson} className="bg-slate-50 p-3 rounded-xl border-l-4 border-amber-500">
                  <div className="text-[11px] font-bold text-slate-500">{bell.lesson}-soat dars</div>
                  <div className="text-sm font-extrabold text-[#0b1b3d]">{bell.start} — {bell.end}</div>
                  <div className="text-[10px] font-semibold text-amber-700 mt-0.5">{bell.breakMinutes}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Class Select Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label htmlFor="classSelector" className="text-sm font-bold text-slate-900">Sinfni tanlang:</label>
              <select
                id="classSelector"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 bg-white border border-slate-300 rounded-xl font-bold text-sm text-[#0b1b3d] outline-none focus:border-amber-500 shadow-sm"
              >
                <option value="9-A">9-"A" sinf (1-smena)</option>
                <option value="10-B">10-"B" sinf (1-smena)</option>
                <option value="11-A">11-"A" sinf (1-smena)</option>
                <option value="6-B">6-"B" sinf (2-smena)</option>
              </select>
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Har bir dars davomiyligi 45 daqiqadan iborat.</span>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0b1b3d] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4">Soat</th>
                    <th className="py-3.5 px-4">Vaqti</th>
                    <th className="py-3.5 px-4">Fan Nomi</th>
                    <th className="py-3.5 px-4">O'qituvchi</th>
                    <th className="py-3.5 px-4">Xona</th>
                    <th className="py-3.5 px-4">Tanaffus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {(CLASS_SCHEDULES[selectedClass] || []).map(row => (
                    <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-500">{row.lessonNumber}-soat</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">{row.time}</td>
                      <td className="py-3.5 px-4 font-bold text-[#0b1b3d]">{row.subject}</td>
                      <td className="py-3.5 px-4 text-slate-700">{row.teacher}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 text-xs font-bold">
                          {row.room}-xona
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-amber-700">{row.breakAfter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 6. O'QUVCHILAR REYTINGI (TOP-10 RANKINGS)                             */}
      {/* --------------------------------------------------------------------- */}
      <section id="rating" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Yutuqlar Mezoni</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">O'quvchilar va Sinflar TOP-10 Reytingi</h2>
            <p className="text-slate-600 leading-relaxed">
              Baholash tizimisiz, faqat fan olimpiadalari, xalqaro sertifikatlar, Zakovat va faollik natijalari bo'yicha tuzilgan rasmiy reyting.
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            <button
              onClick={() => setRatingTab('students')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                ratingTab === 'students'
                  ? 'bg-[#0b1b3d] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Iqtidorli O'quvchilar TOP-10
            </button>
            <button
              onClick={() => setRatingTab('classes')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                ratingTab === 'classes'
                  ? 'bg-[#0b1b3d] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Faol Sinflar Reytingi
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {ratingTab === 'students' ? (
              TOP_STUDENTS.map(st => (
                <div 
                  key={st.rank}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    st.rank === 1 
                      ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                      : st.rank <= 3
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm ${
                      st.rank === 1 ? 'bg-amber-400 text-slate-950' : st.rank === 2 ? 'bg-slate-200 text-slate-800' : st.rank === 3 ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {st.rank}
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-[#0b1b3d]">{st.name}</div>
                      <div className="text-xs text-slate-500">{st.grade} sinf • {st.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-700">
                      {st.badge}
                    </span>
                    <div className="font-black text-base text-[#0b1b3d]">
                      {st.score} <span className="text-xs font-bold text-slate-500">ball</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              TOP_CLASSES.map(cl => (
                <div 
                  key={cl.rank}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                    cl.rank === 1 
                      ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center font-black text-sm">
                      {cl.rank}
                    </div>
                    <div>
                      <div className="font-extrabold text-base text-[#0b1b3d]">{cl.className}</div>
                      <div className="text-xs text-slate-500">Sinf rahbari: {cl.teacher}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <span className="text-xs font-bold text-slate-600">
                      {cl.achievementsCount} ta yutuq
                    </span>
                    <div className="font-black text-base text-amber-600">
                      {cl.activityScore}% <span className="text-xs font-bold text-slate-500">faollik</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 7. O'QITUVCHILAR BO'LIMI (TEACHERS)                                    */}
      {/* --------------------------------------------------------------------- */}
      <section id="teachers" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Pedagoglar</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">Maktabimiz Faxriy O'qituvchilari</h2>
            <p className="text-slate-600 leading-relaxed">
              O'z fani bo'yicha tuman va viloyat miqyosida e'tirof etilgan oliy toifali ustozlarimiz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEACHERS_LIST.map(teacher => (
              <div key={teacher.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                <div className="h-60 overflow-hidden">
                  <img src={teacher.photo} alt={teacher.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#0b1b3d]">{teacher.name}</h3>
                  <div className="text-xs font-bold text-amber-600 mt-0.5">{teacher.subject}</div>
                  <div className="text-xs text-slate-500 mt-1">{teacher.rank} • {teacher.experience} yillik pedagogik staj</div>
                  <div className="text-xs text-slate-700 mt-3 pt-3 border-t border-slate-100 leading-relaxed">
                    {teacher.achievements}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 8. ELEKTRON KUTUBXONA (GOOGLE DRIVE PDF)                               */}
      {/* --------------------------------------------------------------------- */}
      <section id="library" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Ziyo Maskani</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">Elektron Kutubxona va Darsliklar (PDF)</h2>
            <p className="text-slate-600 leading-relaxed">
              Barcha darsliklar va o'quv qo'llanmalari. Har bir kitobni saytda o'qish va Google Drive orqali to'g'ridan-to'g'ri PDF yuklab olish mumkin.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Darslik yoki fan nomi bo'yicha qidiring..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedGrade('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedGrade === 'all'
                    ? 'bg-[#0b1b3d] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Barchasi
              </button>
              {[7, 9, 10, 11].map(grade => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    selectedGrade === grade
                      ? 'bg-[#0b1b3d] text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {grade}-sinf
                </button>
              ))}
            </div>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => (
              <div key={book.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-lg transition-all">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-lg">
                      {book.grade}-sinf
                    </span>
                    <span className="text-xs text-slate-500 font-semibold">{book.fileSize} (PDF)</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0b1b3d] mb-1 leading-snug">{book.title}</h3>
                  <div className="text-xs text-slate-500 mb-3">{book.author}</div>
                  <p className="text-xs text-slate-600 line-clamp-3 mb-6 leading-relaxed">{book.description}</p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setPreviewBook(book)}
                    className="flex-1 py-2 rounded-xl text-xs font-bold border border-amber-500 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors"
                  >
                    O'qish
                  </button>
                  <a
                    href={book.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF Yuklab olish</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* 9. ALOQA VA JOYLASHUV (CONTACT SECTION)                               */}
      {/* --------------------------------------------------------------------- */}
      <section id="contact" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 bg-amber-100 px-3 py-1 rounded-full">Bog'lanish</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b1b3d] mt-3 mb-4">Maktab Ma'muriyati Bilan Aloqa</h2>
            <p className="text-slate-600 leading-relaxed">
              Savollaringiz, murojaat yoki takliflaringiz bo'lsa, rasmiy kanallarimiz orqali bog'lanishingiz mumkin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Info Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#0b1b3d] mb-2">Maktab Rekvizitlari</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                  Samarqand viloyati, Pastdarg'om tumani 65-sonli umumta'lim maktabi rasmiy boshqaruvi.
                </p>

                <div className="space-y-5 text-sm">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Manzil:</div>
                      <div className="font-semibold text-slate-900 mt-0.5">{SCHOOL_INFO.address}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Telefon raqam:</div>
                      <a href={`tel:${SCHOOL_INFO.phoneRaw}`} className="font-semibold text-slate-900 hover:text-amber-600 mt-0.5 block">
                        {SCHOOL_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Rasmiy Pochta:</div>
                      {/* Exact Display email vs Mailto */}
                      <a 
                        href={`mailto:${SCHOOL_INFO.actualEmail}`} 
                        className="font-semibold text-slate-900 hover:text-amber-600 mt-0.5 block"
                        title="Pochta orqali yozish"
                      >
                        {SCHOOL_INFO.displayEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase">Telegram Support Bot:</div>
                      <a 
                        href={SCHOOL_INFO.telegramBotUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-semibold text-blue-600 hover:underline mt-0.5 block"
                      >
                        @pastdargom_65maktab_uzbot
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={SCHOOL_INFO.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-2 text-sm shadow transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram Support Botga o'tish</span>
                </a>
              </div>
            </div>

            {/* Form Card (Redirects to Telegram Bot) */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#0b1b3d] mb-2">Murojaat va Taklif Qoldirish</h3>
              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Formani to'ldirib "Yuborish" tugmasini bosishingiz bilan xabaringiz to'g'ridan-to'g'ri maktabimiz Telegram botiga yo'naltiriladi.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ism va Familiyangiz *</label>
                  <input
                    type="text"
                    required
                    placeholder="Masalan: Rustamov Shohruh"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telefon raqamingiz *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Kim sifatida murojaat?</label>
                    <select
                      value={contactRole}
                      onChange={(e) => setContactRole(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm outline-none focus:border-amber-500 font-medium"
                    >
                      <option value="Ota-ona">Ota-ona</option>
                      <option value="O'quvchi">O'quvchi</option>
                      <option value="Bitiruvchi">Bitiruvchi</option>
                      <option value="Mehmon">Mehmon / Boshqa</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Xabaringiz yoki taklifingiz *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Murojaatingiz matnini batafsil yozing..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold bg-[#0b1b3d] hover:bg-[#162f65] text-white flex items-center justify-center gap-2 text-sm shadow transition-all"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Yuborish (Telegram Bot orqali)</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* FOOTER                                                                */}
      {/* --------------------------------------------------------------------- */}
      <footer className="bg-[#071228] text-slate-400 py-12 border-t border-white/10 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-10 relative flex items-center justify-center">
                  <svg viewBox="0 0 36 40" fill="none" className="w-full h-full">
                    <path d="M18 2L3 8V19C3 28.5 9.5 35.8 18 38C26.5 35.8 33 28.5 33 19V8L18 2Z" fill="#0F2856" stroke="#F59E0B" strokeWidth="2"/>
                  </svg>
                  <span className="absolute text-white font-extrabold text-xs">65</span>
                </div>
                <div>
                  <div className="text-[10px] tracking-wider uppercase font-bold text-amber-400">Pastdarg'om tumani</div>
                  <div className="text-white font-extrabold">65-sonli Umumta'lim Maktabi</div>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
                Samarqand viloyati, Pastdarg'om tumani umumta'lim maskani. Zamonaviy axborot texnologiyalari, chuqurlashtirilgan ta'lim va "65-MaktabAI" intellektual muhiti.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Tezkor Havolalar</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-amber-400">Bosh sahifa</a></li>
                <li><a href="#clubs" className="hover:text-amber-400">To'garaklar ro'yxati</a></li>
                <li><a href="#news" className="hover:text-amber-400">Yangiliklar va Maqolalar</a></li>
                <li><a href="#schedule" className="hover:text-amber-400">Dars jadvali</a></li>
                <li><a href="#rating" className="hover:text-amber-400">TOP-10 Reyting</a></li>
                <li><a href="#library" className="hover:text-amber-400">Kutubxona (Google Drive)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">Boshqaruv & Texnik</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="/admin/index.html" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                    Decap CMS Admin Panel
                  </a>
                </li>
                <li>
                  <button onClick={() => setCodeModalOpen(true)} className="text-amber-400 hover:underline">
                    Sayt Manba Kodlari (HTML, CSS, JS)
                  </button>
                </li>
                <li>
                  <a href={SCHOOL_INFO.telegramBotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                    Telegram Support Bot
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SCHOOL_INFO.actualEmail}`} className="hover:text-amber-400">
                    {SCHOOL_INFO.displayEmail}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>© 2026 Pastdarg'om tumani 65-sonli umumta'lim maktabi. Barcha huquqlar himoyalangan.</div>
            <div className="flex items-center gap-4">
              <a href={SCHOOL_INFO.telegramBotUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">Telegram Bot</a>
              <a href={SCHOOL_INFO.telegramChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">Telegram Kanal</a>
            </div>
          </div>
        </div>
      </footer>

      {/* --------------------------------------------------------------------- */}
      {/* FLOATING "65-MAKTABAI" BUTTON (MULTIMODAL & IMAGE GENERATION)         */}
      {/* --------------------------------------------------------------------- */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setAiModalOpen(true)}
          className="relative group flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-[#0b1b3d] to-[#1e3a8a] text-white border-2 border-amber-400 shadow-2xl hover:scale-105 transition-all"
          title="65-MaktabAI: Multimodal savol-javob va rasm yaratish"
        >
          <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping pointer-events-none"></span>
          <Bot className="w-5 h-5 text-amber-400" />
          <span className="font-extrabold text-sm tracking-wide">65-MaktabAI</span>
        </button>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* 65-MAKTABAI CHAT MODAL                                                */}
      {/* --------------------------------------------------------------------- */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg h-[640px] max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            
            {/* Header */}
            <div className="bg-[#0b1b3d] text-white p-4 px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm">65-MaktabAI</div>
                  <div className="text-[10px] text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Multimodal O'qituvchi & Tasvir Yaratuvchi</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 p-2 px-3 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs whitespace-nowrap">
              <button
                onClick={() => handleSendAiMessage(undefined, "Matematika: 10-sinf kvadrat tenglamalarni yechish formulasi va misollarini tushuntirib bering.")}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-500 font-semibold"
              >
                📐 Matematika
              </button>
              <button
                onClick={() => handleSendAiMessage(undefined, "Menga rasmini chizib ber: Quyosh tizimi, yulduzlar va zamonaviy kosmik stansiya")}
                className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-800 font-semibold"
              >
                🎨 Rasm chizish
              </button>
              <button
                onClick={() => handleSendAiMessage(undefined, "Ingliz tili: 'Present Perfect' zamonini o'zbek tilida 3 ta misol bilan tushuntir.")}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-500 font-semibold"
              >
                🇬🇧 Ingliz tili
              </button>
              <button
                onClick={() => handleSendAiMessage(undefined, "Maktabimizdagi IT va Shaxmat to'garaklari jadvalini aytib bering.")}
                className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-amber-500 font-semibold"
              >
                🏫 To'garaklar
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {aiMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[85%] ${
                    msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#0b1b3d] text-white rounded-br-sm'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                    }`}
                  >
                    {msg.imagePreview && (
                      <img src={msg.imagePreview} alt="Yuklangan rasm" className="max-w-full rounded-lg mb-2 border border-white/20" />
                    )}
                    <div>{msg.text}</div>
                    {msg.generatedImage && (
                      <div className="mt-2.5 rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                        <img src={msg.generatedImage} alt="AI tomonidan chizilgan rasm" className="w-full max-h-60 object-contain" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                </div>
              ))}

              {aiLoading && (
                <div className="mr-auto p-3.5 bg-white border border-slate-200 rounded-2xl text-xs text-slate-500 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                  <span>65-MaktabAI o'ylamoqda va tahlil qilmoqda...</span>
                </div>
              )}
              <div ref={aiChatEndRef} />
            </div>

            {/* Image attachment preview strip */}
            {attachedImagePreview && (
              <div className="p-2 px-4 bg-amber-50 border-t border-amber-200 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <img src={attachedImagePreview} alt="Tanlangan rasm" className="w-8 h-8 rounded object-cover border border-amber-300" />
                  <span className="font-semibold">Rasm biriktirildi (Vision tahlili)</span>
                </div>
                <button onClick={removeAttachedImage} className="text-rose-600 font-bold hover:underline">
                  Olib tashlash
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSendAiMessage} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />

              {/* Attach Image for Vision */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-500 hover:text-amber-600 hover:bg-slate-100 rounded-full transition-colors"
                title="Rasm biriktirish (Vision tahlili)"
              >
                <Paperclip className="w-5 h-5" />
              </button>

              {/* Image gen trigger */}
              <button
                type="button"
                onClick={() => setAiInput("Menga rasmini chizib ber: ")}
                className="p-2 text-amber-600 hover:bg-amber-50 rounded-full transition-colors"
                title="Rasm chizdirish"
              >
                <ImageIcon className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder="Savol yozing yoki 'Menga rasmini chizib ber: ...'"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-full text-xs sm:text-sm outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                disabled={aiLoading || (!aiInput.trim() && !attachedImageBase64)}
                className="w-9 h-9 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center disabled:opacity-50 transition-all shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* O'QUVCHILAR UCHUN JAMOAVIY CHAT MODALI (COMMUNITY CHAT)               */}
      {/* --------------------------------------------------------------------- */}
      {communityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl h-[680px] max-h-[92vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-[#0b1b3d] text-white p-4 px-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-amber-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-extrabold text-sm">65-Maktab O'quvchilari Jamoaviy Chati</div>
                  <div className="text-[10px] text-slate-300">Do'stona fikr almashish va dars muhokamalari</div>
                </div>
              </div>
              <button
                onClick={() => setCommunityModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {communityMessages.map(msg => (
                <div key={msg.id} className="flex items-start gap-3">
                  <img src={msg.avatar} alt={msg.author} className="w-9 h-9 rounded-full object-cover border-2 border-amber-400 flex-shrink-0" />
                  <div className="bg-white border border-slate-200 rounded-2xl p-3.5 max-w-[85%] shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-[#0b1b3d]">{msg.author}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">{msg.grade}</span>
                      <span className="text-[10px] text-slate-400 ml-auto">{msg.time}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{msg.text}</p>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => handleLikeCommunityMessage(msg.id)}
                        className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 text-rose-500" />
                        <span>{msg.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={communityChatEndRef} />
            </div>

            {/* Input form */}
            <form onSubmit={handleSendCommunityMessage} className="p-3 bg-white border-t border-slate-200 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ismingiz (Masalan: Sardor)"
                  value={communityAuthor}
                  onChange={(e) => setCommunityAuthor(e.target.value)}
                  className="w-1/2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs outline-none"
                />
                <select
                  value={communityGrade}
                  onChange={(e) => setCommunityGrade(e.target.value)}
                  className="w-1/2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs outline-none font-medium"
                >
                  <option value="9-A">9-A sinf</option>
                  <option value="10-A">10-A sinf</option>
                  <option value="10-B">10-B sinf</option>
                  <option value="11-A">11-A sinf</option>
                  <option value="8-V">8-V sinf</option>
                  <option value="7-A">7-A sinf</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Xabaringizni yozing..."
                  value={newCommunityText}
                  onChange={(e) => setNewCommunityText(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-all"
                >
                  Yuborish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* ARTICLE READER MODAL (YANGILIK O'QISH)                                */}
      {/* --------------------------------------------------------------------- */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                {readingArticle.category}
              </span>
              <button
                onClick={() => setReadingArticle(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h2 className="text-2xl font-black text-[#0b1b3d] leading-snug mb-2">
              {readingArticle.title}
            </h2>

            <div className="text-xs text-slate-500 mb-6">
              <span>📅 {readingArticle.date}</span> • <span>✍️ {readingArticle.author}</span>
            </div>

            <img
              src={readingArticle.image}
              alt={readingArticle.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 border border-slate-200"
            />

            <div className="text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-semibold text-slate-900">{readingArticle.excerpt}</p>
              <p>{readingArticle.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* BOOK PREVIEW MODAL                                                    */}
      {/* --------------------------------------------------------------------- */}
      {previewBook && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-[#0b1b3d]">{previewBook.title}</h3>
              <button
                onClick={() => setPreviewBook(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 mb-6">
              <div><strong>Fan:</strong> {previewBook.subject}</div>
              <div><strong>Muallif(lar):</strong> {previewBook.author}</div>
              <div><strong>Sinf:</strong> {previewBook.grade}-sinf</div>
              <div><strong>Hajmi:</strong> {previewBook.fileSize} (PDF)</div>
              <p className="mt-3 text-slate-700 leading-relaxed">{previewBook.description}</p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={previewBook.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl font-bold text-xs text-center bg-[#0b1b3d] hover:bg-[#162f65] text-white transition-colors"
              >
                Google Drive'da O'qish
              </a>
              <a
                href={previewBook.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-xl font-bold text-xs text-center bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow"
              >
                PDF Yuklab olish
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --------------------------------------------------------------------- */}
      {/* CODE EXPORT MODAL (HTML, CSS, JS, ADMIN DECAP CMS)                    */}
      {/* --------------------------------------------------------------------- */}
      {codeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-slate-100 w-full max-w-4xl h-[720px] max-h-[92vh] rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">
            
            {/* Modal header */}
            <div className="p-4 px-6 bg-slate-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-400">
                <Code2 className="w-5 h-5" />
                <span>Sayt Manba Kodlari (HTML, CSS, JS va Admin Decap CMS)</span>
              </div>
              <button
                onClick={() => setCodeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab buttons */}
            <div className="flex items-center gap-2 p-2 px-6 bg-slate-800 border-b border-white/10 overflow-x-auto text-xs font-mono">
              <button
                onClick={() => setActiveCodeTab('html')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCodeTab === 'html' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                index.html
              </button>
              <button
                onClick={() => setActiveCodeTab('css')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCodeTab === 'css' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                style.css
              </button>
              <button
                onClick={() => setActiveCodeTab('js')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCodeTab === 'js' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                script.js
              </button>
              <button
                onClick={() => setActiveCodeTab('admin_html')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCodeTab === 'admin_html' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                admin/index.html
              </button>
              <button
                onClick={() => setActiveCodeTab('admin_yml')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeCodeTab === 'admin_yml' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                admin/config.yml
              </button>
            </div>

            {/* Toolbar */}
            <div className="p-3 px-6 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">
                {activeCodeTab === 'html' && 'index.html (Asosiy sayt strukturasi va bo\'limlari)'}
                {activeCodeTab === 'css' && 'style.css (Ranglar, animatsiyalar va to\'liq responsive stillar)'}
                {activeCodeTab === 'js' && 'script.js (65-MaktabAI, jamoaviy chat va to\'garaklar mantiqi)'}
                {activeCodeTab === 'admin_html' && 'admin/index.html (Decap CMS boshqaruv interfeysi)'}
                {activeCodeTab === 'admin_yml' && 'admin/config.yml (Bosh Ega va Admin rollari sozlamalari)'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const contents = {
                      html: STANDALONE_HTML,
                      css: STANDALONE_CSS,
                      js: STANDALONE_JS,
                      admin_html: ADMIN_HTML,
                      admin_yml: ADMIN_CONFIG_YML
                    };
                    handleCopyCode(contents[activeCodeTab]);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copiedCode ? "Nusxalandi! ✓" : "Nusxalash"}</span>
                </button>
                <button
                  onClick={() => handleDownloadCode(activeCodeTab)}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors shadow"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Yuklab olish</span>
                </button>
              </div>
            </div>

            {/* Editor box */}
            <div className="flex-1 overflow-auto p-4 bg-slate-950 font-mono text-xs text-sky-300 leading-relaxed">
              <pre className="whitespace-pre-wrap">
                {activeCodeTab === 'html' && STANDALONE_HTML}
                {activeCodeTab === 'css' && STANDALONE_CSS}
                {activeCodeTab === 'js' && STANDALONE_JS}
                {activeCodeTab === 'admin_html' && ADMIN_HTML}
                {activeCodeTab === 'admin_yml' && ADMIN_CONFIG_YML}
              </pre>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
