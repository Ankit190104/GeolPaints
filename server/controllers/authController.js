const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'goel_paints_super_secret_jwt_key_2026_mohali', {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (admin && (await bcrypt.compare(password, admin.passwordHash))) {
      res.json({
        success: true,
        _id: admin._id,
        email: admin.email,
        name: admin.name,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin._id).select('-passwordHash');
    res.json({ success: true, admin });
  } catch (error) {
    next(error);
  }
};

module.exports = { loginAdmin, getMe };
