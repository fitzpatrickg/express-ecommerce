const mongoose = require('mongoose');
const productSchema = require('../schemas/product');
require('../mongoose');

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
