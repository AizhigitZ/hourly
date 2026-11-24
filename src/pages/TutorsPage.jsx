import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Star, ArrowRight, ShieldCheck
} from 'lucide-react';

export default function TutorsPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('hourly_tutors');
    if (stored) {
      try { setTutors(JSON.parse(stored)); } catch {}
    }
  }, []);

  const categories = ['all', 'tech', 'business', 'ielts', 'general', 'kids'];

  const filteredTutors = filter === 'all'
    ? tutors
    : tutors.filter((t) => t.category === filter);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-purple-50/50 to-white py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 mb-4 shadow-2xs">
            <Star size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              ★ TOP 3% TUTOR SELECTION
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {t('tutorsPage.title')}
          </h1>

          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {t('tutorsPage.subtitle')}
          </p>

          {/* Category Filter */}
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  filter === cat
                    ? 'bg-[#4C1D95] text-white shadow-md scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-200'
                }`}
              >
                {cat === 'all' ? t('courses.filterAll') : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutors Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredTutors.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ShieldCheck size={48} className="mx-auto mb-4 text-purple-200" />
            <p className="text-lg font-semibold text-gray-500">No tutors available yet.</p>
            <p className="text-sm mt-1">Check back soon — our team is growing!</p>
          </div>
        ) : (
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
                      {tutor.photo ? (
                        <img
                          src={tutor.photo}
                          alt={tutor.name}
                          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-100"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl font-bold text-[#6D28D9]">
                          {tutor.name ? tutor.name[0] : '?'}
                        </div>
                      )}
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#4C1D95] transition-colors">
                        {tutor.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#6D28D9] mb-1">
                        {tutor.role}
                      </p>
                      {tutor.rating && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Star size={13} className="text-amber-400 fill-amber-400" />
                          <span className="font-bold text-gray-900">{tutor.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {tutor.badge && (
                    <div className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 mb-3">
                      {tutor.badge}
                    </div>
                  )}

                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {tutor.bio}
                  </p>

                  {tutor.specialties && tutor.specialties.length > 0 && (
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
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/register?tutor=${encodeURIComponent(tutor.name)}`)}
                  className="w-full py-3 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Book with {tutor.name.split(' ')[0]}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Matching Guarantee Banner */}
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
