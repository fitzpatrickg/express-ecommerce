// TODO add user schema
const { Schema } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const cartItemSchema = require('./cartItem');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('email is not valid');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    // validate(value) {
    //   if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)) {
    //     throw new Error(
    //       `Password must be at least 7 characters, no more than 16 characters, and must include at least
    //       one upper case letter, one lower case letter, and one numeric digit.`,
    //     );
    //   }
    // },
  },
  cart: [cartItemSchema],
});

// middleware for encrypting passwords
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    bcrypt.hash(user.password, 8)
      .then((encryptedPassword) => {
        user.password = encryptedPassword;
        next();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = userSchema;
