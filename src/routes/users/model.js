const User = require('../../database/models/user');
const CartItem = require('../../database/models/cartItem');

function addToCart(id, cartContent) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((user) => {
        user.cart.push(new CartItem(cartContent));
        user.save()
          .then((results) => resolve(results))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
}

function getCartById(id) {
  return User.findById(id)
    .select({ cart: 1 });
}

function emptyCart(id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((user) => {
        user.cart = [];
        return user.save();
      })
      .then((user) => resolve(user))
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteItemFromCart(userId, productId) {
  return new Promise((resolve, reject) => {
    User.findById(userId)
      .then((user) => {
        const productIndex = user.cart.findIndex((c) => c.product.toString() === productId);
        delete user.cart[productIndex];
        return user.save();
      })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  addToCart,
  getCartById,
  emptyCart,
  deleteItemFromCart,
};
