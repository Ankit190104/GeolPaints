const express = require('express');
const router = express.Router();
const {
  getApprovedReviews,
  getAllReviews,
  createReview,
  toggleApproveReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getApprovedReviews)
  .post(createReview);

router.get('/all', protect, getAllReviews);

router.patch('/:id/toggle-approve', protect, toggleApproveReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;
