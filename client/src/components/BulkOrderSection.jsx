import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Send, CheckCircle2, Building2, ShieldCheck, PhoneCall } from 'lucide-react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const BulkOrderSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      setStatus({ loading: false, success: false, error: 'Please fill in all required fields.' });
      return;
    }

    setStatus({ loading: true, success: false, error: '' });
    try {
      const res = await api.post('/enquiries', {
        ...formData,
        type: 'bulk',
      });

      if (res.data.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', phone: '', message: '' });
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit enquiry. Please try calling directly.';
      setStatus({ loading: false, success: false, error: errMsg });
    }
  };

  return (
    <section id="bulk" className="py-16 bg-gradient-to-br from-brand-blue via-slate-900 to-blue-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs px-3.5 py-1.5 rounded-full font-bold">
              <Building2 className="h-4 w-4" />
              <span>For Contractors, Builders & Painters</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
              {t('bulkTitle')}
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              {t('bulkSubtitle')}
            </p>

            {/* Benefit List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Wholesale Project Rates</h4>
                  <p className="text-xs text-slate-300">Special discounted rates for full building house painting & construction hardware orders.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <Truck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">Direct Site Delivery</h4>
                  <p className="text-xs text-slate-300">We dispatch paint buckets, cement products, and fittings directly to your site in Mohali.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
                <ShieldCheck className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-white">GST Invoice & Billing</h4>
                  <p className="text-xs text-slate-300">Official GST bills provided for corporate and contractor expense compliance.</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Enquiry Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 bg-white text-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-200"
          >
            <h3 className="text-xl font-bold text-brand-blue mb-1">
              Send Bulk Requirement Enquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out your details below and Mr. Goel will personally call you back.
            </p>

            {status.success ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-lg">{t('formSuccess')}</h4>
                <button
                  onClick={() => setStatus({ loading: false, success: false, error: '' })}
                  className="bg-brand-blue text-white font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {status.error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl">
                    {status.error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('formName')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Gurpreet Singh / Construction Co."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('formPhone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 094175 11727"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    {t('formMessage')} *
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="e.g. Need 10 Buckets Apex Royale Cream, 5 Drums Dr. Fixit, and door locks for site in Sector 70."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-amber-400 text-brand-blue font-bold py-3.5 px-6 rounded-xl text-sm shadow-lg transition-all"
                >
                  {status.loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>{t('formSubmit')}</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BulkOrderSection;
