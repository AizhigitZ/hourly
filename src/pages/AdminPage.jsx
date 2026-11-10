import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Lock, LogOut, RefreshCw, Search, Users, Clock, Phone, CheckCircle2,
  XCircle, ChevronDown, Trash2, Eye, Globe, ChevronLeft, ChevronRight
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
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data.token);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
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
            <p className="text-sm text-red-500 bg-red-50 rounded-xl p-3">{t('admin.loginError')}</p>
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

          <div className="text-center mt-3 space-y-1">
            <p className="text-xs text-gray-400">
              Default password: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600 font-mono">hourly2025</code>
            </p>
            <button
              type="button"
              onClick={() => setPassword('hourly2025')}
              className="text-xs text-[#6D28D9] hover:text-[#4C1D95] font-semibold underline underline-offset-2 transition-colors"
            >
              Click to autofill password
            </button>
          </div>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/registrations', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data);
      } else if (res.status === 401) {
        onLogout();
      }
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
      }
    } catch {
      // silent fail
    }
  };

  const deleteRegistration = async (id) => {
    if (!confirm(t('admin.deleteConfirm'))) return;
    try {
      const res = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
      }
    } catch {
      // silent fail
    }
  };

  const filtered = registrations.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const counts = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === 'pending').length,
    contacted: registrations.filter((r) => r.status === 'contacted').length,
    enrolled: registrations.filter((r) => r.status === 'enrolled').length,
  };

  const langLabels = { en: 'EN', ru: 'RU', kg: 'KG' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black text-primary-600">HOURLY</span>
            <span className="text-xs font-semibold text-gray-400 border border-gray-300 rounded px-1.5 py-0.5 uppercase tracking-wider">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
            >
              <LogOut size={14} />
              {t('admin.logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{t('admin.title')}</h1>
        <p className="text-sm text-gray-500 mb-8">{t('admin.subtitle')}</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: t('admin.total'), value: counts.total, color: 'bg-primary-50 text-primary-600', icon: Users },
            { label: t('admin.pending'), value: counts.pending, color: 'bg-amber-50 text-amber-600', icon: Clock },
            { label: t('admin.contacted'), value: counts.contacted, color: 'bg-blue-50 text-blue-600', icon: Phone },
            { label: t('admin.enrolled'), value: counts.enrolled, color: 'bg-green-50 text-green-600', icon: CheckCircle2 },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon size={18} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('admin.search')}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">{t('admin.status')}: All</option>
            <option value="pending">{t('admin.statusPending')}</option>
            <option value="contacted">{t('admin.statusContacted')}</option>
            <option value="enrolled">{t('admin.statusEnrolled')}</option>
            <option value="rejected">{t('admin.statusRejected')}</option>
          </select>
          <button
            onClick={fetchRegistrations}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            {t('admin.refresh')}
          </button>
        </div>

        {/* Registrations List */}
        {loading && registrations.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <RefreshCw size={32} className="animate-spin mx-auto mb-4" />
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <Users size={40} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">{t('admin.noRegistrations')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((reg) => {
              const statusConf = STATUS_CONFIG[reg.status] || STATUS_CONFIG.pending;
              const StatusIcon = statusConf.icon;
              const isExpanded = expandedId === reg.id;

              return (
                <div
                  key={reg.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-primary-200 transition-colors"
                >
                  {/* Summary Row */}
                  <div
                    className="flex items-center gap-4 p-5 cursor-pointer"
                    onClick={() => setExpandedId(isExpanded ? null : reg.id)}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {(reg.name || '')
                        .split(' ')
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()
                        .slice(0, 2) || 'ST'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{reg.name}</p>
                      <p className="text-xs text-gray-400 truncate">{reg.phone} · {reg.course}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${statusConf.color}`}>
                      <StatusIcon size={12} />
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

                  {/* Expanded Details */}
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
                          const sc = STATUS_CONFIG[s];
                          return (
                            <button
                              key={s}
                              onClick={() => updateStatus(reg.id, s)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                reg.status === s
                                  ? sc.color + ' ring-2 ring-offset-1 ring-current'
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
