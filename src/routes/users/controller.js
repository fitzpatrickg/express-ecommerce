const express = require('express');
const model = require('./model');
const auth = require('../../middleware/auth/auth');

const router = new express.Router();

const User = require('../../database/models/user');

// authenticates and logs in user
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  model.authenticateUser(email, password)
    .then((user) => {
      console.log(req);
      res.status(200).send(user);
    })
    .catch((err) => res.status(401).send(err));
});

// gets logged in user profile
router.get('/me', auth, (req, res) => {
  res.status(200).send(req.user);
});

// create new user
router.post('/', (req, res) => {
  new User(req.body)
    .save()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(500).send(err));
});

// get user cart
router.get('/:id/cart', auth, (req, res) => {
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
