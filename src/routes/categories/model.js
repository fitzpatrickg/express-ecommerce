const Category = require('../../database/models/category');

function getAllCategories() {
  return Category.find();
}

function getCategoryByName(name) {
  return Category.findOne({ name });
}

module.exports = {
  getAllCategories,
  getCategoryByName,
};
