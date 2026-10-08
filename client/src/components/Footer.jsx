import React from 'react';
import { Paintbrush, Heart } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  /*
   * OWNER / DEVELOPER EDIT: Update developer name and phone number here
   */
  const developerName = "Webcraft Solutions";
  const developerPhone = "+91 94175 11727";

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-900">
          
          {/* Col 1: Store Intro */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-brand-yellow p-1.5 rounded-lg text-brand-blue font-bold">
                <Paintbrush className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Goel Paints and Hardware Store
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Authorised stockists for Asian Paints, Nerolac, Dr. Fixit waterproofing, and quality home hardware tools in Sector 70, Mohali.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="#home" className="hover:text-brand-yellow transition-colors">{t('navHome')}</a></li>
              <li><a href="#products" className="hover:text-brand-yellow transition-colors">{t('navProducts')}</a></li>
              <li><a href="#shades" className="hover:text-brand-yellow transition-colors">{t('navShades')}</a></li>
              <li><a href="#bulk" className="hover:text-brand-yellow transition-colors">{t('navBulk')}</a></li>
              <li><a href="#reviews" className="hover:text-brand-yellow transition-colors">{t('navReviews')}</a></li>
              <li><a href="#visit" className="hover:text-brand-yellow transition-colors">{t('navVisit')}</a></li>
            </ul>
          </div>

          {/* Col 3: Hours Summary */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t('hoursTitle')}</h4>
            <p className="text-xs text-slate-400">
              Monday - Saturday<br />
              <strong className="text-slate-200">9:00 AM - 8:30 PM</strong>
            </p>
            <p className="text-xs text-slate-500">
              Sunday: <span className="text-rose-400 font-semibold">Closed</span>
            </p>
          </div>

        </div>

        {/* Bottom Bar & Credit Line */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 space-y-3 sm:space-y-0">
          <p>© {new Date().getFullYear()} Goel Paints and Hardware Store. {t('footerRights')}</p>

          {/* EDITABLE CREDIT LINE */}
          <p className="text-slate-400 flex items-center gap-1">
            Website by <span className="font-semibold text-white">{developerName}</span> | Phone: <a href={`tel:${developerPhone.replace(/\s+/g, '')}`} className="text-brand-yellow hover:underline">{developerPhone}</a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
