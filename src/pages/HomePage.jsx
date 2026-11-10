import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  CheckCircle2, ArrowRight, UserPlus, Users, BookOpen, BarChart3,
  MessageSquare, Headphones, Briefcase, GraduationCap, Monitor, Baby,
  ChevronDown, ChevronUp, Star, Quote, Calendar, Target, Zap, Trophy,
  Sparkles, Clock, Check, Award, Play, Flame, ShieldCheck, X, FileText,
  ChevronRight, Volume2, Video, ArrowUpRight
} from 'lucide-react';

/* ───── Hero Section ───── */
function HeroSection() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-20 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200/80 mb-4 sm:mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-gray-600 tracking-wider uppercase">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.14] mb-4 sm:mb-6 tracking-tight">
              {language === 'kg' ? (
                <>
                  <div><span className="text-[#6D28D9]">Ишенимдүү англис</span> тилинде</div>
                  <div>жеке мугалимиңиз</div>
                  <div>менен сүйлөңүз</div>
                </>
              ) : language === 'ru' ? (
                <>
                  <div>Говорите на <span className="text-[#6D28D9]">уверенном</span></div>
                  <div><span className="text-[#6D28D9]">английском</span> с личным</div>
                  <div>преподавателем</div>
                </>
              ) : (
                <>
                  <div>Speak <span className="text-[#6D28D9]">confident</span></div>
                  <div><span className="text-[#6D28D9]">English</span> with your</div>
                  <div>own teacher</div>
                </>
              )}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 mb-9">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-semibold transition-all shadow-md shadow-purple-900/10 hover:shadow-lg hover:-translate-y-0.5"
              >
                {t('hero.cta')}
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => navigate('/courses')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gray-100/80 hover:bg-gray-200/80 text-gray-800 text-sm font-semibold transition-colors"
              >
                {t('hero.ctaSecondary')}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-700">
              {[t('hero.feature1'), t('hero.feature2'), t('hero.feature3')].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#6D28D9]" />
                  <span className="font-medium">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Preview Cards with Cool Hover Animation */}
          <div className="relative hidden lg:block animate-fade-in-up-delay-2 pl-4 group cursor-pointer select-none">
            {/* Ambient glowing radial backdrop on hover */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/20 via-violet-500/25 to-sky-400/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none transform group-hover:scale-105" />

            {/* Schedule floating pill card (top-right) */}
            <div className="absolute -top-5 right-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/90 px-4 py-3 flex items-center gap-3 animate-float-soft transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:-translate-y-2 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-purple-200">
              <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 transition-all duration-300 group-hover:bg-purple-100 group-hover:text-[#6D28D9] group-hover:rotate-6">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-[#4C1D95] transition-colors">{t('hero.cardSchedule')}</p>
                <p className="text-[11px] text-gray-400 font-medium">{t('hero.cardScheduleSub')}</p>
              </div>
            </div>

            {/* Main lesson card */}
            <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-100 p-6 max-w-md ml-auto transition-all duration-500 ease-out group-hover:-translate-y-2.5 group-hover:shadow-[0_30px_60px_-15px_rgba(109,40,217,0.22)] group-hover:border-purple-200">
              <div className="flex items-center gap-3 mb-5">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                    alt="Alina K."
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-100 transition-all duration-300 group-hover:scale-110 group-hover:ring-4 group-hover:ring-purple-200"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm group-hover:text-[#4C1D95] transition-colors">Alina K.</p>
                  <p className="text-xs text-gray-400">Senior Tutor · HOURLY</p>
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-xs font-medium text-emerald-700 border border-emerald-100 transition-all duration-300 group-hover:bg-emerald-100 group-hover:scale-105">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {t('hero.cardLive')}
                </span>
              </div>

              {/* Chat bubbles */}
              <div className="space-y-3 mb-5">
                <div className="flex items-start gap-2.5 transition-transform duration-300 group-hover:translate-x-0.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-1">
                    AK
                  </div>
                  <div className="bg-gray-50/90 rounded-2xl rounded-tl-sm p-3.5 text-xs sm:text-sm text-gray-700 leading-relaxed border border-gray-100 transition-all duration-300 group-hover:bg-gray-50 group-hover:border-purple-100/60">
                    "Let's review the interview scenario from yesterday. How would you pitch your project in English?"
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <div className="bg-[#4C1D95] text-white rounded-2xl rounded-tr-sm px-4 py-3 text-xs sm:text-sm max-w-[85%] leading-relaxed shadow-sm transition-all duration-300 group-hover:bg-[#581C87] group-hover:shadow-md group-hover:shadow-purple-900/30 group-hover:-translate-x-0.5">
                    "I usually focus on the key problem and our solution..."
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-sky-600 bg-sky-50 px-1.5 py-0.5 rounded uppercase transition-all duration-300 group-hover:bg-sky-100 group-hover:scale-110">
                    YOU
                  </span>
                </div>
              </div>

              {/* Audio channel with dancing equalizer on hover */}
              <div className="flex items-center justify-between bg-gray-50/80 rounded-xl p-3 border border-gray-100 transition-all duration-300 group-hover:border-purple-200 group-hover:bg-purple-50/40">
                <div className="flex items-center gap-2">
                  <Headphones size={15} className="text-[#6D28D9] transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-purple-900 transition-colors">{t('hero.cardAudio')}</span>
                </div>
                <div className="flex items-end gap-1 h-6 px-1">
                  {[10, 18, 8, 22, 14, 20, 10, 16, 24, 12, 18].map((h, i) => (
                    <div
                      key={i}
                      className="soundwave-bar w-1 bg-gradient-to-t from-[#4C1D95] to-[#7C3AED] rounded-full"
                      style={{
                        height: `${h}px`,
                        animationDelay: `${(i % 5) * 150}ms`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-[11px] font-mono text-gray-400 group-hover:text-[#6D28D9] transition-colors font-medium">44.1 kHz</span>
              </div>

              {/* Tags */}
              <div className="flex gap-2 mt-4 pt-1">
                {['Vocabulary', 'Pronunciation'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-purple-50 text-xs font-semibold text-[#6D28D9] border border-purple-100/60 transition-all duration-300 group-hover:bg-purple-100/90 group-hover:text-[#4C1D95] group-hover:scale-105"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Plan floating card (bottom-left) */}
            <div className="absolute -bottom-6 left-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/90 px-4 py-3 flex items-center gap-3 animate-float-soft-delayed transition-all duration-500 ease-out group-hover:-translate-x-3 group-hover:translate-y-2 group-hover:scale-105 group-hover:shadow-2xl group-hover:border-purple-200">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-[#6D28D9] transition-all duration-700 group-hover:rotate-[360deg] group-hover:bg-[#4C1D95] group-hover:text-white">
                <Target size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 group-hover:text-[#4C1D95] transition-colors">{t('hero.cardPlan')}</p>
                <p className="text-[11px] text-gray-400 font-medium">{t('hero.cardPlanSub')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── Marquee ───── */
function MarqueeSection() {
  const { t } = useLanguage();
  const items = t('marquee.items');
  const list = Array.isArray(items) ? items : [];

  return (
    <section className="border-y border-gray-100 bg-white py-5 overflow-hidden">
      <div className="animate-marquee flex items-center whitespace-nowrap">
        {[...list, ...list, ...list, ...list].map((item, i) => (
          <React.Fragment key={i}>
            <span className="text-lg sm:text-xl font-bold text-gray-800 mx-6">{item}</span>
            <span className="text-primary-300 mx-2">✦</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

/* ───── Rich Course Syllabi & Curriculum Data ───── */
const COURSE_SYLLABI = {
  it: {
    title: 'IT & Tech Industry English',
    category: 'tech',
    badge: '🔥 High Demand for Developers',
    badgeColor: 'bg-purple-100 text-[#6D28D9] border-purple-200',
    level: 'A2 – C1',
    duration: '50 min / lesson · 1-on-1',
    accentColor: 'from-purple-500/10 to-indigo-500/5',
    highlights: ['System Architecture Pitch', 'Pull Request Discussions', 'Remote Standup Fluency', 'Salary Negotiation'],
    tutors: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'],
    tutorNote: 'Taught by Alina K. + 3 Senior Tech Coaches',
    outcomes: [
      'Speak confidently in Agile daily standups without preparing scripts in advance',
      'Explain complex database & architectural trade-offs to foreign tech leads',
      'Ace technical screening questions using professional engineering vocabulary',
      'Negotiate higher USD compensation with European & US remote tech recruiters'
    ],
    modules: [
      { week: 'Module 01', title: 'Agile Ceremonies & Standup Velocity', desc: 'Describing blockers, sprint goals, ticket status, and asynchronous team communication in Slack/Jira.' },
      { week: 'Module 02', title: 'System Design & Architecture Discussions', desc: 'Articulating microservices, latency trade-offs, API contracts, and security considerations clearly.' },
      { week: 'Module 3', title: 'Live Mock Technical Interviews', desc: 'Explaining algorithm time/space complexity, problem-solving out loud, and whiteboarding in English.' },
      { week: 'Module 04', title: 'Offer & Compensation Negotiations', desc: 'Tactfully counter-offering base salary, equity, stock options, and remote work stipends.' },
    ],
  },
  business: {
    title: 'Business English & Negotiations',
    category: 'tech',
    badge: '💼 Executive & Leadership Track',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    level: 'B1 – C1',
    duration: '50 min / lesson · 1-on-1',
    accentColor: 'from-amber-500/10 to-orange-500/5',
    highlights: ['Boardroom Presentations', 'Diplomatic Counter-Offers', 'High-Stakes Contract Reviews', 'Cross-Cultural Emails'],
    tutors: ['https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'],
    tutorNote: 'Taught by David Miller + 2 Corporate Coaches',
    outcomes: [
      'Command international boardrooms and executive meetings with calm authority',
      'Negotiate commercial agreements and commercial terms diplomatically',
      'Draft persuasive business memos, proposals, and cross-border emails',
      'Handle aggressive questioning with structured, diplomatic phrasing'
    ],
    modules: [
      { week: 'Module 01', title: 'Leading International Meetings', desc: 'Setting agendas, inviting input, resolving deadlock, and summarizing executive decisions.' },
      { week: 'Module 02', title: 'Strategic Negotiation Frameworks', desc: 'Trading concessions, setting anchors, pushback phrasing, and closing commercial terms.' },
      { week: 'Module 03', title: 'Persuasive Keynotes & Pitches', desc: 'Structuring executive slide narratives, delivering impactful statistics, and mastering Q&A.' },
      { week: 'Module 04', title: 'Diplomatic Business Correspondence', desc: 'Navigating sensitive feedback, contract escalations, and executive networking on LinkedIn.' },
    ],
  },
  ielts: {
    title: 'IELTS Academic & General Prep',
    category: 'exams',
    badge: '🎯 Band 7.5+ Strategy Track',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    level: 'B1 – C1',
    duration: '50 min / lesson · 1-on-1',
    accentColor: 'from-emerald-500/10 to-teal-500/5',
    highlights: ['Part 1-3 Fluency Drills', 'Task 2 Essay Architecting', 'Vocabulary Boost (Band 8+)', 'Timed Examiner Simulations'],
    tutors: ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80'],
    tutorNote: 'Taught by Cambridge Certified IELTS Examiners',
    outcomes: [
      'Score Band 7.5+ in IELTS Speaking by eliminating filler pauses and hesitations',
      'Master Task 2 Academic essays with high lexical resource and coherent structure',
      'Understand exactly what British Council examiners look for in every band descriptor',
      'Complete timed full mock tests under realistic exam conditions'
    ],
    modules: [
      { week: 'Module 01', title: 'Speaking Part 1 & 2 Cue Card Mastery', desc: 'Storytelling frameworks, spontaneous expansion, and eliminating awkward hesitation gaps.' },
      { week: 'Module 02', title: 'Speaking Part 3 Abstract Reasoning', desc: 'Hypothetical reasoning, societal debate phrasing, and complex grammatical variety.' },
      { week: 'Module 03', title: 'Writing Task 1 & 2 Scoring Strategies', desc: 'Academic task response optimization, cohesive devices, and high-band lexical precision.' },
      { week: 'Module 04', title: 'Full Examiner Simulation & Diagnostics', desc: 'Realistic recorded exam simulation with detailed line-by-line examiner scoring breakdown.' },
    ],
  },
  general: {
    title: 'General Conversational Speaking',
    category: 'speaking',
    badge: '🌱 Everyday Confidence & Accent',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    level: 'A1 – C1',
    duration: '50 min / lesson · 1-on-1',
    accentColor: 'from-blue-500/10 to-sky-500/5',
    highlights: ['Spontaneous Small Talk', 'Overcoming Fear of Mistakes', 'Pronunciation & Rhythm', 'Travel & Real Life'],
    tutors: ['https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80'],
    tutorNote: 'Taught by Aigerim S. + Conversational Team',
    outcomes: [
      'Stop translating Russian or Kyrgyz into English inside your head before speaking',
      'Engage effortlessly in 30+ minute spontaneous chats with native speakers',
      'Travel anywhere without anxiety at airports, restaurants, hotels, and emergencies',
      'Improve pronunciation clarity and speech musicality'
    ],
    modules: [
      { week: 'Module 01', title: 'Breaking the Speech Barrier', desc: 'Immediate immersion, emotional freedom to make mistakes, and everyday conversational flow.' },
      { week: 'Module 02', title: 'Social & Travel Survival English', desc: 'Ordering food, hotel issues, international airport navigation, and casual networking.' },
      { week: 'Module 03', title: 'Expressing Nuanced Opinions', desc: 'Discussing cinema, politics, books, emotions, and sharing personal life philosophies.' },
      { week: 'Module 04', title: 'Connected Speech & Pronunciation', desc: 'Word stress, intonation contours, and rhythm drills to sound natural and clear.' },
    ],
  },
  interview: {
    title: 'Job Interview Preparation',
    category: 'tech',
    badge: '🚀 2-Week Rapid Career Fast-Track',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    level: 'B1 – C1',
    duration: '50 min / lesson · 1-on-1',
    accentColor: 'from-rose-500/10 to-red-500/5',
    highlights: ['STAR Method Answers', 'Tell Me About Yourself', 'Salary & Benefit Pushback', 'Live HR Mock Screenings'],
    tutors: ['https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80'],
    tutorNote: 'Taught by Senior Hiring Managers & Career Coaches',
    outcomes: [
      'Deliver an unforgettable 2-minute "About Me" pitch that immediately hooks interviewers',
      'Frame past mistakes and conflicts as massive strengths using the STAR framework',
      'Confidently handle curveball questions from foreign recruiters without freezing',
      'Negotiate remote perks, relocation packages, and bonuses effectively'
    ],
    modules: [
      { week: 'Module 01', title: 'The High-Impact Self-Introduction', desc: 'Crafting your unique value proposition, career milestones, and cultural enthusiasm.' },
      { week: 'Module 02', title: 'Behavioral Questions with STAR', desc: 'Structuring Situation, Task, Action, and Quantifiable Results in natural English.' },
      { week: 'Module 03', title: 'Live Realistic Recruiter Simulation', desc: 'Full dress-rehearsal mock interview with unexpected questions and stress-testing.' },
      { week: 'Module 04', title: 'Smart Questions & Offer Closing', desc: 'Asking strategic questions that prove leadership caliber and post-interview follow-up.' },
    ],
  },
  kids: {
    title: 'English for Kids & Teens',
    category: 'kids',
    badge: '🧸 Gamified Learning (Ages 6–14)',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
    level: 'Beginner – Intermediate',
    duration: '40 min / lesson · 1-on-1',
    accentColor: 'from-pink-500/10 to-purple-500/5',
    highlights: ['Interactive Games & Cartoons', 'Accent & Phonics Clinic', 'Zero Homework Stress', 'Show & Tell Presentations'],
    tutors: ['https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80'],
    tutorNote: 'Taught by Certified Child Development Specialists',
    outcomes: [
      'Develop genuine love for English through games, cartoons, and interactive challenges',
      'Surpass school grade standards and achieve natural pronunciation early',
      'Speak without fear or shyness in front of teachers and international peers',
      'Build vocabulary of 1,200+ active words naturally without rote memorization'
    ],
    modules: [
      { week: 'Module 01', title: 'Fun Phonics & Animated Worlds', desc: 'Interactive pronunciation games, phonics songs, and vocabulary through character quests.' },
      { week: 'Module 02', title: 'Storytelling & Roleplay Adventures', desc: 'Imaginary journeys, describing magical creatures, and dialoguing in fun roles.' },
      { week: 'Module 03', title: 'Everyday School & Friendship English', desc: 'Chatting about pets, favorite sports, hobbies, and family with natural excitement.' },
      { week: 'Module 04', title: 'Young Presenter Show & Tell', desc: 'Mini presentation where young learners proudly present their favorite toy or hobby.' },
    ],
  },
};

/* ───── Interactive "How It Works" Section ───── */
function HowItWorksSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      badge: t('howItWorks.step1Tag'),
      titleKey: 'step1Title',
      descKey: 'step1Desc',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-50',
    },
    {
      num: '02',
      badge: t('howItWorks.step2Tag'),
      titleKey: 'step2Title',
      descKey: 'step2Desc',
      icon: Users,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      num: '03',
      badge: t('howItWorks.step3Tag'),
      titleKey: 'step3Title',
      descKey: 'step3Desc',
      icon: Headphones,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      num: '04',
      badge: t('howItWorks.step4Tag'),
      titleKey: 'step4Title',
      descKey: 'step4Desc',
      icon: Award,
      color: 'text-amber-600 bg-amber-50',
    },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-[#FAF5FF]/30 border-y border-purple-100/50 relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200 mb-3 sm:mb-4 shadow-2xs">
            <Sparkles size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              {t('howItWorks.badge')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3 sm:mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Mobile-Only Horizontal Step Pill Bar */}
        <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 pb-2 mb-6 -mx-4 px-4 snap-x">
          {steps.map((step, idx) => (
            <button
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 flex-shrink-0 snap-start ${
                activeStep === idx
                  ? 'bg-[#4C1D95] text-white shadow-md shadow-purple-950/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200'
              }`}
            >
              <span className="opacity-70 font-mono">{step.num}</span>
              <span>{idx === 0 ? 'Diagnostic' : idx === 1 ? 'Smart Match' : idx === 2 ? 'Studio' : 'CEFR Certificate'}</span>
            </button>
          ))}
        </div>

        {/* Mobile Active Step Description Pill (replaces 4 stacked cards) */}
        <div className="block lg:hidden mb-6 bg-white p-5 rounded-2xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
              {steps[activeStep].badge}
            </span>
          </div>
          <h3 className="text-base font-bold text-gray-900">
            {t(`howItWorks.${steps[activeStep].titleKey}`)}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed mt-1">
            {t(`howItWorks.${steps[activeStep].descKey}`)}
          </p>
        </div>

        {/* 2-Column Showcase on Desktop (Left List + Right Preview) */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (Desktop Only): Interactive Step Selector */}
          <div className="hidden lg:block lg:col-span-6 space-y-4">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.num}
                  onClick={() => setActiveStep(idx)}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 relative border ${
                    isActive
                      ? 'bg-white shadow-xl border-[#6D28D9]/30 ring-2 ring-purple-100'
                      : 'bg-white/60 hover:bg-white border-gray-100 hover:border-purple-200/80 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive ? 'bg-[#4C1D95] text-white shadow-md shadow-purple-900/20' : step.color
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                          STEP {step.num}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full transition-colors ${
                            isActive
                              ? 'bg-purple-100 text-[#6D28D9] font-bold'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {step.badge}
                        </span>
                      </div>

                      <h3
                        className={`text-lg font-bold transition-colors ${
                          isActive ? 'text-[#4C1D95]' : 'text-gray-900'
                        }`}
                      >
                        {t(`howItWorks.${step.titleKey}`)}
                      </h3>

                      <p className="text-sm text-gray-500 leading-relaxed mt-1">
                        {t(`howItWorks.${step.descKey}`)}
                      </p>
                    </div>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-[#6D28D9] rounded-r-full" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Live Interactive Studio Preview */}
          <div className="lg:col-span-6">
            <div className="relative bg-white rounded-3xl p-7 lg:p-9 shadow-2xl border border-purple-100/80 overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-purple-100/60 to-transparent rounded-bl-full pointer-events-none" />

              {/* Step 0: Diagnostic Simulator */}
              {activeStep === 0 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#6D28D9] text-xs font-bold border border-purple-100">
                      <Sparkles size={13} />
                      Diagnostic Simulation
                    </div>
                    <span className="text-xs font-mono text-gray-400">15-min assessment</span>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Live Speech Wave Analysis</p>
                    <div className="flex items-center justify-between bg-white rounded-xl p-3 shadow-2xs border border-gray-100 mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-[#6D28D9] flex items-center justify-center">
                          <Volume2 size={16} />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">Audio sample submitted</p>
                          <p className="text-[11px] text-gray-400">0:45 min · Free dialogue prompt</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Analyzed
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-lg font-black text-gray-900">B1.2</p>
                        <p className="text-[10px] text-gray-400">Current Level</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-lg font-black text-[#6D28D9]">8 Weeks</p>
                        <p className="text-[10px] text-gray-400">Est. to B2</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100">
                        <p className="text-lg font-black text-emerald-600">88%</p>
                        <p className="text-[10px] text-gray-400">Pronunciation</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Conversational Fluency</span>
                      <span className="font-bold text-gray-900">72%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-[#6D28D9] h-2 rounded-full w-[72%]" />
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/register')}
                    className="w-full py-3 rounded-full bg-[#4C1D95] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Take Free 15-Min Diagnostic <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 1: Smart Matchmaker */}
              {activeStep === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                      <Users size={13} />
                      Precision Match Result
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      98.4% Match
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                        alt="Tutor Alina"
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-gray-900 text-sm">Alina Kasymova</p>
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-gray-700">4.98</span>
                        </div>
                        <p className="text-xs text-[#6D28D9] font-medium">Senior Tech & Business Coach</p>
                        <p className="text-[11px] text-gray-400">Bishkek UTC+6 · Cambridge Certified</p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-gray-200/60 text-xs">
                      <p className="font-medium text-gray-700">Next available slots:</p>
                      <div className="flex gap-2">
                        {['Today 18:30', 'Tomorrow 11:00', 'Fri 15:00'].map((slot, i) => (
                          <span key={slot} className={`px-2.5 py-1.5 rounded-lg font-medium text-center flex-1 cursor-pointer transition-colors ${i === 0 ? 'bg-[#4C1D95] text-white' : 'bg-white text-gray-700 border border-gray-200'}`}>
                            {slot}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/register')}
                    className="w-full py-3 rounded-full bg-[#4C1D95] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Lock in Tutor Alina <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 2: 1-on-1 Studio Live Session */}
              {activeStep === 2 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                      <Video size={13} />
                      Live Studio Sandbox
                    </div>
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Live 1-on-1 Call
                    </span>
                  </div>

                  <div className="bg-gray-900 rounded-2xl p-5 text-white relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-gray-400">Audio EQ: 44.1 kHz</span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                        Accuracy: 96%
                      </span>
                    </div>

                    <div className="bg-gray-800/80 rounded-xl p-3.5 border border-gray-700 mb-3">
                      <p className="text-[11px] text-gray-400 uppercase tracking-wide">Live Tutor Feedback Note</p>
                      <p className="text-xs text-purple-200 mt-1">
                        💡 "Instead of saying 'I think the project is good', try: <span className="text-amber-300 font-semibold">'From our architectural standpoint, the solution scales efficiently.'</span>"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
                      <span>Vocabulary Saved</span>
                      <span className="text-white font-bold">+14 active phrases</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/register')}
                    className="w-full py-3 rounded-full bg-[#4C1D95] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Experience 1-on-1 Session <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 3: CEFR Progression */}
              {activeStep === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                      <Award size={13} />
                      Verified CEFR Achievement
                    </div>
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Level B2 Certified
                    </span>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 border border-purple-200 shadow-sm relative">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-400 font-mono">HOURLY CERTIFICATE #KG-8492</p>
                        <p className="text-base font-black text-gray-900 mt-0.5">Professional English Fluency</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        ★
                      </div>
                    </div>

                    <div className="space-y-2.5 my-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-700">A1 Beginner</span>
                        <span className="text-gray-400">Completed ✓</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-gray-700">B1 Intermediate</span>
                        <span className="text-gray-400">Completed ✓</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                        <span>B2 Upper-Intermediate</span>
                        <span className="bg-purple-100 px-2 py-0.5 rounded-full">Passed (92%)</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-500 border-t border-purple-100 pt-3">
                      ✓ Ready for global tech interviews, university admissions, and international relocations.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/register')}
                    className="w-full py-3 rounded-full bg-[#4C1D95] text-white text-xs font-bold hover:bg-[#5B21B6] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    Start Your Path to Fluency <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* High-Trust Guarantee Banner */}
        <div className="mt-16 grid sm:grid-cols-3 gap-4 pt-10 border-t border-purple-100/60 text-center">
          <div className="p-4 bg-white/70 rounded-2xl border border-purple-100/40">
            <p className="text-xl font-black text-gray-900">850+ Active Students</p>
            <p className="text-xs text-gray-500 mt-0.5">Across Bishkek, Osh & Central Asia</p>
          </div>
          <div className="p-4 bg-white/70 rounded-2xl border border-purple-100/40">
            <p className="text-xl font-black text-[#6D28D9]">94% Success Rate</p>
            <p className="text-xs text-gray-500 mt-0.5">Achieve target CEFR level in 12 weeks</p>
          </div>
          <div className="p-4 bg-white/70 rounded-2xl border border-purple-100/40">
            <p className="text-xl font-black text-emerald-600">4-Hour Flexibility</p>
            <p className="text-xs text-gray-500 mt-0.5">Free reschedule anytime before your lesson</p>
          </div>
        </div>

        {/* Why 1-on-1 link banner */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/about')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-purple-200 text-[#4C1D95] text-xs sm:text-sm font-bold hover:bg-purple-50 transition-colors shadow-2xs"
          >
            <Sparkles size={14} className="text-[#6D28D9]" />
            <span>Why is HOURLY strictly 1-on-1? Read our philosophy & course method</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───── Interactive "Our Courses" Section with Curriculum Modal ───── */
function CoursesSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [selectedCourseKey, setSelectedCourseKey] = useState(null);

  const courseList = [
    { key: 'it', icon: Monitor, iconColor: 'text-purple-600 bg-purple-50' },
    { key: 'business', icon: Briefcase, iconColor: 'text-amber-600 bg-amber-50' },
    { key: 'ielts', icon: GraduationCap, iconColor: 'text-emerald-600 bg-emerald-50' },
    { key: 'general', icon: MessageSquare, iconColor: 'text-blue-600 bg-blue-50' },
    { key: 'interview', icon: Target, iconColor: 'text-rose-600 bg-rose-50' },
    { key: 'kids', icon: Baby, iconColor: 'text-pink-600 bg-pink-50' },
  ];

  const filteredCourses = courseList.filter((item) => {
    if (filter === 'all') return true;
    const data = COURSE_SYLLABI[item.key];
    return data && data.category === filter;
  });

  const activeModalData = selectedCourseKey ? COURSE_SYLLABI[selectedCourseKey] : null;

  return (
    <section id="courses" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div id="tracks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 mb-3 sm:mb-4 shadow-2xs">
            <Flame size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              {t('courses.badge')}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-3 sm:mb-4">
            {t('courses.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
            {t('courses.subtitle')}
          </p>
        </div>

        {/* Category Filter Pills (swipeable on mobile) */}
        <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 mb-8 sm:mb-12 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-1">
          {[
            { id: 'all', label: t('courses.filterAll') },
            { id: 'tech', label: t('courses.filterCareer') },
            { id: 'speaking', label: t('courses.filterSpeaking') },
            { id: 'exams', label: t('courses.filterExams') },
            { id: 'kids', label: t('courses.filterKids') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                filter === tab.id
                  ? 'bg-[#4C1D95] text-white shadow-md shadow-purple-900/15 scale-105'
                  : 'bg-gray-100 hover:bg-gray-200/80 text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bespoke Rich Course Cards: Swipeable Carousel on Mobile, Grid on Desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {filteredCourses.map((c) => {
            const Icon = c.icon;
            const data = COURSE_SYLLABI[c.key];
            if (!data) return null;

            return (
              <div
                key={c.key}
                className="w-[86vw] max-w-[340px] flex-shrink-0 snap-center md:w-auto md:max-w-none bg-white rounded-3xl border border-gray-200/90 hover:border-purple-300 p-6 sm:p-7 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Subtle top card gradient accent */}
                <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${data.accentColor}`} />

                <div>
                  {/* Badge & Level */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${data.badgeColor}`}>
                      {data.badge}
                    </span>
                    <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-lg">
                      {data.level}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${c.iconColor} flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-2xs`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4C1D95] transition-colors leading-snug">
                        {t(`courses.${c.key}.title`)}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">{data.duration}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 leading-relaxed mb-5">
                    {t(`courses.${c.key}.desc`)}
                  </p>

                  {/* Highlight Checklist Bullets */}
                  <div className="space-y-2 mb-6 bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Key Skills Practiced:</p>
                    {data.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-gray-700">
                        <Check size={14} className="text-[#6D28D9] flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer with Tutor info and Dual Buttons */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="flex -space-x-2 overflow-hidden">
                      {data.tutors.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt="Tutor"
                          className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {data.tutorNote}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCourseKey(c.key)}
                      className="flex-1 py-2.5 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText size={13} />
                      {t('courses.exploreSyllabus')}
                    </button>

                    <button
                      onClick={() => navigate(`/register?course=${encodeURIComponent(t(`courses.${c.key}.title`))}`)}
                      className="py-2.5 px-4 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center gap-1"
                    >
                      <span>Enroll</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-3 text-xs text-gray-400 font-medium">
          <span>← Swipe to explore tracks ({filteredCourses.length}) →</span>
        </div>

        {/* View all courses button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/courses')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-50 hover:bg-purple-100 text-[#4C1D95] text-xs sm:text-sm font-bold transition-colors"
          >
            <span>View all course syllabi & full breakdown</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Interactive Syllabus Modal */}
      {activeModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-purple-100 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedCourseKey(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 border bg-purple-50 text-[#6D28D9] border-purple-200">
              {activeModalData.badge}
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              {activeModalData.title}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Level: <strong>{activeModalData.level}</strong> · Format: <strong>{activeModalData.duration}</strong>
            </p>

            {/* Target Outcomes */}
            <div className="mb-6 bg-purple-50/60 rounded-2xl p-4 border border-purple-100">
              <p className="text-xs font-bold text-[#6D28D9] uppercase tracking-wider mb-2">Target Speaking Outcomes:</p>
              <ul className="space-y-1.5">
                {activeModalData.outcomes.map((out, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <CheckCircle2 size={14} className="text-[#6D28D9] flex-shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4-Week Module Roadmap */}
            <div className="space-y-3 mb-8">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Curriculum Roadmap (4 Modules):</p>
              {activeModalData.modules.map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-[#6D28D9] bg-purple-100 px-2 py-0.5 rounded-md font-mono">
                      {m.week}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900">{m.title}</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">{m.desc}</p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setSelectedCourseKey(null)}
                className="py-3 px-5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
              >
                {t('courses.close')}
              </button>
              <button
                onClick={() => {
                  const title = activeModalData.title;
                  setSelectedCourseKey(null);
                  navigate(`/register?course=${encodeURIComponent(title)}`);
                }}
                className="flex-1 py-3 px-6 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all shadow-md shadow-purple-900/10 flex items-center justify-center gap-2"
              >
                {t('courses.enrollNow')}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ───── Tutors Section ───── */
function TutorsSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const tutors = [
    {
      name: 'Alina Kasymova',
      role: 'Senior Tutor & Tech English Lead',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      exp: '6+',
      lessons: '1,420+',
      rating: '4.98',
      tags: ['IT & Tech', 'Mock Interviews', 'A2–C1'],
      bio: 'Bishkek-native senior coach specializing in preparing Central Asian software engineers for global remote teams.',
    },
    {
      name: 'David Miller',
      role: 'Native Speaker & IELTS Coach (UK)',
      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      exp: '8+',
      lessons: '2,150+',
      rating: '5.0',
      tags: ['IELTS 7.5+', 'Native Accent', 'Business'],
      bio: 'Cambridge CELTA certified. Has guided over 180 students into universities across the UK, USA, and Germany.',
    },
    {
      name: 'Aigerim Sultanova',
      role: 'General & Conversational Expert',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      exp: '5+',
      lessons: '980+',
      rating: '4.95',
      tags: ['Speaking Fluency', 'Zero to Fluent', 'Confidence'],
      bio: 'Energetic and encouraging tutor focused on breaking psychological speech barriers from day one.',
    },
  ];

  return (
    <section id="tutors" className="py-14 sm:py-20 lg:py-28 bg-gray-50/70 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 mb-3 sm:mb-4">
            <span className="text-xs font-semibold text-[#6D28D9] tracking-wider uppercase">
              ★ TOP 3% TUTOR SELECTION
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">
            {t('tutorsSection.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">{t('tutorsSection.subtitle')}</p>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {tutors.map((tutor) => (
            <div
              key={tutor.name}
              className="w-[85vw] max-w-[320px] flex-shrink-0 snap-center md:w-auto md:max-w-none bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-xl transition-all hover:border-purple-200 flex flex-col justify-between"
            >
              <div>
                <div className="relative mb-5">
                  <img
                    src={tutor.img}
                    alt={tutor.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm ring-2 ring-purple-100"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full shadow-xs text-xs font-bold text-amber-600 border border-amber-100">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    {tutor.rating}
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{tutor.name}</h3>
                <p className="text-xs font-medium text-[#6D28D9] mb-3">{tutor.role}</p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4">{tutor.bio}</p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {tutor.tags.map((tag) => (
                    <span key={tag} className="text-[10px] sm:text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span><strong>{tutor.exp}</strong> {t('tutorsSection.experience')}</span>
                  <span><strong>{tutor.lessons}</strong> {t('tutorsSection.lessonsGiven')}</span>
                </div>
                <button
                  onClick={() => navigate('/register')}
                  className="w-full py-2.5 px-4 rounded-full bg-gray-100 hover:bg-[#4C1D95] hover:text-white text-gray-800 text-xs sm:text-sm font-semibold transition-all"
                >
                  {t('tutorsSection.bookLesson')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-3 text-xs text-gray-400 font-medium">
          <span>← Swipe tutors ({tutors.length}) →</span>
        </div>

        {/* View all tutors button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/tutors')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-purple-300 text-gray-800 text-xs sm:text-sm font-bold transition-colors shadow-2xs"
          >
            <span>View all certified senior tutors & bios</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───── Pricing Section ───── */
function PricingSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const plans = [
    {
      key: 'plan1',
      popular: false,
      features: ['4 private 50-min lessons', 'Initial speaking assessment', 'Flexible schedule', 'Telegram/WhatsApp tutor support'],
    },
    {
      key: 'plan2',
      popular: true,
      features: ['12 private 50-min lessons', 'Personalized A1–C1 roadmap', 'Free lesson rescheduling', 'Audio feedback on homework', 'Certificate of completion'],
    },
    {
      key: 'plan3',
      popular: false,
      features: ['24 private 50-min lessons', 'IELTS/Interview simulation', 'Priority booking with Senior Tutors', 'Progress analytics dashboard', 'Full refund guarantee'],
    },
  ];

  return (
    <section id="pricing" className="py-14 sm:py-20 lg:py-28 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 sm:mb-4 tracking-tight">
            {t('pricingSection.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">{t('pricingSection.subtitle')}</p>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 items-stretch">
          {plans.map((p) => {
            const isPop = p.popular;
            return (
              <div
                key={p.key}
                className={`w-[86vw] max-w-[330px] flex-shrink-0 snap-center md:w-auto md:max-w-none relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                  isPop
                    ? 'bg-gradient-to-b from-purple-50/50 to-white border-2 border-[#6D28D9] shadow-xl md:-translate-y-2'
                    : 'bg-white border border-gray-100 shadow-sm hover:border-purple-200'
                }`}
              >
                {isPop && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#4C1D95] text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                    {t('pricingSection.popular')}
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {t(`pricingSection.${p.key}Title`)}
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    {t(`pricingSection.${p.key}Desc`)}
                  </p>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-black text-gray-900">
                      {t(`pricingSection.${p.key}Price`)}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      / {t(`pricingSection.${p.key}Lessons`)}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#6D28D9] mb-6">
                    {t(`pricingSection.${p.key}Rate`)}
                  </p>

                  <ul className="space-y-3 mb-8 pt-4 border-t border-gray-100">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-xs text-gray-600">
                        <CheckCircle2 size={15} className="text-[#6D28D9] flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3.5 rounded-full font-semibold text-sm transition-all ${
                    isPop
                      ? 'bg-[#4C1D95] hover:bg-[#5B21B6] text-white shadow-md shadow-purple-900/10'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  {t('pricingSection.getStarted')}
                </button>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint for Pricing */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-3 text-xs text-gray-400 font-medium">
          <span>← Swipe pricing plans ({plans.length}) →</span>
        </div>

        {/* View detailed pricing page button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-50 hover:bg-purple-100 text-[#4C1D95] text-xs sm:text-sm font-bold transition-colors"
          >
            <span>View detailed feature matrix & guarantees</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ───── Testimonials ───── */
function TestimonialsSection() {
  const { t } = useLanguage();

  const testimonials = [
    { key: 't1', initials: 'AM', gradient: 'from-primary-400 to-primary-600' },
    { key: 't2', initials: 'NT', gradient: 'from-amber-400 to-orange-500' },
    { key: 't3', initials: 'EK', gradient: 'from-emerald-400 to-teal-500' },
  ];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg max-w-2xl mx-auto">{t('testimonials.subtitle')}</p>
        </div>

        {/* Mobile Swipeable Carousel / Desktop Grid */}
        <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-3">
          {testimonials.map((tm) => (
            <div
              key={tm.key}
              className="w-[84vw] max-w-[320px] flex-shrink-0 snap-center md:w-auto md:max-w-none bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div>
                <Quote size={24} className="text-primary-200 mb-3" />
                <p className="text-gray-600 leading-relaxed mb-6 text-sm">
                  "{t(`testimonials.${tm.key}.text`)}"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${tm.gradient} flex items-center justify-center text-white text-xs font-bold`}>
                  {tm.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t(`testimonials.${tm.key}.name`)}</p>
                  <p className="text-xs text-gray-400">{t(`testimonials.${tm.key}.role`)}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-3 text-xs text-gray-400 font-medium">
          <span>← Swipe reviews ({testimonials.length}) →</span>
        </div>
      </div>
    </section>
  );
}

/* ───── FAQ ───── */
function FAQSection() {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const faqs = [1, 2, 3, 4, 5, 6];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-14">
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-3 sm:mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-lg max-w-2xl mx-auto">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-3">
          {faqs.map((num, idx) => {
            const isOpen = openIdx === num;
            const isHiddenOnMobile = !showAllMobile && idx >= 3;

            return (
              <div
                key={num}
                className={`bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden transition-all hover:border-primary-200 ${
                  isHiddenOnMobile ? 'hidden sm:block' : 'block'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : num)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm pr-4">
                    {t(`faq.q${num}`)}
                  </span>
                  {isOpen ? (
                    <ChevronUp size={18} className="text-primary-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 -mt-1">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {t(`faq.a${num}`)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Show More / Show Less Button */}
        {!showAllMobile && (
          <div className="mt-4 text-center sm:hidden">
            <button
              onClick={() => setShowAllMobile(true)}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition-colors"
            >
              <span>{t('courses.exploreSyllabus') || 'More questions'} ({faqs.length - 3})</span>
              <ChevronDown size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ───── CTA Section ───── */
function CTASection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Zap size={36} className="text-primary-200 mx-auto mb-4 sm:mb-6" />
        <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 sm:mb-4">
          {t('hero.cta')}
        </h2>
        <p className="text-primary-200 text-sm sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          {t('hero.subtitle')}
        </p>
        <button
          onClick={() => navigate('/register')}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-white text-primary-700 font-bold text-base sm:text-lg hover:bg-gray-50 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform"
        >
          {t('hero.cta')}
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

/* ───── Main HomePage ───── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <div id="about">
        <HowItWorksSection />
      </div>
      <CoursesSection />
      <TutorsSection />
      <PricingSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
