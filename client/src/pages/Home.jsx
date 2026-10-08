import React from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import WhyUs from '../components/WhyUs';
import ProductCatalog from '../components/ProductCatalog';
import ShadePalette from '../components/ShadePalette';
import BulkOrderSection from '../components/BulkOrderSection';
import ReviewsSection from '../components/ReviewsSection';
import VisitUs from '../components/VisitUs';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <SEO />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <WhyUs />
        <ProductCatalog />
        <ShadePalette />
        <BulkOrderSection />
        <ReviewsSection />
        <VisitUs />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};

export default Home;
