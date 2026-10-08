import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Tag, Truck, ParkingSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const WhyUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <ShieldCheck className="h-8 w-8 text-brand-blue" />,
      title: t('why1Title'),
      desc: t('why1Desc'),
      bg: "bg-blue-50 border-blue-100",
    },
    {
      icon: <Tag className="h-8 w-8 text-emerald-600" />,
      title: t('why2Title'),
      desc: t('why2Desc'),
      bg: "bg-emerald-50 border-emerald-100",
    },
    {
      icon: <Truck className="h-8 w-8 text-brand-red" />,
      title: t('why3Title'),
      desc: t('why3Desc'),
      bg: "bg-red-50 border-red-100",
    },
    {
      icon: <ParkingSquare className="h-8 w-8 text-amber-600" />,
      title: t('why4Title'),
      desc: t('why4Desc'),
      bg: "bg-amber-50 border-amber-100",
    }
  ];

  return (
    <section id="why-us" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
            {t('whyTitle')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {t('whySubtitle')}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`p-6 rounded-3xl border ${item.bg} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="p-3 w-fit rounded-2xl bg-white shadow-sm mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyUs;
