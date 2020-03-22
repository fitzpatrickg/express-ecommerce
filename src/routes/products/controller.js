const express = require('express');
const Product = require('../../database/models/product');

const router = new express.Router();

router.get('/', (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
