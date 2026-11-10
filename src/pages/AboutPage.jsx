import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Users, UserCheck, ShieldCheck, Zap, Target, Sparkles,
  ArrowRight, CheckCircle2, MessageSquare, Monitor, Briefcase,
  GraduationCap, Baby, Award, Clock, HeartHandshake, TrendingUp
} from 'lucide-react';

export default function AboutPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const comparisonPoints = [
    {
      icon: MessageSquare,
      title: t('aboutPage.talkTimeTitle'),
      desc: t('aboutPage.talkTimeDesc'),
      highlight: '70%+ Talk Time',
      highlightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      groupContrast: 'In groups: ~5% speaking time',
    },
    {
      icon: ShieldCheck,
      title: t('aboutPage.confidenceTitle'),
      desc: t('aboutPage.confidenceDesc'),
      highlight: 'Psychological Safety',
      highlightColor: 'bg-purple-50 text-[#6D28D9] border-purple-200',
      groupContrast: 'In groups: 87% fear making mistakes',
    },
    {
      icon: Target,
      title: t('aboutPage.paceTitle'),
      desc: t('aboutPage.paceDesc'),
      highlight: '100% Adaptive Pace',
      highlightColor: 'bg-blue-50 text-blue-700 border-blue-200',
      groupContrast: 'In groups: Average pace fits no one',
    },
    {
      icon: Sparkles,
      title: t('aboutPage.customTitle'),
      desc: t('aboutPage.customDesc'),
      highlight: 'Tailored to Your Job',
      highlightColor: 'bg-amber-50 text-amber-700 border-amber-200',
      groupContrast: 'In groups: Generic textbook grammar',
    },
  ];

  const courseBreakdowns = [
    {
      icon: MessageSquare,
      title: t('aboutPage.courseSpeakingTitle'),
      desc: t('aboutPage.courseSpeakingDesc'),
      whyOneOnOne: 'You speak for 35+ minutes per session, getting live feedback on sentence cadence, idioms, and natural rhythm.',
      badge: 'All Levels A1–C1',
      color: 'border-blue-100 hover:border-blue-300',
      iconBg: 'bg-blue-50 text-blue-600',
    },
    {
      icon: Monitor,
      title: t('aboutPage.courseITTitle'),
      desc: t('aboutPage.courseITDesc'),
      whyOneOnOne: 'Role-play daily standups, sprint reviews, and technical architecture walk-throughs with mentors who speak tech.',
      badge: 'Devs & PMs',
      color: 'border-purple-100 hover:border-purple-300',
      iconBg: 'bg-purple-50 text-[#6D28D9]',
    },
    {
      icon: Briefcase,
      title: t('aboutPage.courseBusinessTitle'),
      desc: t('aboutPage.courseBusinessDesc'),
      whyOneOnOne: 'Rehearse your actual pitch decks, client proposals, and negotiation scenarios under real meeting pressure.',
      badge: 'Executives & Leaders',
      color: 'border-amber-100 hover:border-amber-300',
      iconBg: 'bg-amber-50 text-amber-600',
    },
    {
      icon: GraduationCap,
      title: t('aboutPage.courseIELTSTitle'),
      desc: t('aboutPage.courseIELTSDesc'),
      whyOneOnOne: 'Simulate full examiner interviews with real-time scoring criteria: Fluency, Lexical Resource, Grammar, Pronunciation.',
      badge: 'Target 7.0–8.5',
      color: 'border-emerald-100 hover:border-emerald-300',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      icon: Target,
      title: t('aboutPage.courseInterviewTitle'),
      desc: t('aboutPage.courseInterviewDesc'),
      whyOneOnOne: 'Apply the STAR technique to your real CV. Practice tough behavioral questions until your English sounds effortless.',
      badge: 'Global Remote Roles',
      color: 'border-rose-100 hover:border-rose-300',
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      icon: Baby,
      title: t('aboutPage.courseKidsTitle'),
      desc: t('aboutPage.courseKidsDesc'),
      whyOneOnOne: 'Full dedicated attention keeps young learners actively engaged without screen fatigue or classroom distractions.',
      badge: 'Ages 7–15',
      color: 'border-pink-100 hover:border-pink-300',
      iconBg: 'bg-pink-50 text-pink-600',
    },
  ];

  const stats = [
    { num: t('aboutPage.stats1Number'), label: t('aboutPage.stats1Label') },
    { num: t('aboutPage.stats2Number'), label: t('aboutPage.stats2Label') },
    { num: t('aboutPage.stats3Number'), label: t('aboutPage.stats3Label') },
    { num: t('aboutPage.stats4Number'), label: t('aboutPage.stats4Label') },
  ];

  return (
    <div className="bg-white">
      {/* ───── Hero Section ───── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-purple-50/60 via-white to-white py-14 sm:py-20 lg:py-24 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 shadow-2xs mb-6">
            <Sparkles size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              {t('aboutPage.badge')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.15] mb-6 tracking-tight">
            {t('aboutPage.title')}
          </h1>

          <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            {t('aboutPage.subtitle')}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-semibold transition-all shadow-md shadow-purple-900/10 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('aboutPage.ctaButton')}
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-2xs"
            >
              {t('nav.courses')}
            </button>
          </div>
        </div>
      </section>

      {/* ───── Stats Grid ───── */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((st, i) => (
              <div key={i} className="text-center p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4C1D95] mb-1">
                  {st.num}
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-500 leading-snug">
                  {st.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Section: Why 1-on-1 vs Group Classes ───── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/70 text-xs font-bold text-[#6D28D9] mb-3 uppercase tracking-wider">
              {t('aboutPage.comparisonTitle')}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight mb-4">
              {t('aboutPage.comparisonSubtitle')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {comparisonPoints.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#6D28D9] flex items-center justify-center shadow-xs">
                        <Icon size={22} />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${item.highlightColor}`}>
                        {item.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 text-[11px] font-medium text-gray-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{item.groupContrast}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───── Section: How 1-on-1 Supercharges Our Courses ───── */}
      <section className="py-14 sm:py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-bold text-[#6D28D9] bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200/60 uppercase tracking-wider mb-4 inline-block">
              {t('aboutPage.coursesDeepTitle')}
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
              {t('aboutPage.coursesDeepSubtitle')}
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
              In a 1-on-1 setting, every course transforms from passive listening into active conversational training.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courseBreakdowns.map((course, idx) => {
              const Icon = course.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-3xl p-6 sm:p-8 border ${course.color} transition-all hover:shadow-lg flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-2xl ${course.iconBg} flex items-center justify-center`}>
                        <Icon size={22} />
                      </div>
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                        {course.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      {course.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-[#4C1D95] uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles size={12} /> The 1-on-1 Advantage:
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {course.whyOneOnOne}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/courses')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-colors"
            >
              <span>Explore all detailed syllabi & curriculum</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ───── Mission & Story for Kyrgyzstan ───── */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#6D28D9] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
            <HeartHandshake size={28} className="text-white" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black mb-6 tracking-tight">
            {t('aboutPage.missionTitle')}
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-purple-100 leading-relaxed mb-10 max-w-3xl mx-auto font-normal">
            <p>{t('aboutPage.missionP1')}</p>
            <p>{t('aboutPage.missionP2')}</p>
          </div>

          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#4C1D95] font-bold text-base sm:text-lg hover:bg-gray-50 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transform"
          >
            {t('aboutPage.ctaButton')}
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
