const mongoose = require('mongoose');
const usersService = require('../resources/users/user.service');
const logger = require('../utils/logger');

const connectToDB = cb => {
  const { MONGO_CONNECTION_STRING } = process.env;

  const mongooseOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false
  };

  mongoose.connect(MONGO_CONNECTION_STRING, mongooseOptions);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    logger.info('Connected to DB');
    try {
      await db.dropCollection('users');
      await db.dropCollection('tasks');
      await db.dropCollection('boards');
    } catch (e) {
      logger.error('Failed to drop collections');
    }
    await usersService.create({ login: 'admin', password: 'admin' });
    cb();
  });
};

module.exports = connectToDB;
