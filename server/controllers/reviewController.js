const Review = require('../models/Review');

// @desc    Get approved reviews for public site
// @route   GET /api/reviews
// @access  Public
const getApprovedReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all reviews (for Admin)
// @route   GET /api/reviews/all
// @access  Private (Admin)
const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    next(error);
  }
};

// @desc    Submit a review
// @route   POST /api/reviews
// @access  Public
const createReview = async (req, res, next) => {
  try {
    const { name, rating, text } = req.body;
    if (!name || !rating || !text) {
      return res.status(400).json({ success: false, message: 'Name, rating, and review text are required' });
    }

    const review = await Review.create({
      name,
      rating: Number(rating),
      text,
      approved: false, // New public reviews need admin approval
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your review! It will be published after quick verification.',
      review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle review approval status
// @route   PATCH /api/reviews/:id/toggle-approve
// @access  Private (Admin)
const toggleApproveReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    review.approved = !review.approved;
    await review.save();

    res.json({ success: true, approved: review.approved, review });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin)
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getApprovedReviews,
  getAllReviews,
  createReview,
  toggleApproveReview,
  deleteReview,
};
