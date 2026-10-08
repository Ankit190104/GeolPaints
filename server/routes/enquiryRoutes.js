const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const rateLimit = require('express-rate-limit');
const {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../controllers/enquiryController');
const { protect } = require('../middleware/authMiddleware');

// Rate limiter for enquiry submissions: max 10 requests per 15 minutes per IP
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many enquiry requests sent from this IP, please try again after 15 minutes.',
  },
});

const enquiryValidationRules = [
  check('name', 'Name is required').trim().notEmpty(),
  check('phone', 'Valid phone number is required (at least 10 digits)').trim().isLength({ min: 10 }),
  check('message', 'Message is required').trim().notEmpty(),
];

router.route('/')
  .post(enquiryLimiter, enquiryValidationRules, createEnquiry)
  .get(protect, getEnquiries);

router.patch('/:id/status', protect, updateEnquiryStatus);
router.delete('/:id', protect, deleteEnquiry);

module.exports = router;
