const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_DEV_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose;
