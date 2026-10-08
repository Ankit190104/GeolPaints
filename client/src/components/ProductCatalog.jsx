import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MessageSquare, AlertCircle } from 'lucide-react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const categories = [
  'All',
  'Paints',
  'Hardware',
  'Plumbing',
  'Electrical',
  'Tools',
  'Waterproofing',
  'Sanitary',
  'Adhesives'
];

const ProductCatalog = () => {
  const { lang, t } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919417511727";

  const fetchProducts = async () => {
    setLoading(true);
    try {
      let url = '/products';
      const params = {};
      if (activeCategory !== 'All') {
        params.category = activeCategory;
      }
      if (searchTerm.trim() !== '') {
        params.q = searchTerm.trim();
      }

      const res = await api.get(url, { params });
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm]);

  const getWhatsAppProductLink = (productName) => {
    const msg = `Hi Goel Paints, I am interested in inquiring about ${productName}. Please share price & availability.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="products" className="py-16 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
            {t('productsTitle')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t('productsSubtitle')}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-soft border border-slate-200/80 mb-10 space-y-4">
          
          {/* Search Box */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue focus:bg-white transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-2">
            <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1 uppercase tracking-wider pl-1">
              <Filter className="h-3.5 w-3.5" /> Category:
            </span>
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-blue text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'All' ? t('allCategories') : cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white h-80 rounded-3xl animate-pulse p-4 border border-slate-200">
                <div className="bg-slate-200 h-44 rounded-2xl mb-4"></div>
                <div className="bg-slate-200 h-5 w-3/4 rounded mb-2"></div>
                <div className="bg-slate-200 h-4 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <AlertCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">{t('noProducts')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => {
              const name = lang === 'pa' ? (prod.name_pa || prod.name_en) : prod.name_en;
              const desc = lang === 'pa' ? (prod.description_pa || prod.description_en) : prod.description_en;

              return (
                <motion.div
                  key={prod._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Container */}
                    <div className="relative h-48 bg-slate-100 overflow-hidden">
                      <img
                        src={prod.imageUrl}
                        alt={name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      {/* Stock Tag */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                          prod.inStock
                            ? 'bg-emerald-500 text-white'
                            : 'bg-rose-500 text-white'
                        }`}>
                          {prod.inStock ? t('inStock') : t('outOfStock')}
                        </span>
                      </div>

                      {/* Category Tag */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                          {prod.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 text-base mb-1.5 line-clamp-1 group-hover:text-brand-blue transition-colors">
                        {name}
                      </h3>
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">
                        {desc}
                      </p>

                      {/* Price Display if available */}
                      {prod.price && (
                        <div className="flex items-baseline gap-1 text-brand-blue font-extrabold text-lg mb-3">
                          <span>₹{prod.price}</span>
                          {prod.unit && <span className="text-xs text-slate-400 font-normal">/ {prod.unit}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enquire on WhatsApp CTA */}
                  <div className="p-5 pt-0">
                    <a
                      href={getWhatsAppProductLink(prod.name_en)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-2xl text-xs sm:text-sm shadow transition-all transform active:scale-95"
                    >
                      <MessageSquare className="h-4 w-4 fill-current" />
                      <span>{t('enquireWhatsapp')}</span>
                    </a>
                  </div>

                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductCatalog;
