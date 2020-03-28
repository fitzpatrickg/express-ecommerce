/* eslint-disable prefer-const */
// creates database, collections and documents with fake data - invoked with npm run seed

const faker = require('faker');
const Product = require('../models/product');
const Category = require('../models/category');

require('../mongoose');

const categoryMap = new Map();

// generates fake data for the products collection
for (let i = 0; i < 8000; i++) {
  let bullets = [];

  // generate bullet point list
  for (let j = 0; j < 3; j++) {
    if (j < 2) {
      let cat = faker.commerce.productAdjective();
      bullets.push(cat);
    } else {
      let cat = faker.commerce.productMaterial();
      bullets.push(cat);
      let v = categoryMap.get(cat) ? categoryMap.get(cat) + 1 : 1;
      categoryMap.set(cat, v);
    }
  }

  let p = new Product({
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
    category: bullets[2],
  });

  p.save((err) => {
    if (err) return console.log(err);
  });
}

// see number of products in each category
console.log('*** Categories and the number of products in them ***\n', categoryMap);

const categoryList = Array.from(categoryMap.keys());

for (let i = 0; i < categoryList.length; i++) {
  let c = new Category({
    name: categoryList[i],
    image: {
      description: faker.commerce.productName(),
      url: faker.image.imageUrl(),
    },
    details: {
      shortDescription: faker.lorem.sentence(),
      longDescription: faker.lorem.paragraphs(),
    },
  });

  c.save((err) => {
    if (err) return console.log(err);
  });
}
