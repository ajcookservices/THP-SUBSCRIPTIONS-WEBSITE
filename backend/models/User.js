// backend/models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: String,
  username: String,
  discriminator: String,
  avatar: String,
  email: String,
  subscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' }]
});

module.exports = mongoose.model('User', UserSchema);
