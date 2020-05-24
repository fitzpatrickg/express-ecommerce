const express = require('express');
const model = require('./model');

const router = new express.Router();

router.get('/', (req, res) => {
  model.getAllCategories()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get('/:name', (req, res) => {
  const { name } = req.params;

  model.getCategoryByName(name)
    .then((category) => {
      res.status(200).send(category);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});


module.exports = router;
