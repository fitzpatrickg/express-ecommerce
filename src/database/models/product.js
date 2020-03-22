const mongoose = require('mongoose');
require('../mongoose');

const Product = mongoose.model('Product', {
    name: {
        type: String
    }
});

module.exports = Product;