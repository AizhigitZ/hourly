import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  CheckCircle2, ArrowRight, Users,
  Headphones, ChevronDown, ChevronUp, Star, Quote, Calendar, Zap,
  Sparkles, Award, Target, Volume2, Video
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
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
