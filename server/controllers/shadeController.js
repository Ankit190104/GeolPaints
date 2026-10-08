const Shade = require('../models/Shade');

// @desc    Get all paint shades
// @route   GET /api/shades
// @access  Public
const getShades = async (req, res, next) => {
  try {
    const shades = await Shade.find().sort({ category: 1, name: 1 });
    res.json({ success: true, count: shades.length, shades });
  } catch (error) {
    next(error);
  }
};

// @desc    Create paint shade
// @route   POST /api/shades
// @access  Private (Admin)
const createShade = async (req, res, next) => {
  try {
    const { name, hex, category, code } = req.body;
    const shade = await Shade.create({ name, hex, category, code });
    res.status(201).json({ success: true, shade });
  } catch (error) {
    next(error);
  }
};

// @desc    Update paint shade
// @route   PUT /api/shades/:id
// @access  Private (Admin)
const updateShade = async (req, res, next) => {
  try {
    const shade = await Shade.findById(req.params.id);
    if (!shade) {
      return res.status(404).json({ success: false, message: 'Shade not found' });
    }

    const updatedShade = await Shade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ success: true, shade: updatedShade });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete paint shade
// @route   DELETE /api/shades/:id
// @access  Private (Admin)
const deleteShade = async (req, res, next) => {
  try {
    const shade = await Shade.findById(req.params.id);
    if (!shade) {
      return res.status(404).json({ success: false, message: 'Shade not found' });
    }

    await shade.deleteOne();
    res.json({ success: true, message: 'Shade deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getShades,
  createShade,
  updateShade,
  deleteShade,
};
