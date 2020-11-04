const mongoose = require('mongoose');
const usersService = require('../resources/users/user.service');

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
    console.log('Connected to DB');
    await usersService.create({ login: 'admin', password: 'admin' });
    cb();
  });
};

module.exports = connectToDB;
