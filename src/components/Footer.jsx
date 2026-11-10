import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { MapPin, Mail, Send, MessageCircle } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const programs = [
    { label: t('footer.programs.general'), to: '/courses' },
    { label: t('footer.programs.business'), to: '/courses' },
    { label: t('footer.programs.ielts'), to: '/courses' },
    { label: t('footer.programs.it'), to: '/courses' },
    { label: t('footer.programs.interview'), to: '/courses' },
  ];
  const platform = [
    { label: t('footer.platform.why'), to: '/about' },
    { label: t('footer.platform.tutor'), to: '/tutors' },
    { label: t('footer.platform.pricing'), to: '/pricing' },
    { label: t('footer.platform.schedule'), to: '/about' },
    { label: t('footer.platform.reviews'), to: '/' },
  ];
  const legal = [
    t('footer.legal.terms'),
    t('footer.legal.privacy'),
    t('footer.legal.refund'),
    t('footer.legal.quality'),
    t('footer.legal.support'),
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1 space-y-3.5 mb-2 md:mb-0">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="text-xl font-black text-[#4C1D95] tracking-tight group-hover:opacity-90">HOURLY</span>
              <span className="text-[10px] font-extrabold text-[#6D28D9] bg-purple-100/90 px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                SCHOOL
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#6D28D9] flex-shrink-0" />
                <span>{t('footer.location')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#6D28D9] flex-shrink-0" />
                <span>hello@hourly.kg</span>
              </div>
            </div>
            <div className="flex gap-2.5 pt-1">
              <a href="https://t.me" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:border-purple-300 hover:text-[#4C1D95] transition-colors bg-white shadow-2xs">
                <Send size={12} className="text-[#6D28D9]" /> Telegram
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:border-emerald-300 hover:text-emerald-700 transition-colors bg-white shadow-2xs">
                <MessageCircle size={13} className="text-emerald-500" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">{t('footer.programsTitle')}</h3>
            <ul className="space-y-2.5">
              {programs.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="text-xs sm:text-sm text-gray-500 hover:text-[#6D28D9] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">{t('footer.platformTitle')}</h3>
            <ul className="space-y-2.5">
              {platform.map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="text-xs sm:text-sm text-gray-500 hover:text-[#6D28D9] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-4">{t('footer.legalTitle')}</h3>
            <ul className="space-y-2.5">
              {legal.map((item, i) => (
                <li key={i}>
                  <span className="text-xs sm:text-sm text-gray-400">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            © 2025 HOURLY English Education. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/admin"
              className="text-gray-400 hover:text-[#4C1D95] font-medium transition-colors"
            >
              Admin Portal
            </Link>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {t('footer.online')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
