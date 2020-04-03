const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer', '');

  const decodedToken = jwt.verify(token, 'carolbaskinkilledherhusband');

  User.findOne({ _id: decodedToken._id, 'tokens.token': token })
    .then((user) => {
      if (!user) {
        throw new Error('no user found.');
      }
    })
    .catch((err) => {
      res.status(401).send({ error: 'Please Authenticate', err });
    });

  next();
};

module.exports = auth;
