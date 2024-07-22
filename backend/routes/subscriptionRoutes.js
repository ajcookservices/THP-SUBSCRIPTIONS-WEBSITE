// backend/routes/subscriptionRoutes.js

const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const authController = require('../controllers/authController');

router.get('/', authController.ensureAuthenticated, subscriptionController.getSubscriptions);
router.post('/create', authController.ensureAuthenticated, subscriptionController.createSubscription);
router.post('/update', authController.ensureAuthenticated, subscriptionController.updateSubscription);
router.post('/cancel', authController.ensureAuthenticated, subscriptionController.cancelSubscription);

module.exports = router;
