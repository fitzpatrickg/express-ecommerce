const express = require('express');
const model = require('./model');

const router = new express.Router();

router.get('/', (req, res) => {
  model.getAllProducts()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get('/:id', (req, res) => {
  model.getProductById(req.params.id)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/', (req, res) => {
  model.createProduct(
    req.body.name,
    {
      shortDescription: req.body.details.shortDescription,
      longDescription: req.body.details.longDescription,
      color: req.body.details.color,
      bullets: req.body.details.bullets,
    },
    req.body.price,
    {
      description: req.body.image.description,
      url: req.body.image.url,
    },
  )
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

router.put('/:id', (req, res) => {
  const product = {
    name: req.body.name,
    details: {
      shortDescription: req.body.details.shortDescription,
      longDescription: req.body.details.longDescription,
      color: req.body.details.color,
      bullets: req.body.details.bullets,
    },
    price: req.body.price,
    image: {
      description: req.body.image.description,
      url: req.body.image.url,
    },
  };

  model.updateProduct(req.params.id, product)
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
