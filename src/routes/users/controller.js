const express = require('express');
const model = require('./model');

const router = new express.Router();

router.get('/:id/cart', (req, res) => {
  model.getCartById(req.params.id)
    .lean()
    .then((cart) => res.status(200).send(cart))
    .catch((err) => res.status(500).send(err));
});

router.post('/:id/cart', (req, res) => {
  model.addToCart(req.params.id, req.body)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err));
});

router.delete('/:id/cart', (req, res) => {
  model.emptyCart(req.params.id)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err));
});

router.delete('/:userId/cart/:productId', (req, res) => {
  model.deleteItemFromCart(req.params.userId, req.params.productId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
