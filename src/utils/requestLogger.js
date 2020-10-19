const logger = require('./logger');

const requestLogger = (req, res, next) => {
  const { url, query, body } = req;
  logger.log(
    'info',
    `url: ${url}, query params: ${JSON.stringify(
      query
    )}, body: ${JSON.stringify(body)}`
  );

  next();
};

module.exports = requestLogger;
