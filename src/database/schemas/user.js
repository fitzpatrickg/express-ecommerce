// TODO add user schema
const { Schema } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cartItemSchema = require('./cartItem');
const User = require('../models/user');

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
  tokens: {
    type: Array,
    required: false,
  },
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

userSchema.methods.generateAuthToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, 'carolbaskinkilledherhusband');

  user.tokens = user.tokens.concat({ token });

  user.save()
    .then(() => token)
    .catch((err) => err);
};

userSchema.statics.findByCredentials = function (email, password) {
  let user = null;

  User.findOne({ email })
    .then((foundUser) => {
      if (!user) {
        throw new Error('Unable to login');
      }
      user = foundUser;
      return bcrypt.compare(password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        throw new Error('Unable to login');
      }
      return user;
    })
    .catch((err) => {
      throw new Error('Unable to login', err);
    });
};

module.exports = userSchema;
