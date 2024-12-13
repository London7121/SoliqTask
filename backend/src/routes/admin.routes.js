const express = require('express');
const router = express.Router();
const Admin = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware/auth');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) return res.status(400).json({ message: 'User not found' });

    const validPassword = await admin.comparePassword(req.body.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, role: admin.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new operator (admin only)
router.post('/operator', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }

  const operator = new Admin({
    username: req.body.username,
    password: req.body.password,
    role: 'operator'
  });

  try {
    const newOperator = await operator.save();
    res.status(201).json(newOperator);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get dashboard statistics (admin/operator)
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const [orderStats, customerStats] = await Promise.all([
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalRevenue: { $sum: '$totalAmount' }
          }
        }
      ]),
      Customer.aggregate([
        {
          $group: {
            _id: null,
            totalCustomers: { $sum: 1 },
            averageSpent: { $avg: '$totalSpent' }
          }
        }
      ])
    ]);

    res.json({
      orders: orderStats[0],
      customers: customerStats[0]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
