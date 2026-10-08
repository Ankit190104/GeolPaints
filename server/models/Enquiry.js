const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    productRef: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      enum: ['general', 'bulk'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'contacted'],
      default: 'new',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enquiry', EnquirySchema);
