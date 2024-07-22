// backend/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/login', authController.login);
router.get('/callback', authController.callback, (req, res) => res.redirect('/dashboard'));
router.get('/logout', authController.logout);

module.exports = router;
