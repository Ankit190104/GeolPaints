import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, CheckCircle, X, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import api from '../utils/api';
import { useLanguage } from '../context/LanguageContext';

const ReviewsSection = () => {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });

  // Track window resize for responsive cards count (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsToShow = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews');
      if (res.data.success) {
        setReviews(res.data.reviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Auto slide interval every 3.5 seconds
  useEffect(() => {
    if (reviews.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [reviews.length, isPaused]);

  const handleNext = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  const handlePrev = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });

    try {
      const res = await api.post('/reviews', newReview);
      if (res.data.success) {
        setSubmitStatus({ loading: false, success: true, error: '' });
        setNewReview({ name: '', rating: 5, text: '' });
        fetchReviews();
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus({ loading: false, success: false, error: '' });
        }, 2000);
      }
    } catch (err) {
      console.error('Review submit error:', err);
      setSubmitStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit review.',
      });
    }
  };

  // Get current visible cards based on screen size
  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];
    const visible = [];
    const count = Math.min(cardsToShow, reviews.length);
    for (let i = 0; i < count; i++) {
      const idx = (currentIndex + i) % reviews.length;
      visible.push({ ...reviews[idx], uniqueKey: `${reviews[idx]._id || idx}-${idx}` });
    }
    return visible;
  };

  // Helper for customer initial badge
  const getInitials = (name) => {
    if (!name) return 'G';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="reviews" className="py-16 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-blue tracking-tight">
            {t('reviewsTitle')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            {t('reviewsSubtitle')}
          </p>
        </div>

        {/* 4.1 Star Rating Summary Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-soft border border-slate-200/90 mb-12 max-w-xl mx-auto text-center flex flex-col sm:flex-row items-center justify-around gap-6">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-brand-blue">4.1</div>
            <div className="flex justify-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < 4 ? 'fill-current' : 'fill-amber-200'}`}
                />
              ))}
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('googleRatingText')}
            </p>
          </div>

          <div className="h-12 w-px bg-slate-200 hidden sm:block"></div>

          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-brand-blue hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-2xl text-sm shadow transition-all transform hover:scale-105 active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>{t('leaveReviewBtn')}</span>
            </button>
          </div>
        </div>

        {/* FULLY RESPONSIVE AUTO-SLIDING CAROUSEL */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(cardsToShow)].map((_, i) => (
              <div key={i} className="h-52 bg-white rounded-3xl animate-pulse p-4 border border-slate-200"></div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-slate-500 font-medium">No reviews yet. Be the first to leave a review!</div>
        ) : (
          <div
            className="relative px-0 sm:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Desktop / Tablet Navigation Arrows */}
            {reviews.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  aria-label="Previous Review"
                  className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-slate-100 text-brand-blue p-3 rounded-full shadow-xl border border-slate-200 transition-transform active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next Review"
                  className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-slate-100 text-brand-blue p-3 rounded-full shadow-xl border border-slate-200 transition-transform active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Sliding Track */}
            <div className="overflow-hidden py-2 px-1">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0.85, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {getVisibleReviews().map((rev) => (
                  <div
                    key={rev.uniqueKey}
                    className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[220px] relative group"
                  >
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-slate-100 group-hover:text-amber-100 transition-colors pointer-events-none" />

                    <div>
                      {/* Customer Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-brand-blue to-blue-600 text-white font-bold flex items-center justify-center text-xs shadow shrink-0">
                          {getInitials(rev.name)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate">{rev.name}</h4>
                          <div className="flex text-amber-400 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${i < rev.rating ? 'fill-current' : 'fill-slate-200'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-4 relative z-10">
                        "{rev.text}"
                      </p>
                    </div>

                    {/* Bottom Metadata */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Verified Customer
                      </span>
                      <span>{new Date(rev.createdAt || Date.now()).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Mobile Controls Row (Arrows + Dots) */}
            <div className="flex items-center justify-between sm:justify-center gap-4 mt-6 px-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className="sm:hidden bg-white text-brand-blue p-2.5 rounded-full shadow border border-slate-200 active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Dots Navigation */}
              <div className="flex items-center gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-6 bg-brand-blue' : 'w-2 bg-slate-300'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                aria-label="Next Review"
                className="sm:hidden bg-white text-brand-blue p-2.5 rounded-full shadow border border-slate-200 active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-200"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-brand-blue mb-1">
              {t('submitReviewTitle')}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Your honest feedback helps us serve Mohali better.
            </p>

            {submitStatus.success ? (
              <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold">Review submitted for verification!</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {submitStatus.error && (
                  <div className="text-xs bg-rose-50 text-rose-700 p-3 rounded-xl">
                    {submitStatus.error}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Manpreet Singh"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('ratingLabel')}</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold"
                  >
                    <option value={5}>5 Stars ★★★★★ (Excellent)</option>
                    <option value={4}>4 Stars ★★★★☆ (Good)</option>
                    <option value={3}>3 Stars ★★★☆☆ (Average)</option>
                    <option value={2}>2 Stars ★★☆☆☆ (Fair)</option>
                    <option value={1}>1 Star ★☆☆☆☆ (Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('reviewTextLabel')}</label>
                  <textarea
                    rows="3"
                    required
                    value={newReview.text}
                    onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                    placeholder="Share details of your experience with Goel Paints..."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="w-full bg-brand-blue hover:bg-blue-900 text-white font-bold py-3 rounded-xl text-sm shadow"
                >
                  {submitStatus.loading ? 'Submitting...' : t('submitReviewBtn')}
                </button>
              </form>
            )}

          </motion.div>
        </div>
      )}

    </section>
  );
};

export default ReviewsSection;
