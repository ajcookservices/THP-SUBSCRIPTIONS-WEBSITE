// backend/controllers/authController.js

const passport = require('passport');

exports.login = passport.authenticate('discord');

exports.callback = passport.authenticate('discord', { failureRedirect: '/' });

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
