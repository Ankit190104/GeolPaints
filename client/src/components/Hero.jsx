import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageSquare, Star, ShieldCheck, Truck, ParkingSquare, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();
  const phoneClean = "09417511727";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919417511727";

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi Goel Paints, I want to enquire about paint & hardware prices."
  )}`;

  return (
    <section id="home" className="relative bg-gradient-to-b from-brand-blue via-slate-900 to-brand-blue text-white py-12 md:py-20 overflow-hidden">
      {/* Background Decorative Blur circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-900/90 border border-brand-yellow/40 px-3.5 py-1.5 rounded-full text-xs md:text-sm font-semibold text-brand-yellow shadow-inner">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <span>{t('heroBadge')}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('heroSubtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href={`tel:${phoneClean}`}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-yellow hover:bg-amber-400 text-brand-blue font-bold px-7 py-3.5 rounded-2xl text-base shadow-xl hover:shadow-brand-yellow/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Phone className="h-5 w-5 fill-current text-brand-blue" />
                <span>{t('heroCallBtn')}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-2xl text-base shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageSquare className="h-5 w-5 fill-current" />
                <span>{t('heroWhatsappBtn')}</span>
              </a>
            </div>

            {/* Quick Feature Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <ShieldCheck className="h-4 w-4 text-brand-yellow shrink-0" />
                <span className="text-slate-300 font-medium">100% Original</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Truck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-slate-300 font-medium">Home Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <ParkingSquare className="h-4 w-4 text-blue-400 shrink-0" />
                <span className="text-slate-300 font-medium">Easy Parking</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <Award className="h-4 w-4 text-brand-yellow shrink-0" />
                <span className="text-slate-300 font-medium">Best Rates</span>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 bg-slate-900 group">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&auto=format&fit=crop&q=80"
                alt="Goel Paints Store Sector 70 Mohali"
                className="w-full h-80 sm:h-96 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              {/* Overlay Shop Tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700/60 flex items-center justify-between">
                <div>
                  <h4 className="text-white font-bold text-base">Goel Paints & Hardware</h4>
                  <p className="text-xs text-slate-300">Booth No. 4, Sector 70, Mohali</p>
                </div>
                <div className="bg-brand-yellow text-brand-blue text-xs font-extrabold px-3 py-1.5 rounded-lg shadow">
                  OPEN NOW
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
