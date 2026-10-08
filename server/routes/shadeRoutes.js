const express = require('express');
const router = express.Router();
const {
  getShades,
  createShade,
  updateShade,
  deleteShade,
} = require('../controllers/shadeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getShades)
  .post(protect, createShade);

router.route('/:id')
  .put(protect, updateShade)
  .delete(protect, deleteShade);

module.exports = router;
