const mongoose = require('mongoose');

const ShadeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    hex: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: 'Interior', // Interior, Exterior, Wood & Metal, Accent
    },
    code: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Shade', ShadeSchema);
