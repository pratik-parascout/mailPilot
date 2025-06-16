const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Try header first (API), then cookie (views)
  let token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token && req.cookies) token = req.cookies.token;
  if (!token) {
    // For EJS views, redirect to login
    if (req.accepts('html')) return res.redirect('/login');
    return res.status(401).json({ msg: 'No token, access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (err) {
    if (req.accepts('html')) return res.redirect('/login');
    res.status(401).json({ msg: 'Invalid token' });
  }
};
