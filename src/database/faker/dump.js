// drops documents from all collections - invoked with npm run dump
const Product = require('../models/product');
const Category = require('../models/category');

require('../mongoose');

Product.deleteMany({}, (err) => {
  if (err) return console.log(err);
  console.log('products removed');
});

Category.deleteMany({}, (err) => {
  if (err) return console.log(err);
  console.log('categories removed');
});
