const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');
const requestLogger = require('./utils/requestLogger');
const logger = require('./utils/logger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(requestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err, req, res, next) => {
  if (err.message.includes('not found')) {
    res.status(NOT_FOUND).json(err.message);
  } else {
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
});

process.on('uncaughtException', err => {
  logger.error(`uncaughtException: ${err.message}`);

  // eslint-disable-next-line no-process-exit
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error(`Unhandled Rejection at Promise: ${reason.stack}`);
});

module.exports = app;
