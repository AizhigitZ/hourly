import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const langLabels = { en: 'EN', ru: 'RU', kg: 'KG' };

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: t('nav.courses'), to: '/courses' },
    { label: t('nav.pricing'), to: '/pricing' },
    { label: t('nav.tutors'), to: '/tutors' },
    { label: t('nav.about'), to: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 group">
            <span className="text-2xl font-black text-[#4C1D95] tracking-tight group-hover:opacity-90 transition-opacity">
              HOURLY
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm transition-all ${
                    isActive
                      ? 'text-[#4C1D95] font-bold border-b-2 border-[#4C1D95] pb-0.5'
                      : 'font-medium text-gray-600 hover:text-[#4C1D95]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-purple-300 transition-colors bg-white shadow-2xs"
              >
                <Globe size={16} className="text-gray-500" />
                <span>{langLabels[language]}</span>
                <ChevronDown size={14} className={`text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50 animate-fade-in">
                  {Object.entries(langLabels).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => { setLanguage(code); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors ${
                        language === code ? 'text-[#6D28D9] font-bold bg-purple-50' : 'text-gray-700'
                      }`}
                    >
                      {label === 'EN' ? 'English' : label === 'RU' ? 'Русский' : 'Кыргызча'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Register Button */}
            <button
              onClick={() => navigate('/register')}
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-sm font-semibold transition-all shadow-xs hover:shadow-sm"
            >
              {t('nav.register')}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-2 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`block text-sm py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-purple-50 text-[#4C1D95] font-bold'
                    : 'font-medium text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => { navigate('/register'); setMobileOpen(false); }}
              className="w-full py-2.5 rounded-full bg-[#4C1D95] text-white text-sm font-semibold hover:bg-[#5B21B6] transition-colors shadow-xs"
            >
              {t('nav.register')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
