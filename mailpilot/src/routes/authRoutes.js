const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Render login/register pages
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));

// Handle registration
router.post('/register', register);

// Handle login
router.post('/login', login);

// Logout (should clear JWT cookie and redirect)
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/auth/login');
    });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;
