const Product = require('../models/Product');

// @desc    Get all products with category filter and search term
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const { category, q } = req.query;
    const queryObj = {};

    if (category && category !== 'All' && category !== 'ਸਾਰੇ') {
      queryObj.category = category;
    }

    if (q) {
      const searchRegex = new RegExp(q, 'i');
      queryObj.$or = [
        { name_en: searchRegex },
        { name_pa: searchRegex },
        { description_en: searchRegex },
        { description_pa: searchRegex },
        { category: searchRegex }
      ];
    }

    const products = await Product.find(queryObj).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Admin)
const createProduct = async (req, res, next) => {
  try {
    const { name_en, name_pa, category, description_en, description_pa, price, unit, imageUrl, inStock, featured } = req.body;

    const product = await Product.create({
      name_en,
      name_pa: name_pa || name_en,
      category,
      description_en,
      description_pa: description_pa || description_en,
      price: price ? Number(price) : null,
      unit: unit || 'Ltr',
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80',
      inStock: inStock !== undefined ? inStock : true,
      featured: featured !== undefined ? featured : false,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin)
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
