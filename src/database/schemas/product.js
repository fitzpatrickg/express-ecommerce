const { Schema } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  details: {
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    bullets: {
      type: Array,
      required: true,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

module.exports = productSchema;
