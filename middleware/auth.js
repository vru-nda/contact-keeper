const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //get token from header
  const token = req.header('x-auth-token');

  // check if token exist
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};
