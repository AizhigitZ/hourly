import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Flame, Award, ArrowRight, BookOpen, X, Check, ChevronRight
} from 'lucide-react';

const CATEGORY_COLORS = {
  tech: 'text-purple-600 bg-purple-50',
  business: 'text-amber-600 bg-amber-50',
  ielts: 'text-emerald-600 bg-emerald-50',
  general: 'text-blue-600 bg-blue-50',
  interview: 'text-rose-600 bg-rose-50',
  kids: 'text-pink-600 bg-pink-50',
};

export default function CoursesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('hourly_courses');
    if (stored) {
      try { setCourses(JSON.parse(stored)); } catch {}
    }
  }, []);

  const filteredCourses = filter === 'all'
    ? courses
    : courses.filter((c) => c.category === filter);

  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-purple-50/50 to-white py-14 sm:py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-purple-200 mb-4 shadow-2xs">
            <Flame size={14} className="text-[#6D28D9]" />
            <span className="text-xs font-bold text-[#6D28D9] tracking-wider uppercase">
              {t('courses.badge')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {t('courses.title')}
          </h1>

          <p className="text-gray-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            {t('courses.subtitle')}
          </p>

          {/* Filter Pills */}
          <div className="flex sm:flex-wrap items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-2">
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

      {/* Courses Grid */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-4 text-purple-200" />
            <p className="text-lg font-semibold text-gray-500">No courses available yet.</p>
            <p className="text-sm mt-1">New courses will be added soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => {
              const colorClass = CATEGORY_COLORS[course.category] || 'text-gray-600 bg-gray-100';
              return (
                <div
                  key={course.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-purple-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${colorClass} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                        <BookOpen size={24} />
                      </div>
                      {course.level && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
                          {course.level}
                        </span>
                      )}
                    </div>

                    {course.badge && (
                      <span className="inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-md border mb-3 bg-purple-100 text-[#6D28D9] border-purple-200">
                        {course.badge}
                      </span>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#4C1D95] transition-colors mb-2">
                      {course.title}
                    </h3>

                    {course.duration && (
                      <p className="text-xs text-gray-400 font-medium mb-3">{course.duration}</p>
                    )}

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{course.description}</p>

                    {course.highlights && course.highlights.length > 0 && (
                      <div className="space-y-1.5 mb-4 bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Key Skills:</p>
                        {course.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-gray-700">
                            <Check size={14} className="text-[#6D28D9] flex-shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    {course.modules && course.modules.length > 0 && (
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="flex-1 py-2.5 px-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ChevronRight size={13} />
                        View Syllabus
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/register?course=${encodeURIComponent(course.title)}`)}
                      className="flex-1 py-2.5 px-4 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-1"
                    >
                      <span>{t('courses.enrollNow')}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Level Assessment Banner */}
      <section className="bg-gray-50 py-12 sm:py-16 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award size={36} className="text-[#6D28D9] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            {t('coursesPage.notSureLevel')}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xl mx-auto leading-relaxed">
            {t('coursesPage.diagnosticDesc')}
          </p>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-semibold text-sm transition-all shadow-md shadow-purple-900/10"
          >
            <span>{t('coursesPage.bookDiagnostic')}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* Syllabus Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                {selectedCourse.badge && (
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border mb-1 bg-purple-100 text-[#6D28D9] border-purple-200">
                    {selectedCourse.badge}
                  </span>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">{selectedCourse.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedCourse.modules && selectedCourse.modules.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Curriculum Breakdown
                  </h4>
                  <div className="space-y-3">
                    {selectedCourse.modules.map((mod, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <span className="text-[10px] font-mono font-bold text-[#6D28D9] uppercase tracking-wider">Module {i + 1}</span>
                        <h5 className="font-bold text-sm text-gray-900 mb-1">{mod.title}</h5>
                        {mod.desc && <p className="text-xs text-gray-600 leading-relaxed">{mod.desc}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 sm:p-6 flex items-center gap-3">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                {t('courses.close')}
              </button>
              <button
                onClick={() => {
                  navigate(`/register?course=${encodeURIComponent(selectedCourse.title)}`);
                  setSelectedCourse(null);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-xs sm:text-sm font-bold shadow-md"
              >
                <span>{t('courses.enrollNow')}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
