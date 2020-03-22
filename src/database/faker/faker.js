const faker = require('faker'); // generates fake data
const Product = require('../models/product');

require('../mongoose');

// generates fake data for the products collection
for (let i = 0; i < 10; i++) {
  const p = new Product({
    name: faker.commerce.product(),
    description: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: {
      description: faker.commerce.productName(),
      url: faker.image.imageUrl(),
    },
  });

  p.save((err) => {
    if (err) return console.log(err);
    console.log(`#${i + 1} saved successfully!`);
  });
}
