// backend/controllers/subscriptionController.js

const Subscription = require('../models/Subscription');

exports.getSubscriptions = async (req, res) => {
  const subscriptions = await Subscription.find({ user: req.user.id });
  res.render('manageSubscription', { subscriptions });
};

exports.createSubscription = async (req, res) => {
  const { plan, paymentMethod } = req.body;
  const newSubscription = new Subscription({
    user: req.user.id,
    plan,
    status: 'active',
    startDate: new Date(),
    paymentMethod
  });
  await newSubscription.save();
  res.redirect('/dashboard');
};

exports.updateSubscription = async (req, res) => {
  const { subscriptionId, newPlan } = req.body;
  await Subscription.findByIdAndUpdate(subscriptionId, { plan: newPlan });
  res.redirect('/dashboard');
};

exports.cancelSubscription = async (req, res) => {
  const { subscriptionId } = req.body;
  await Subscription.findByIdAndUpdate(subscriptionId, { status: 'canceled' });
  res.redirect('/dashboard');
};
