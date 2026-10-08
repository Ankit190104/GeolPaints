import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const VisitUs = () => {
  const { t } = useLanguage();

  /*
   * OWNER EDIT: Store Phone & Hours can be adjusted below or in .env
   */
  const storePhoneFormatted = import.meta.env.VITE_STORE_PHONE || "094175 11727";
  const storePhoneClean = "09417511727";
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919417511727";

  // Google Maps Direction URL to Booth No 4, Sector 70 Mohali
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Booth+No+4+Sector+70+Mohali+Punjab+160071";

  return (
    <section id="visit" className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
            {t('visitTitle')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t('visitSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Contact & Hours Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-brand-blue text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6"
          >
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900/80 rounded-2xl text-brand-yellow shrink-0 mt-1 border border-blue-800">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-brand-yellow uppercase tracking-wider text-xs mb-1">
                    {t('addressTitle')}
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {t('addressText')}
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900/80 rounded-2xl text-emerald-400 shrink-0 mt-1 border border-blue-800">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-brand-yellow uppercase tracking-wider text-xs mb-1">
                    {t('hoursTitle')}
                  </h4>
                  {/* OWNER EDIT: [CONFIRM WITH OWNER] Store Hours */}
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {t('hoursText')}
                  </p>
                </div>
              </div>

              {/* Direct Call & WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-900/80 rounded-2xl text-amber-400 shrink-0 mt-1 border border-blue-800">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-brand-yellow uppercase tracking-wider text-xs mb-1">
                    {t('phoneTitle')}
                  </h4>
                  <p className="text-sm font-semibold text-white">
                    Phone: <a href={`tel:${storePhoneClean}`} className="hover:underline text-amber-300">{storePhoneFormatted}</a>
                  </p>
                  <p className="text-sm text-slate-300">
                    WhatsApp: <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-emerald-400">+{whatsappNumber}</a>
                  </p>
                </div>
              </div>

            </div>

            {/* Get Directions Button */}
            <div className="pt-4 border-t border-blue-900">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-brand-yellow hover:bg-amber-400 text-brand-blue font-extrabold py-3.5 px-6 rounded-2xl text-sm shadow-lg transition-all"
              >
                <Navigation className="h-4 w-4 fill-current" />
                <span>{t('getDirectionsBtn')}</span>
              </a>
            </div>

          </motion.div>

          {/* Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-slate-200 min-h-[350px] relative"
          >
            <iframe
              title="Goel Paints and Hardware Store Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.7062402927236!2d76.70921800000001!3d30.697424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fee8fb177995f%3A0x7d6a5293fb5f52cf!2sSector%2070%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20160071!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "380px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default VisitUs;
