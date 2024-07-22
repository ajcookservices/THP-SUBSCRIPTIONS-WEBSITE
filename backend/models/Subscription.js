// backend/models/Subscription.js

const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plan: String,
  status: String,
  startDate: Date,
  endDate: Date,
  paymentMethod: String
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
