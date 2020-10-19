const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  if (err) {
    logger.error(`${err.message}`);
  }
  if (err.message.includes('not found')) {
    res.status(NOT_FOUND).json(err.message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorHandler;
