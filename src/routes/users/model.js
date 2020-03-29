const User = require('../../database/models/user');
const CartItem = require('../../database/models/cartItem');

function addToCart(id, productToAdd) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then((user) => {
        if (!user) {
          reject(new Error('user not found'));
        }

        const { cart } = user;
        // if cart is empty, create new cart with added product
        if (cart.length < 1) {
          cart.push(new CartItem(productToAdd));
        } else {
          // if cart is not empty, check if product to add is already in cart
          const indexOfExistingProduct = cart.findIndex((itemInCart) => itemInCart.product == productToAdd.product);
          // if product is in cart, add quantities together
          if (indexOfExistingProduct !== -1) {
            cart[indexOfExistingProduct].quantity += productToAdd.quantity;
          } else {
            cart.push(productToAdd);
          }
        }
        return user.save();
      })
      .then((results) => resolve(results))
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
