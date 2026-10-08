const { validationResult } = require('express-validator');
const Enquiry = require('../models/Enquiry');

// @desc    Submit an enquiry (General or Bulk)
// @route   POST /api/enquiries
// @access  Public
const createEnquiry = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, phone, message, productRef, type } = req.body;

    const enquiry = await Enquiry.create({
      name,
      phone,
      message,
      productRef: productRef || '',
      type: type || 'general',
      status: 'new',
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! We will call or WhatsApp you shortly.',
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all enquiries
// @route   GET /api/enquiries
// @access  Private (Admin)
const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json({ success: true, count: enquiries.length, enquiries });
  } catch (error) {
    next(error);
  }
};

// @desc    Update enquiry status (new / contacted)
// @route   PATCH /api/enquiries/:id/status
// @access  Private (Admin)
const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['new', 'contacted'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    enquiry.status = status;
    await enquiry.save();

    res.json({ success: true, enquiry });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete enquiry
// @route   DELETE /api/enquiries/:id
// @access  Private (Admin)
const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await enquiry.deleteOne();
    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
};
