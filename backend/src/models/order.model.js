const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'processing', 'completed', 'cancelled'],
    default: 'new'
  },
  customerInfo: {
    name: String,
    phone: String,
    address: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 24 soatdan eski buyurtmalarni o'chirish
orderSchema.index({ createdAt: 1 }, { 
  expireAfterSeconds: 24 * 60 * 60 
});

module.exports = mongoose.model('Order', orderSchema);
