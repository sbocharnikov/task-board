const mongoose = require('mongoose');

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
  db.once('open', () => {
    console.log('Connected to DB');
    cb();
  });
};

module.exports = connectToDB;
