const mongoose = require('mongoose');
const cartItemSchema = require('../schemas/cartItem');

const Cart = mongoose.model('CartItem', cartItemSchema);

module.exports = Cart;
