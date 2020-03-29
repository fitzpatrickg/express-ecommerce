/* eslint-disable func-names */
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  individualPrice: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
  },
});

cartItemSchema.pre('save', function () {
  this.price = this.individualPrice * this.quantity;
});

module.exports = cartItemSchema;
