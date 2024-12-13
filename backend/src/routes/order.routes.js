const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Customer = require('../models/customer.model');
const { authMiddleware } = require('../middleware/auth');
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: false });

// Get all orders (admin/operator only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new order
router.post('/', async (req, res) => {
  const order = new Order({
    items: req.body.items,
    totalAmount: req.body.totalAmount,
    customerInfo: req.body.customerInfo
  });

  try {
    // Save order
    const newOrder = await order.save();

    // Update or create customer
    let customer = await Customer.findOne({ phone: req.body.customerInfo.phone });
    if (!customer) {
      customer = new Customer({
        name: req.body.customerInfo.name,
        phone: req.body.customerInfo.phone,
        address: req.body.customerInfo.address
      });
    }
    
    customer.orders.push(newOrder._id);
    customer.totalSpent += req.body.totalAmount;
    customer.lastOrderDate = new Date();
    await customer.save();

    // Send Telegram notification
    const message = `🛍 Yangi buyurtma!\n\n` +
      `🆔 Buyurtma raqami: #${newOrder._id}\n` +
      `👤 Mijoz: ${req.body.customerInfo.name}\n` +
      `📞 Tel: ${req.body.customerInfo.phone}\n` +
      `📍 Manzil: ${req.body.customerInfo.address}\n\n` +
      `📦 Buyurtma tarkibi:\n${req.body.items.map(item => 
        `- ${item.name} x${item.quantity} = ${item.price * item.quantity} so'm`
      ).join('\n')}\n\n` +
      `💰 Jami: ${req.body.totalAmount} so'm`;

    bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update order status (admin/operator only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = req.body.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get order statistics (admin/operator only)
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$totalAmount' },
          averageOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);
    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
