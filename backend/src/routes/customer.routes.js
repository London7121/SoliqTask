const express = require('express');
const router = express.Router();
const Customer = require('../models/customer.model');
const { authMiddleware } = require('../middleware/auth');

// Get all customers (admin/operator only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const customers = await Customer.find()
      .populate('orders')
      .sort({ lastOrderDate: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer by phone
router.get('/:phone', async (req, res) => {
  try {
    const customer = await Customer.findOne({ phone: req.params.phone })
      .populate('orders');
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get customer statistics (admin/operator only)
router.get('/stats/overview', authMiddleware, async (req, res) => {
  try {
    const stats = await Customer.aggregate([
      {
        $group: {
          _id: null,
          totalCustomers: { $sum: 1 },
          totalRevenue: { $sum: '$totalSpent' },
          averageSpentPerCustomer: { $avg: '$totalSpent' }
        }
      }
    ]);
    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
