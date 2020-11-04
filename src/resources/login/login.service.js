const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = require('../../common/config');

const findUser = async (login, password) => {
  const candidate = await User.findOne({ login });
  if (!candidate) {
    return null;
  }

  const areSame = await bcrypt.compare(password, candidate.password);
  if (!areSame) {
    return null;
  }
  return candidate;
};

const getToken = user => {
  const { id, login } = user;
  const token = jwt.sign({ id, login }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN
  });

  return token;
};

module.exports = { findUser, getToken };
