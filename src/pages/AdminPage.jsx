import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Lock, LogOut, RefreshCw, Search, Users, Clock, Phone, CheckCircle2,
  XCircle, ChevronDown, Trash2, Eye, Globe, ChevronLeft, ChevronRight,
  Plus, User, BookOpen as BookOpenIcon, Image
} from 'lucide-react';

const STATUS_CONFIG = {
  pending: { color: 'bg-amber-100 text-amber-700', icon: Clock },
  contacted: { color: 'bg-blue-100 text-blue-700', icon: Phone },
  enrolled: { color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  rejected: { color: 'bg-red-100 text-red-700', icon: XCircle },
};

/* ───── Login Form ───── */
function AdminLogin({ onLogin }) {
  const { t, language, setLanguage } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data.token);
      } else if (res.status === 401) {
        setError(t('admin.loginError'));
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Server error (${res.status}). Please try again.`);
      }
    } catch (err) {
      console.warn('Backend server unreachable during login:', err);
      // Resilient fallback: if server is unreachable and password matches default, log admin in
      if (password === 'hourly2005UCA') {
        const fallbackToken = btoa(`admin:${Date.now()}`);
        onLogin(fallbackToken);
      } else {
        setError(t('admin.loginError'));
      }
    } finally {
      setLoading(false);
    }
  };

  const langLabels = { en: 'EN', ru: 'RU', kg: 'KG' };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 flex gap-1">
        {Object.entries(langLabels).map(([code, label]) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              language === code ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
            <Lock size={24} className="text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('admin.loginTitle')}</h1>
          <p className="text-sm text-gray-500">{t('admin.loginSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t('admin.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('admin.passwordPlaceholder')}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 disabled:opacity-60 transition-all"
          >
            {loading ? (
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <Lock size={16} />
            )}
            {t('admin.login')}
          </button>

        </form>
      </div>
    </div>
  );
}

/* ───── Dashboard ───── */
function AdminDashboard({ token, onLogout }) {
  const { t, language, setLanguage } = useLanguage();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState('registrations');

  // ── Teachers state ──
  const [teachers, setTeachers] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hourly_tutors') || '[]'); } catch { return []; }
  });
  const [teacherForm, setTeacherForm] = useState({
    name: '', role: '', bio: '', badge: '', rating: '', category: 'general', photo: '', specialties: ''
  });
  const [teacherPhotoPreview, setTeacherPhotoPreview] = useState('');

  // ── Courses state ──
  const [courses, setCourses] = useState(() => {
    try { return JSON.parse(localStorage.getItem('hourly_courses') || '[]'); } catch { return []; }
  });
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', category: 'general', level: '', duration: '', badge: '',
    highlights: '', modules: ''
  });

  const PAGE_SIZE = 10;
  const langLabels = { en: 'EN', ru: 'RU', kg: 'KG' };

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page, limit: PAGE_SIZE });
      if (search) params.set('search', search);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      const res = await fetch(`/api/admin/registrations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) { onLogout(); return; }
      if (!res.ok) throw new Error('Server error');
      const data = await res.json();
      setRegistrations(data.registrations || []);
      setTotalPages(data.totalPages || 1);
    } catch {
      setError('Could not load registrations. The backend may be offline.');
      // Fallback to cache
      try {
        const cached = localStorage.getItem('hourly_registrations_cache');
        const offline = JSON.parse(localStorage.getItem('hourly_offline_registrations') || '[]');
        if (cached) {
          const parsed = JSON.parse(cached);
          const existingIds = new Set(parsed.map((r) => r.id));
          setRegistrations([...offline.filter((r) => !existingIds.has(r.id)), ...parsed]);
        } else if (offline.length > 0) {
          setRegistrations(offline);
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  }, [token, page, search, statusFilter, onLogout]);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  const updateStatus = async (id, status) => {
    setRegistrations((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
    } catch {}
  };

  const deleteRegistration = async (id) => {
    if (!window.confirm('Delete this registration?')) return;
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
    try {
      const offline = JSON.parse(localStorage.getItem('hourly_offline_registrations') || '[]');
      localStorage.setItem('hourly_offline_registrations', JSON.stringify(offline.filter((r) => r.id !== id)));
    } catch {}
    try {
      await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  };

  // ── Teacher helpers ──
  const handleTeacherPhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setTeacherPhotoPreview(ev.target.result);
      setTeacherForm((f) => ({ ...f, photo: ev.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveTeacher = () => {
    if (!teacherForm.name.trim()) return;
    const newTeacher = {
      id: Date.now().toString(),
      ...teacherForm,
      specialties: teacherForm.specialties.split(',').map((s) => s.trim()).filter(Boolean),
    };
    const updated = [...teachers, newTeacher];
    setTeachers(updated);
    localStorage.setItem('hourly_tutors', JSON.stringify(updated));
    setTeacherForm({ name: '', role: '', bio: '', badge: '', rating: '', category: 'general', photo: '', specialties: '' });
    setTeacherPhotoPreview('');
  };

  const deleteTeacher = (id) => {
    if (!window.confirm('Remove this teacher?')) return;
    const updated = teachers.filter((t) => t.id !== id);
    setTeachers(updated);
    localStorage.setItem('hourly_tutors', JSON.stringify(updated));
  };

  // ── Course helpers ──
  const saveCourse = () => {
    if (!courseForm.title.trim()) return;
    const newCourse = {
      id: Date.now().toString(),
      ...courseForm,
      highlights: courseForm.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
      modules: courseForm.modules.split('\n').map((s) => s.trim()).filter(Boolean).map((title) => ({ title })),
    };
    const updated = [...courses, newCourse];
    setCourses(updated);
    localStorage.setItem('hourly_courses', JSON.stringify(updated));
    setCourseForm({ title: '', description: '', category: 'general', level: '', duration: '', badge: '', highlights: '', modules: '' });
  };

  const deleteCourse = (id) => {
    if (!window.confirm('Remove this course?')) return;
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    localStorage.setItem('hourly_courses', JSON.stringify(updated));
  };

  const tabs = [
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'teachers', label: 'Teachers', icon: User },
    { id: 'courses', label: 'Courses', icon: BookOpenIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <span className="text-lg font-black text-[#4C1D95]">HOURLY</span>
              <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Admin</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex gap-1">
                {Object.entries(langLabels).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      language === code ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut size={14} />
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 pb-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-[#4C1D95] border-[#4C1D95] bg-purple-50/50'
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={15} />
                {tab.label}
                {tab.id === 'registrations' && registrations.length > 0 && (
                  <span className="bg-[#4C1D95] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {registrations.length}
                  </span>
                )}
                {tab.id === 'teachers' && (
                  <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {teachers.length}
                  </span>
                )}
                {tab.id === 'courses' && (
                  <span className="bg-gray-200 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {courses.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── REGISTRATIONS TAB ── */}
        {activeTab === 'registrations' && (
          <div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t('admin.searchPlaceholder') || t('admin.search')}
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'contacted', 'enrolled', 'rejected'].map((s) => (
                  <button
                    key={s}
                    onClick={() => { setStatusFilter(s); setPage(1); }}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      statusFilter === s
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {s === 'all' ? t('admin.filterAll') || 'All' : t(`admin.status${s.charAt(0).toUpperCase() + s.slice(1)}`)}
                  </button>
                ))}
              </div>
              <button
                onClick={fetchRegistrations}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                {t('admin.refresh')}
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {Object.entries(STATUS_CONFIG).map(([status, cfg]) => {
                const count = registrations.filter((r) => r.status === status).length;
                const Icon = cfg.icon;
                return (
                  <div key={status} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-2xs">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={14} className={cfg.color.split(' ')[1]} />
                      <span className="text-xs font-medium text-gray-500 capitalize">{t(`admin.status${status.charAt(0).toUpperCase() + status.slice(1)}`)}</span>
                    </div>
                    <p className="text-2xl font-black text-gray-900">{count}</p>
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                ⚠️ {error}
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <svg className="animate-spin h-8 w-8 text-primary-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : registrations.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">{t('admin.noRegistrations')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((reg) => {
                  const sc = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
                  const Icon = sc.icon;
                  const isExpanded = expandedId === reg.id;
                  return (
                    <div key={reg.id} className="bg-white rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
                      <div
                        className="flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                        onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                      >
                        <div className="w-9 h-9 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {reg.name ? reg.name[0].toUpperCase() : '?'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">{reg.name}</p>
                          <p className="text-xs text-gray-500 truncate">{reg.phone} · {reg.course}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${sc.color}`}>
                            <Icon size={12} />
                            {t(`admin.status${reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}`)}
                          </span>
                          <span className="text-xs text-gray-400 hidden sm:block">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-gray-100 p-5 bg-gray-50">
                          <div className="grid sm:grid-cols-2 gap-4 mb-5 text-sm">
                            <div>
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('register.name')}</span>
                              <p className="font-medium text-gray-900">{reg.name}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('register.phone')}</span>
                              <p className="font-medium text-gray-900">{reg.phone}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('register.contact')}</span>
                              <p className="font-medium text-gray-900 capitalize">{reg.contactMethod}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('register.level')}</span>
                              <p className="font-medium text-gray-900 capitalize">{reg.level}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('register.course')}</span>
                              <p className="font-medium text-gray-900 capitalize">{reg.course}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('admin.date')}</span>
                              <p className="font-medium text-gray-900">{new Date(reg.createdAt).toLocaleString()}</p>
                            </div>
                          </div>

                          {reg.message && (
                            <div className="mb-5 text-sm">
                              <span className="text-gray-400 text-xs uppercase tracking-wider">{t('register.message')}</span>
                              <p className="font-medium text-gray-700 mt-1 bg-white rounded-xl p-3 border border-gray-100">
                                {reg.message}
                              </p>
                            </div>
                          )}

                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-gray-400 mr-2">{t('admin.updateStatus')}:</span>
                            {['pending', 'contacted', 'enrolled', 'rejected'].map((s) => {
                              const sc2 = STATUS_CONFIG[s];
                              return (
                                <button
                                  key={s}
                                  onClick={() => updateStatus(reg.id, s)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    reg.status === s
                                      ? sc2.color + ' ring-2 ring-offset-1 ring-current'
                                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                  }`}
                                >
                                  {t(`admin.status${s.charAt(0).toUpperCase() + s.slice(1)}`)}
                                </button>
                              );
                            })}
                            <button
                              onClick={() => deleteRegistration(reg.id)}
                              className="ml-auto inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={12} />
                              {t('admin.delete')}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  {t('admin.page') || 'Page'} {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── TEACHERS TAB ── */}
        {activeTab === 'teachers' && (
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Teacher Form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <User size={18} className="text-[#6D28D9]" />
                  Add New Teacher
                </h2>
                <div className="space-y-4">
                  {/* Photo upload */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Photo</label>
                    <div className="flex items-center gap-4">
                      {teacherPhotoPreview ? (
                        <img src={teacherPhotoPreview} alt="Preview" className="w-16 h-16 rounded-2xl object-cover ring-2 ring-purple-100" />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                          <Image size={24} />
                        </div>
                      )}
                      <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <Image size={14} />
                        Upload Photo
                        <input type="file" accept="image/*" className="hidden" onChange={handleTeacherPhotoChange} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        value={teacherForm.name}
                        onChange={(e) => setTeacherForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Alina Kasymova"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Role / Title</label>
                      <input
                        type="text"
                        value={teacherForm.role}
                        onChange={(e) => setTeacherForm((f) => ({ ...f, role: e.target.value }))}
                        placeholder="e.g. Senior IT Coach"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">About (Bio)</label>
                    <textarea
                      value={teacherForm.bio}
                      onChange={(e) => setTeacherForm((f) => ({ ...f, bio: e.target.value }))}
                      placeholder="Short bio about the teacher..."
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Badge / Certification</label>
                      <input
                        type="text"
                        value={teacherForm.badge}
                        onChange={(e) => setTeacherForm((f) => ({ ...f, badge: e.target.value }))}
                        placeholder="e.g. ⭐ Cambridge CELTA"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Rating (e.g. 4.98)</label>
                      <input
                        type="text"
                        value={teacherForm.rating}
                        onChange={(e) => setTeacherForm((f) => ({ ...f, rating: e.target.value }))}
                        placeholder="4.98"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                    <select
                      value={teacherForm.category}
                      onChange={(e) => setTeacherForm((f) => ({ ...f, category: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                    >
                      {['general', 'tech', 'business', 'ielts', 'kids'].map((cat) => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Specialties (comma-separated)</label>
                    <input
                      type="text"
                      value={teacherForm.specialties}
                      onChange={(e) => setTeacherForm((f) => ({ ...f, specialties: e.target.value }))}
                      placeholder="e.g. IELTS, Business, Tech English"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <button
                    onClick={saveTeacher}
                    disabled={!teacherForm.name.trim()}
                    className="w-full py-3 rounded-xl bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-sm font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add Teacher
                  </button>
                </div>
              </div>

              {/* Teacher List */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Teachers ({teachers.length})
                </h2>
                {teachers.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
                    <User size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No teachers added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teachers.map((teacher) => (
                      <div key={teacher.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 shadow-2xs">
                        {teacher.photo ? (
                          <img src={teacher.photo} alt={teacher.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-lg font-bold text-[#6D28D9] flex-shrink-0">
                            {teacher.name ? teacher.name[0] : '?'}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{teacher.name}</p>
                          <p className="text-xs text-gray-500">{teacher.role}</p>
                          {teacher.rating && (
                            <p className="text-xs text-amber-600 font-semibold">★ {teacher.rating}</p>
                          )}
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200 uppercase">
                          {teacher.category}
                        </span>
                        <button
                          onClick={() => deleteTeacher(teacher.id)}
                          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── COURSES TAB ── */}
        {activeTab === 'courses' && (
          <div>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Add Course Form */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <BookOpenIcon size={18} className="text-[#6D28D9]" />
                  Add New Course
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Course Title *</label>
                    <input
                      type="text"
                      value={courseForm.title}
                      onChange={(e) => setCourseForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="e.g. IT & Tech English"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                    <textarea
                      value={courseForm.description}
                      onChange={(e) => setCourseForm((f) => ({ ...f, description: e.target.value }))}
                      placeholder="Brief course description..."
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Category</label>
                      <select
                        value={courseForm.category}
                        onChange={(e) => setCourseForm((f) => ({ ...f, category: e.target.value }))}
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
                      >
                        {['general', 'tech', 'business', 'ielts', 'kids', 'interview'].map((cat) => (
                          <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Level</label>
                      <input
                        type="text"
                        value={courseForm.level}
                        onChange={(e) => setCourseForm((f) => ({ ...f, level: e.target.value }))}
                        placeholder="e.g. A2 – C1"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Duration</label>
                      <input
                        type="text"
                        value={courseForm.duration}
                        onChange={(e) => setCourseForm((f) => ({ ...f, duration: e.target.value }))}
                        placeholder="e.g. 50 min / lesson"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1.5">Badge</label>
                      <input
                        type="text"
                        value={courseForm.badge}
                        onChange={(e) => setCourseForm((f) => ({ ...f, badge: e.target.value }))}
                        placeholder="e.g. 🔥 High Demand"
                        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Key Highlights (one per line)</label>
                    <textarea
                      value={courseForm.highlights}
                      onChange={(e) => setCourseForm((f) => ({ ...f, highlights: e.target.value }))}
                      placeholder={"e.g.\nAgile Standup Fluency\nSalary Negotiation\nTech Vocabulary"}
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Modules (one title per line)</label>
                    <textarea
                      value={courseForm.modules}
                      onChange={(e) => setCourseForm((f) => ({ ...f, modules: e.target.value }))}
                      placeholder={"e.g.\nAgile Ceremonies & Standup\nSystem Design Discussions\nMock Technical Interviews\nOffer Negotiations"}
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none font-mono"
                    />
                  </div>

                  <button
                    onClick={saveCourse}
                    disabled={!courseForm.title.trim()}
                    className="w-full py-3 rounded-xl bg-[#4C1D95] hover:bg-[#5B21B6] text-white text-sm font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    Add Course
                  </button>
                </div>
              </div>

              {/* Course List */}
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Courses ({courses.length})
                </h2>
                {courses.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 text-gray-400">
                    <BookOpenIcon size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No courses added yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div key={course.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <p className="font-semibold text-gray-900 text-sm">{course.title}</p>
                              {course.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-[#6D28D9] border border-purple-200">
                                  {course.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mb-1">{course.description}</p>
                            <div className="flex gap-2 text-[10px] text-gray-400 font-medium">
                              {course.level && <span>Level: {course.level}</span>}
                              {course.duration && <span>· {course.duration}</span>}
                              <span className="uppercase font-bold text-[#6D28D9]">· {course.category}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => deleteCourse(course.id)}
                            className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition-colors flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── Main Admin Page ───── */
export default function AdminPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem('hourly_admin_token'));

  const handleLogin = (newToken) => {
    sessionStorage.setItem('hourly_admin_token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('hourly_admin_token');
    setToken(null);
  };

  if (!token) return <AdminLogin onLogin={handleLogin} />;
  return <AdminDashboard token={token} onLogout={handleLogout} />;
}
