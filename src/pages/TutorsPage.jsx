import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Star, Award, CheckCircle2, ArrowRight, ShieldCheck,
  Video, Sparkles, MessageSquare, BookOpen, Clock
} from 'lucide-react';

export default function TutorsPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const tutors = [
    {
      id: 'alina',
      name: 'Alina Kasymova',
      role: language === 'kg' ? 'Улук сүйлөшүү жана IT насаатчысы' : language === 'ru' ? 'Ведущий ментор по IT и разговорному английскому' : 'Senior Speaking & IT Mentor',
      category: 'tech',
      experience: language === 'kg' ? '7+ жыл тажрыйба' : language === 'ru' ? '7+ лет опыта' : '7+ years experience',
      rating: '4.98',
      reviews: 142,
      hours: language === 'kg' ? '2,800+ саат өткөрдү' : language === 'ru' ? '2,800+ часов проведено' : '2,800+ hrs taught',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80',
      badge: '⭐ Cambridge CELTA',
      specialties: language === 'kg'
        ? ['IT англис тили', 'Күнүмдүк стендаптар', 'Тилдик тоскоолдукту жеңүү']
        : language === 'ru'
        ? ['IT-терминология', 'Дейли-стендапы', 'Снятие языкового барьера']
        : ['IT Tech English', 'Daily Standups', 'Overcoming Speech Anxiety'],
      bio: language === 'kg'
        ? 'Мурдагы техникалык котормочу, EPAM жана европалык стартаптардагы программалоочуларды даярдайт. Сүйлөмдүн туура обонуна жана чыныгы ишенимге басым жасайт.'
        : language === 'ru'
        ? 'Бывший технический переводчик, перешедший в коучинг разработчиков EPAM и европейских стартапов. Фокусируется на естественной мелодике речи и реальной уверенности.'
        : 'Former technical translator who transitioned into coaching software engineers at EPAM and European startups. Focuses on natural sentence melody and real conversational confidence.',
    },
    {
      id: 'david',
      name: 'David Miller',
      role: language === 'kg' ? 'Жетекчилер жана IELTS коучу' : language === 'ru' ? 'Коуч для топ-менеджеров и экзамена IELTS' : 'Executive & IELTS Coach',
      category: 'business',
      experience: language === 'kg' ? '9+ жыл тажрыйба' : language === 'ru' ? '9+ лет опыта' : '9+ years experience',
      rating: '5.0',
      reviews: 189,
      hours: language === 'kg' ? '3,400+ саат өткөрдү' : language === 'ru' ? '3,400+ часов проведено' : '3,400+ hrs taught',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      badge: language === 'kg' ? 'Түпкү алып баруучу · Бостон, АКШ' : language === 'ru' ? 'Носитель языка · Бостон, США' : 'Native Speaker · Boston, USA',
      specialties: language === 'kg'
        ? ['Жетекчилик сүйлөшүүлөр', 'Презентациялар', 'IELTS Speaking 8+']
        : language === 'ru'
        ? ['Переговоры на высшем уровне', 'Презентации инвесторам', 'IELTS Speaking 8+']
        : ['Executive Negotiations', 'Board Presentations', 'IELTS Speaking Band 8+'],
      bio: language === 'kg'
        ? 'Бостондон келген бизнес коммуникациялар боюнча насаатчы. Стартап негиздөөчүлөрүнө жана жетекчилерге эл аралык аренада ишенимдүү сүйлөөгө жардам берет.'
        : language === 'ru'
        ? 'Бизнес-коуч из Бостона. Помогает основателям стартапов, топ-менеджерам и ученым звучать убедительно и авторитетно на международной арене.'
        : 'Boston-native business communications coach. Specializes in helping founders, C-level executives, and scholars speak with convincing authority in international business.',
    },
    {
      id: 'nurlan',
      name: 'Nurlan Begaliev',
      role: language === 'kg' ? 'Тек-лид жана карьера адиси' : language === 'ru' ? 'Техлид и карьерный ментор' : 'Tech Lead & Career Specialist',
      category: 'tech',
      experience: language === 'kg' ? '6+ жыл тажрыйба' : language === 'ru' ? '6+ лет опыта' : '6+ years experience',
      rating: '4.95',
      reviews: 98,
      hours: language === 'kg' ? '1,950+ саат өткөрдү' : language === 'ru' ? '1,950+ часов проведено' : '1,950+ hrs taught',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      badge: language === 'kg' ? 'Силикон өрөөнүнүн подрядчиги' : language === 'ru' ? 'Подрядчик из Кремниевой Долины' : 'Silicon Valley Contractor',
      specialties: language === 'kg'
        ? ['Архитектураны коргоо', 'STAR интервью методу', 'Айлык боюнча сүйлөшүү']
        : language === 'ru'
        ? ['Защита системного дизайна', 'Методика STAR', 'Переговоры о ставке']
        : ['Software Architecture Pitches', 'STAR Interview Framework', 'Salary Counter-Offers'],
      bio: language === 'kg'
        ? 'Full-stack инженер жана англис тили боюнча ментор. Программисттерди техникалык интервьюлардан өтүүгө жана аралыктан иштөөгө даярдайт.'
        : language === 'ru'
        ? 'Действующий Full-stack инженер и ментор. Готовит инженеров к обсуждению системного дизайна и прохождению технического найма в США и Европе.'
        : 'Full-stack engineer and English mentor. Trains developers to comfortably discuss system design trade-offs and nail technical interviews for remote US/EU jobs.',
    },
    {
      id: 'elena',
      name: 'Elena Morozova',
      role: language === 'kg' ? 'Балдар жана өспүрүмдөр адиси' : language === 'ru' ? 'Специалист по английскому для детей и подростков' : 'Child & Teen Fluency Specialist',
      category: 'kids',
      experience: language === 'kg' ? '8+ жыл тажрыйба' : language === 'ru' ? '8+ лет опыта' : '8+ years experience',
      rating: '4.99',
      reviews: 165,
      hours: language === 'kg' ? '3,100+ саат өткөрдү' : language === 'ru' ? '3,100+ часов проведено' : '3,100+ hrs taught',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80',
      badge: 'Oxford Certified Teacher',
      specialties: language === 'kg'
        ? ['Оюн түрүндөгү фонетика', 'Акцентти оңдоо', '6–14 жаштагы балдар']
        : language === 'ru'
        ? ['Игровая фонетика', 'Постановка звуков', 'Дети 6–14 лет']
        : ['Gamified Phonics', 'Accent Clinic', 'Children Ages 6–14'],
      bio: language === 'kg'
        ? 'Балдардын өнүгүүсү боюнча тажрыйбалуу педагог. Жомоктор, ролдоштурулган оюндар жана кызыктуу тапшырмалар менен окутат.'
        : language === 'ru'
        ? 'Опытный педагог детского развития. Использует интерактивные сюжетные квесты и мультфильмы для постановки естественного акцента без скучной зубрежки.'
        : 'Dedicated child development educator. Uses animated storytelling, roleplays, and interactive whiteboard games to give children natural pronunciation from their first session.',
    },
    {
      id: 'aigerim',
      name: 'Aigerim Zholdosheva',
      role: language === 'kg' ? 'Эркин сүйлөшүү боюнча жетекчи' : language === 'ru' ? 'Ведущий ментор разговорной речи' : 'Conversational Fluency Lead',
      category: 'speaking',
      experience: language === 'kg' ? '5+ жыл тажрыйба' : language === 'ru' ? '5+ лет опыта' : '5+ years experience',
      rating: '4.96',
      reviews: 112,
      hours: language === 'kg' ? '1,700+ саат өткөрдү' : language === 'ru' ? '1,700+ часов проведено' : '1,700+ hrs taught',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      badge: 'TESOL Certified',
      specialties: language === 'kg'
        ? ['Күнүмдүк сленг жана идиомалар', 'Саякат тили', 'Ишенимди арттыруу']
        : language === 'ru'
        ? ['Современный сленг и идиомы', 'Английский для поездок', 'Преодоление страха']
        : ['Everyday Slang & Idioms', 'Travel English', 'Confidence Building'],
      bio: language === 'kg'
        ? 'Окуучуларга биринчи сабактан баштап сүйлөөдөн коркпоого жардам берет. Абдан жылуу, энергиялуу жана кызыктуу сабак өтөт.'
        : language === 'ru'
        ? 'Помогает преодолеть языковой барьер с самого первого занятия. Дружелюбная, чуткая и мастерски превращающая ошибки в запоминающийся опыт.'
        : 'Helps students overcome the fear of speaking in English from day 1. Enthusiastic, warm, and highly skilled in turning mistakes into memorable lessons.',
    },
  ];

  const filteredTutors = tutors.filter((tutor) => {
    if (filter === 'all') return true;
    return tutor.category === filter;
  });

  return (
    <div className="bg-white">
      {/* ───── Hero Header ───── */}
      <section className="bg-gradient-to-b from-purple-50/60 via-white to-white py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 mb-4 shadow-2xs">
            <Sparkles size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              {t('tutorsSection.badge')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {t('tutorsSection.title')}
          </h1>

          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {t('tutorsSection.subtitle')}
          </p>

          {/* Filter Pills */}
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
            {[
              { id: 'all', label: t('tutorsPage.filterAll') },
              { id: 'tech', label: t('tutorsPage.filterTech') },
              { id: 'business', label: t('tutorsPage.filterBusiness') },
              { id: 'speaking', label: t('tutorsPage.filterSpeaking') },
              { id: 'kids', label: t('tutorsPage.filterKids') },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  filter === tab.id
                    ? 'bg-[#4C1D95] text-white shadow-md shadow-purple-900/15 scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───── 4-Stage Selection Criteria Banner ───── */}
      <section className="py-8 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <span className="text-xl sm:text-2xl font-black text-[#4C1D95]">Top 4%</span>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{t('tutorsPage.statRate')}</p>
            </div>
            <div className="p-3">
              <span className="text-xl sm:text-2xl font-black text-[#4C1D95]">CELTA / TESOL</span>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{t('tutorsPage.statCert')}</p>
            </div>
            <div className="p-3">
              <span className="text-xl sm:text-2xl font-black text-[#4C1D95]">Domain Experts</span>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{t('tutorsPage.statDomains')}</p>
            </div>
            <div className="p-3">
              <span className="text-xl sm:text-2xl font-black text-[#4C1D95]">100% Free Swap</span>
              <p className="text-xs text-gray-500 font-medium mt-0.5">{t('tutorsPage.statSwap')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Tutors Cards Grid ───── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-purple-200"
            >
              <div>
                {/* Header: Photo & Rating */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <img
                      src={tutor.image}
                      alt={tutor.name}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-purple-100"
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#4C1D95] transition-colors">
                      {tutor.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#6D28D9] mb-1">
                      {tutor.role}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Star size={13} className="text-amber-400 fill-amber-400" />
                      <span className="font-bold text-gray-900">{tutor.rating}</span>
                      <span>({tutor.reviews} {t('tutorsPage.reviewsCount')})</span>
                    </div>
                  </div>
                </div>

                <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 mb-3">
                  {tutor.badge}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mb-4">
                  {tutor.bio}
                </p>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {tutor.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => navigate(`/register?tutor=${encodeURIComponent(tutor.name)}`)}
                className="w-full py-3 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{t('tutorsPage.bookWithTutor')} {tutor.name.split(' ')[0]}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Matching Guarantee Banner ───── */}
      <section className="py-14 sm:py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldCheck size={36} className="text-[#6D28D9] mx-auto mb-3" />
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            {t('tutorsPage.howMatchingWorks')}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed">
            {t('tutorsPage.matchingDesc')}
          </p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-semibold text-sm transition-all shadow-md shadow-purple-900/10"
          >
            <span>{t('tutorsPage.getMatchedBtn')}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
