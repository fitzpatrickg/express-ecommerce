const express = require('express');
const model = require('./model');
const User = require('../../database/models/user');
const CartItem = require('../../database/models/cartItem');

const router = new express.Router();

router.post('/:id/cart', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.cart.push(new CartItem(req.body));
      user.save()
        .then((results) => res.status(200).send(results))
        .catch((err) => res.status(500).send(err));
    })
    .catch((err) => res.status(500).send(err));
});


module.exports = router;
