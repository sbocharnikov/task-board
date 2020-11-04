const { JWT_SECRET_KEY } = require('../common/config');
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Access token is missing or invalid');
  }

  const [type, token] = authHeader.split(' ');
  if (type === 'Bearer' && token) {
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        throw new Error('Access token is missing or invalid');
      }
      return next();
    });
  } else {
    throw new Error('Access token is missing or invalid');
  }
};
