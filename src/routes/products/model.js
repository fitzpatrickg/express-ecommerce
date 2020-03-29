const Product = require('../../database/models/product');

function getAllProducts() {
  return Product.find().lean();
}

function getProductById(id) {
  return Product.findById(id).lean();
}

function createProduct(name, details, price, image) {
  return new Promise((resolve, reject) => {
    new Product({
      name,
      details: {
        shortDescription: details.shortDescription,
        longDescription: details.longDescription,
        color: details.color,
        bullets: details.bullets,
      },
      price,
      image: {
        description: image.description,
        url: image.url,
      },
    })
      .save((err) => {
        if (err) {
          reject(new Error(err));
        }
        resolve('successfully saved');
      });
  });
}

function updateProduct(id, product) {
  return Product.findByIdAndUpdate(id, product);
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
