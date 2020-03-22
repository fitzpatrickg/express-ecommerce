const faker = require('faker'); // generates fake data
const Product = require('../models/product');

require('../mongoose');

// generates fake data for the products collection
for (let i = 0; i < 10; i++) {
  const bullets = [];

  // generate bullet point list
  for (let j = 0; j < 3; j++) {
    if (j < 2) {
      bullets.push(faker.commerce.productAdjective());
    } else {
      bullets.push(faker.commerce.productMaterial());
    }
  }

  const p = new Product({
    name: faker.commerce.product(),
    price: faker.commerce.price(),
    image: {
      description: faker.commerce.productName(),
      url: faker.image.imageUrl(),
    },
    details: {
      shortDescription: faker.lorem.sentence(),
      longDescription: faker.lorem.paragraphs(),
      color: faker.commerce.color(),
      bullets,
    },
  });

  p.save((err) => {
    if (err) return console.log(err);
    console.log(`#${i + 1} saved successfully!`);
  });
}
