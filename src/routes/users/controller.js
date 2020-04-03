const express = require('express');
const model = require('./model');
const auth = require('../../middleware/auth/auth');

const router = new express.Router();

const User = require('../../database/models/user');

router.post('/login', (req, res) => {
  User.findByCredentials(req.body.email, req.body.password)
    .then((user) => {
      user.generateAuthToken()
        .then((token) => {
          res.status(200).send(token);
        })
        .catch((err) => {
          res.status(401).send(err);
        });
    })
    .catch((err) => {
      res.status(401).send(err);
    });
});

// create new user
router.post('/', (req, res) => {
  new User(req.body)
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

// get user cart
router.get('/:id/cart', (req, res) => {
  model.getCartById(req.params.id)
    .lean()
    .then((cart) => res.status(200).send(cart))
    .catch((err) => res.status(500).send(err));
});

// add to user cart
router.post('/:id/cart', (req, res) => {
  model.addToCart(req.params.id, req.body)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err));
});

// delete user cart
router.delete('/:id/cart', (req, res) => {
  model.emptyCart(req.params.id)
    .then((results) => res.status(200).send(results))
    .catch((err) => res.status(500).send(err));
});

// delete product in user cart
router.delete('/:userId/cart/:productId', (req, res) => {
  model.deleteItemFromCart(req.params.userId, req.params.productId)
    .then((user) => res.status(200).send(user))
    .catch((err) => res.status(500).send(err));
});

module.exports = router;
