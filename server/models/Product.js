const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name_en: {
      type: String,
      required: [true, 'English product name is required'],
      trim: true,
    },
    name_pa: {
      type: String,
      required: [true, 'Punjabi product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Paints', 'Hardware', 'Plumbing', 'Electrical', 'Tools', 'Waterproofing', 'Sanitary', 'Adhesives'],
      default: 'Paints',
    },
    description_en: {
      type: String,
      default: '',
    },
    description_pa: {
      type: String,
      default: '',
    },
    price: {
      type: Number,
      default: null,
    },
    unit: {
      type: String,
      default: 'Ltr', // e.g., Ltr, Kg, Piece, Pack, Bucket
    },
    imageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
