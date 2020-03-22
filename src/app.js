const express = require('express');
const Product = require('./database/models/product');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

module.exports = app;
