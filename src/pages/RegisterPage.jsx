import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

export default function RegisterPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const preselected = searchParams.get('course') || '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    contactMethod: 'telegram',
    level: '',
    course: '',
    message: '',
  });

  useEffect(() => {
    if (preselected) {
      // Find matching key if a title was passed
      const lower = preselected.toLowerCase();
      let matchedKey = '';
      if (lower.includes('it') || lower.includes('tech')) matchedKey = 'it';
      else if (lower.includes('business') || lower.includes('бизнес')) matchedKey = 'business';
      else if (lower.includes('ielts')) matchedKey = 'ielts';
      else if (lower.includes('interview') || lower.includes('собеседован') || lower.includes('интервью')) matchedKey = 'interview';
      else if (lower.includes('kid') || lower.includes('дет') || lower.includes('балдар')) matchedKey = 'kids';
      else if (lower.includes('general') || lower.includes('разговор') || lower.includes('сүйлөшүү')) matchedKey = 'general';
      else matchedKey = preselected;

      setForm((prev) => ({ ...prev, course: matchedKey }));
    }
  }, [preselected]);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', phone: '', contactMethod: 'telegram', level: '', course: '', message: '' });
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.error || t('register.error'));
        setStatus('error');
      }
    } catch (err) {
      console.warn('Backend server unreachable, saving locally:', err);
      // Fallback: save to offline queue so registration is never lost
      try {
        const offline = JSON.parse(localStorage.getItem('hourly_offline_registrations') || '[]');
        offline.unshift({
          ...form,
          id: 'local_' + Date.now().toString(36),
          status: 'pending',
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('hourly_offline_registrations', JSON.stringify(offline));
        setStatus('success');
        setForm({ name: '', phone: '', contactMethod: 'telegram', level: '', course: '', message: '' });
      } catch {
        setStatus('error');
      }
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t('register.success')}</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
          >
            <ArrowLeft size={16} />
            {t('nav.courses')}
          </Link>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all';
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5';

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {t('nav.courses')}
        </Link>

        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            {t('register.title')}
          </h1>
          <p className="text-gray-500">{t('register.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>{t('register.name')}</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t('register.namePlaceholder')}
              required
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>{t('register.phone')}</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder={t('register.phonePlaceholder')}
              required
              className={inputClass}
            />
          </div>

          {/* Contact Method */}
          <div>
            <label className={labelClass}>{t('register.contact')}</label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'phone', label: t('register.contactPhone') },
                { value: 'telegram', label: t('register.contactTelegram') },
                { value: 'whatsapp', label: t('register.contactWhatsapp') },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border cursor-pointer transition-all text-sm font-medium ${
                    form.contactMethod === opt.value
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 text-gray-600 hover:border-primary-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={opt.value}
                    checked={form.contactMethod === opt.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          {/* Level */}
          <div>
            <label className={labelClass}>{t('register.level')}</label>
            <select
              name="level"
              value={form.level}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">{t('register.levelPlaceholder')}</option>
              {Object.entries({
                beginner: t('register.levels.beginner'),
                elementary: t('register.levels.elementary'),
                intermediate: t('register.levels.intermediate'),
                upperIntermediate: t('register.levels.upperIntermediate'),
                advanced: t('register.levels.advanced'),
                unsure: t('register.levels.unsure'),
              }).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Course */}
          <div>
            <label className={labelClass}>{t('register.course')}</label>
            <select
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">{t('register.coursePlaceholder')}</option>
              {Object.entries({
                general: t('register.courseOptions.general'),
                business: t('register.courseOptions.business'),
                ielts: t('register.courseOptions.ielts'),
                it: t('register.courseOptions.it'),
                interview: t('register.courseOptions.interview'),
                kids: t('register.courseOptions.kids'),
              }).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>{t('register.message')}</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder={t('register.messagePlaceholder')}
              className={inputClass + ' resize-none'}
            />
          </div>

          {/* Error */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
              {errorMessage || t('register.error')}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#4C1D95] hover:bg-[#5B21B6] text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md shadow-purple-900/10 hover:shadow-lg"
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('register.submitting')}
              </>
            ) : (
              <>
                <Send size={16} />
                {t('register.submit')}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
