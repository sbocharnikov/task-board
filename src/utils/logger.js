const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }),
    new transports.File({
      filename: 'info.log',
      level: 'info',
      handleExceptions: true,
      json: true
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
