import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Check, ArrowRight, ShieldCheck, HelpCircle, Sparkles,
  Zap, Clock, RefreshCw, Award, HeartHandshake
} from 'lucide-react';

export default function PricingPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'quarterly'

  const plans = [
    {
      key: 'starter',
      price: billingCycle === 'monthly' ? '5,800' : '15,600',
      period: billingCycle === 'monthly'
        ? (language === 'kg' ? 'сом / ай' : language === 'ru' ? 'сом / мес' : 'KGS / month')
        : (language === 'kg' ? 'сом / 3 ай' : language === 'ru' ? 'сом / 3 мес' : 'KGS / 3 months'),
      lessonsCount: language === 'kg' ? '8 жеке сабак' : language === 'ru' ? '8 индивидуальных уроков' : '8 individual lessons',
      pricePerLesson: language === 'kg' ? '725 сом / сабак' : language === 'ru' ? '725 сом / урок' : '725 KGS / lesson',
      isPopular: false,
      badge: language === 'kg' ? 'Ийкемдүү старт' : language === 'ru' ? 'Гибкий старт' : 'Flexible Start',
      features: [
        language === 'kg' ? '8 жеке 1-ге-1 сабак (ар бири 50 мүнөт)' : language === 'ru' ? '8 индивидуальных занятий 1-на-1 (по 50 мин)' : '8 private 1-on-1 sessions (50 min each)',
        language === 'kg' ? 'Жеке диагностика жана CEFR деңгээл картасы' : language === 'ru' ? 'Персональная диагностика и карта уровня CEFR' : 'Personalized diagnostic & CEFR roadmap',
        language === 'kg' ? 'Тажрыйбалуу мугалимди так тандоо' : language === 'ru' ? 'Точный подбор сертифицированного преподавателя' : 'Certified senior tutor matching',
        language === 'kg' ? 'Онлайн студия жана интерактивдүү конспект' : language === 'ru' ? 'Онлайн-студия и интерактивные конспекты' : 'Digital classroom studio & shared notes',
        language === 'kg' ? 'Сабакты 4 саат мурун акысыз жылдыруу' : language === 'ru' ? 'Бесплатный перенос урока за 4 часа' : 'Free lesson rescheduling (4h notice)',
      ],
    },
    {
      key: 'pro',
      price: billingCycle === 'monthly' ? '8,200' : '22,100',
      period: billingCycle === 'monthly'
        ? (language === 'kg' ? 'сом / ай' : language === 'ru' ? 'сом / мес' : 'KGS / month')
        : (language === 'kg' ? 'сом / 3 ай' : language === 'ru' ? 'сом / 3 мес' : 'KGS / 3 months'),
      lessonsCount: language === 'kg' ? '12 жеке сабак' : language === 'ru' ? '12 индивидуальных уроков' : '12 individual lessons',
      pricePerLesson: language === 'kg' ? '683 сом / сабак' : language === 'ru' ? '683 сом / урок' : '683 KGS / lesson',
      isPopular: true,
      badge: language === 'kg' ? '⭐ Эң популярдуу' : language === 'ru' ? '⭐ Самый популярный' : '⭐ Most Popular',
      features: [
        language === 'kg' ? '12 жеке 1-ге-1 сабак (ар бири 50 мүнөт)' : language === 'ru' ? '12 индивидуальных занятий 1-на-1 (по 50 мин)' : '12 private 1-on-1 sessions (50 min each)',
        language === 'kg' ? 'Ыңгайлуу кечки сааттарды биринчи тандоо' : language === 'ru' ? 'Приоритет выбора вечерних прайм-слотов' : 'Priority scheduling & peak evening slots',
        language === 'kg' ? 'Ай сайын расмий CEFR прогресс отчету' : language === 'ru' ? 'Ежемесячный официальный отчет прогресса CEFR' : 'Official CEFR monthly milestone report',
        language === 'kg' ? 'Сүйлөө аудиосун талдоо жана акцентти оңдоо' : language === 'ru' ? 'Разбор аудиозаписей речи и постановка акцента' : 'Speech recording review & accent tuning',
        language === 'kg' ? 'Мугалимди каалаган убакта акысыз алмаштыруу' : language === 'ru' ? '100% гарантия замены преподавателя в любой момент' : '100% Tutor Fit guarantee (swap anytime)',
        language === 'kg' ? 'Үй тапшырмаларын талдоо жана сөздүк топтомдору' : language === 'ru' ? 'Проверка заданий и персональные наборы карточек' : 'Homework review & vocabulary flashcard sets',
      ],
    },
    {
      key: 'intensive',
      price: billingCycle === 'monthly' ? '13,000' : '35,100',
      period: billingCycle === 'monthly'
        ? (language === 'kg' ? 'сом / ай' : language === 'ru' ? 'сом / мес' : 'KGS / month')
        : (language === 'kg' ? 'сом / 3 ай' : language === 'ru' ? 'сом / 3 мес' : 'KGS / 3 months'),
      lessonsCount: language === 'kg' ? '20 жеке сабак' : language === 'ru' ? '20 индивидуальных уроков' : '20 individual lessons',
      pricePerLesson: language === 'kg' ? '650 сом / сабак' : language === 'ru' ? '650 сом / урок' : '650 KGS / lesson',
      isPopular: false,
      badge: language === 'kg' ? 'Тездетилген карьера' : language === 'ru' ? 'Интенсив для карьеры' : 'Fast-Track Career',
      features: [
        language === 'kg' ? '20 жеке 1-ге-1 сабак (ар бири 50 мүнөт)' : language === 'ru' ? '20 индивидуальных занятий 1-на-1 (по 50 мин)' : '20 private 1-on-1 sessions (50 min each)',
        language === 'kg' ? 'IELTS жана IT интервьюларга сыноо машыгуулары' : language === 'ru' ? 'Пробные симуляции IELTS и собеседований в IT' : 'IELTS & Tech Interview mock simulations',
        language === 'kg' ? 'Жеке насаатчы менен түз Telegram байланышы' : language === 'ru' ? 'Прямой контакт с ведущим ментором в Telegram' : 'Direct Telegram contact with senior mentor',
        language === 'kg' ? 'Резюме жана LinkedIn профилин англисче талдоо' : language === 'ru' ? 'Аудит резюме и LinkedIn-профиля на английском' : 'Resume & LinkedIn English profile review',
        language === 'kg' ? 'HOURLY расмий CEFR аяктоо сертификаты' : language === 'ru' ? 'Официальный сертификат об окончании CEFR' : 'Verified HOURLY CEFR Completion Certificate',
        language === 'kg' ? 'Чектөөсүз жылдыруу жана абонементти тоңдуруу' : language === 'ru' ? 'Безлимитные переносы и заморозка абонемента' : 'Unlimited lesson rescheduling & pauses',
      ],
    },
  ];

  const comparisonTable = [
    {
      feature: t('pricingPage.formatLabel'),
      starter: t('pricingPage.formatValue'),
      pro: t('pricingPage.formatValue'),
      intensive: t('pricingPage.formatValue')
    },
    {
      feature: t('pricingPage.durationLabel'),
      starter: t('pricingPage.durationValue'),
      pro: t('pricingPage.durationValue'),
      intensive: t('pricingPage.durationValue')
    },
    {
      feature: t('pricingPage.speakingTimeLabel'),
      starter: '70%+',
      pro: '70%+',
      intensive: '70%+'
    },
    {
      feature: t('pricingPage.scheduleFlexLabel'),
      starter: t('pricingPage.scheduleFlexStarter'),
      pro: t('pricingPage.scheduleFlexPro'),
      intensive: t('pricingPage.scheduleFlexIntensive')
    },
    {
      feature: t('pricingPage.tutorGuaranteeLabel'),
      starter: t('pricingPage.included'),
      pro: t('pricingPage.includedInstant'),
      intensive: t('pricingPage.includedInstant')
    },
    {
      feature: t('pricingPage.mockLabel'),
      starter: t('pricingPage.mockStarter'),
      pro: t('pricingPage.mockPro'),
      intensive: t('pricingPage.mockIntensive')
    },
    {
      feature: t('pricingPage.cefrCertLabel'),
      starter: '—',
      pro: t('pricingPage.cefrPro'),
      intensive: t('pricingPage.cefrIntensive')
    },
  ];

  return (
    <div className="bg-white">
      {/* ───── Hero Header ───── */}
      <section className="bg-gradient-to-b from-purple-50/60 via-white to-white py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 mb-4 shadow-2xs">
            <Sparkles size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              {t('pricingSection.badge')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {t('pricingSection.title')}
          </h1>

          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {t('pricingSection.subtitle')}
          </p>

          {/* Billing Cycle Switch */}
          <div className="inline-flex items-center p-1 rounded-full bg-gray-100 border border-gray-200">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {t('common.monthlyBilling')}
            </button>
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingCycle === 'quarterly'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <span>{t('common.months3')}</span>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {t('common.save10')}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* ───── Plan Cards ───── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-white border-2 border-[#6D28D9] shadow-xl md:-translate-y-2'
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#6D28D9] text-white text-[11px] font-bold tracking-wide shadow-sm">
                  {plan.badge}
                </div>
              )}

              <div>
                {!plan.isPopular && (
                  <span className="inline-block text-[11px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full mb-3">
                    {plan.badge}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1 capitalize">
                  {t(`pricingSection.${plan.key}.name`)}
                </h3>
                <p className="text-xs text-gray-500 mb-5">
                  {plan.lessonsCount} · {plan.pricePerLesson}
                </p>

                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-xs font-semibold text-gray-500">{plan.period}</span>
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100 mb-8">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-600">
                      <Check size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate('/register')}
                className={`w-full py-3.5 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  plan.isPopular
                    ? 'bg-[#4C1D95] hover:bg-[#5B21B6] text-white shadow-md shadow-purple-900/10'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                <span>{t('pricingSection.getStarted')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Feature Comparison Matrix ───── */}
      <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
              {t('pricingPage.detailedComparison')}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {t('pricingPage.allPlansInclude')}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/70 text-gray-700 font-bold">
                    <th className="py-4 px-6">{t('pricingPage.feature')}</th>
                    <th className="py-4 px-4 text-center">{t('pricingSection.starter.name')}</th>
                    <th className="py-4 px-4 text-center text-[#6D28D9]">{t('pricingSection.pro.name')}</th>
                    <th className="py-4 px-4 text-center">{t('pricingSection.intensive.name')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-3.5 px-6 font-medium text-gray-900">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center">{row.starter}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-[#6D28D9]">{row.pro}</td>
                      <td className="py-3.5 px-4 text-center font-semibold text-gray-900">{row.intensive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ───── Guarantees & Payment FAQ ───── */}
      <section className="py-14 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="p-8 rounded-3xl bg-purple-50/80 border border-purple-100">
            <ShieldCheck size={36} className="text-[#6D28D9] mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('pricingPage.tutorFitTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              {t('pricingPage.tutorFitDesc')}
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#6D28D9]">
              <HeartHandshake size={16} />
              <span>{t('pricingPage.tutorFitNote')}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
              <h4 className="font-bold text-sm text-gray-900 mb-1">{t('pricingPage.faqQ1')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t('pricingPage.faqA1')}</p>
            </div>
            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
              <h4 className="font-bold text-sm text-gray-900 mb-1">{t('pricingPage.faqQ2')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t('pricingPage.faqA2')}</p>
            </div>
            <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50">
              <h4 className="font-bold text-sm text-gray-900 mb-1">{t('pricingPage.faqQ3')}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t('pricingPage.faqA3')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
