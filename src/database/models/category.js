const mongoose = require('mongoose');
const categorySchema = require('../schemas/category');
require('../mongoose');

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
