import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Globe, Menu, X, Shield, Paintbrush } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { admin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // OWNER EDIT: Update store phone number if needed
  const phoneFormatted = import.meta.env.VITE_STORE_PHONE || "094175 11727";
  const phoneClean = "09417511727";

  return (
    <header className="sticky top-0 z-50 bg-brand-blue text-white shadow-md border-b border-blue-900/50">
      {/* Top Banner Notice */}
      <div className="bg-brand-red text-white text-xs py-1 px-4 text-center font-medium tracking-wide">
        📍 {t('storeSub')} &bull; 🚚 {t('deliveryBadge')}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-yellow p-2 rounded-xl text-brand-blue shadow-md group-hover:scale-105 transition-transform">
              <Paintbrush className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight block leading-tight text-white group-hover:text-brand-yellow transition-colors">
                {t('storeName')}
              </span>
              <span className="text-xs text-blue-200 block font-normal">
                {lang === 'en' ? 'Paints • Hardware • Sanitary' : 'ਪੇਂਟਸ • ਹਾਰਡਵੇਅਰ • ਸੈਨੇਟਰੀ'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#home" className="hover:text-brand-yellow transition-colors">{t('navHome')}</a>
            <a href="#why-us" className="hover:text-brand-yellow transition-colors">{t('navWhyUs')}</a>
            <a href="#products" className="hover:text-brand-yellow transition-colors">{t('navProducts')}</a>
            <a href="#shades" className="hover:text-brand-yellow transition-colors">{t('navShades')}</a>
            <a href="#bulk" className="hover:text-brand-yellow transition-colors">{t('navBulk')}</a>
            <a href="#reviews" className="hover:text-brand-yellow transition-colors">{t('navReviews')}</a>
            <a href="#visit" className="hover:text-brand-yellow transition-colors">{t('navVisit')}</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-blue-900/80 hover:bg-blue-800 text-xs px-3 py-2 rounded-lg border border-blue-700 transition-all font-semibold"
              title="Switch Language / ਭਾਸ਼ਾ ਬਦਲੋ"
            >
              <Globe className="h-3.5 w-3.5 text-brand-yellow" />
              <span>{lang === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}</span>
            </button>

            {/* Call Now Button */}
            <a
              href={`tel:${phoneClean}`}
              className="flex items-center gap-2 bg-brand-yellow hover:bg-amber-400 text-brand-blue font-bold px-4 py-2 rounded-xl text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>{t('callNow')}</span>
            </a>

            {/* Admin Badge/Link */}
            <Link
              to={admin ? "/admin" : "/login"}
              className="p-2 text-blue-300 hover:text-white hover:bg-blue-900 rounded-lg transition-colors"
              title="Admin Login / Dashboard"
            >
              <Shield className="h-5 w-5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="bg-blue-900 text-xs px-2.5 py-1.5 rounded-md font-bold text-brand-yellow border border-blue-700"
            >
              {lang === 'en' ? 'ਪੰਜਾਬੀ' : 'ENG'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-blue-900 rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-brand-blue border-t border-blue-900 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navHome')}
          </a>
          <a
            href="#why-us"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navWhyUs')}
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navProducts')}
          </a>
          <a
            href="#shades"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navShades')}
          </a>
          <a
            href="#bulk"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navBulk')}
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navReviews')}
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-white hover:text-brand-yellow font-medium"
          >
            {t('navVisit')}
          </a>

          <div className="pt-3 border-t border-blue-900 flex flex-col gap-2">
            <a
              href={`tel:${phoneClean}`}
              className="flex items-center justify-center gap-2 bg-brand-yellow text-brand-blue font-bold py-2.5 rounded-xl text-center shadow"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>{t('callNow')} ({phoneFormatted})</span>
            </a>
            <Link
              to={admin ? "/admin" : "/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-blue-900 text-blue-200 text-xs py-2 rounded-lg text-center"
            >
              <Shield className="h-4 w-4" />
              <span>{admin ? "Go to Admin Dashboard" : t('adminLogin')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
