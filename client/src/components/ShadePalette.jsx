import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, MessageSquare, Check, Sparkles } from 'lucide-react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const ShadePalette = () => {
  const { t } = useLanguage();
  const [shades, setShades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919417511727";

  useEffect(() => {
    const fetchShades = async () => {
      try {
        const res = await api.get('/shades');
        if (res.data.success) {
          setShades(res.data.shades);
        }
      } catch (err) {
        console.error('Error fetching shades:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShades();
  }, []);

  const categories = ['All', 'Interior', 'Exterior', 'Wood & Metal', 'Accent'];

  const filteredShades = selectedCategory === 'All'
    ? shades
    : shades.filter(s => s.category === selectedCategory);

  const getShadeWhatsAppUrl = (shade) => {
    const msg = `Hi Goel Paints, I am interested in paint color shade: "${shade.name}" (${shade.code || shade.hex}). Please advise available tint bases & pricing.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="shades" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3.5 py-1.5 rounded-full font-bold mb-3">
            <Sparkles className="h-4 w-4 text-brand-yellow fill-current" />
            <span>Asian Paints & Nerolac Tinting Palette</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
            {t('shadesTitle')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t('shadesSubtitle')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center items-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-blue text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? t('shadeCategoryAll') : cat}
            </button>
          ))}
        </div>

        {/* Shades Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-100 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredShades.map((shade) => (
              <motion.div
                key={shade._id}
                whileHover={{ y: -5 }}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                {/* Color Swatch Box */}
                <div
                  className="h-28 w-full relative transition-transform duration-300"
                  style={{ backgroundColor: shade.hex }}
                >
                  {shade.code && (
                    <span className="absolute top-2 right-2 bg-black/40 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                      {shade.code}
                    </span>
                  )}
                </div>

                {/* Shade Info & Enquire Action */}
                <div className="p-3 text-center flex flex-col flex-1 justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                      {shade.name}
                    </h4>
                    <span className="text-[11px] text-slate-400 block uppercase tracking-wider mb-3">
                      {shade.category}
                    </span>
                  </div>

                  <a
                    href={getShadeWhatsAppUrl(shade)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 bg-brand-blue hover:bg-blue-900 text-white font-bold py-2 rounded-xl text-[11px] shadow transition-all"
                  >
                    <MessageSquare className="h-3.5 w-3.5 fill-current" />
                    <span>{t('pickShadeAction')}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ShadePalette;
