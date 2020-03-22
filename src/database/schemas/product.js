const { Schema } = require('mongoose');

const productSchema = new Schema({
  name: String,
});

module.exports = productSchema;
