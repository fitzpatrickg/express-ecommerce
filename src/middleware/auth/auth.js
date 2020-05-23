const jwt = require('jsonwebtoken');
const User = require('../../database/models/user');

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  const decodedToken = jwt.verify(token, 'carolbaskinkilledherhusband');

  User.findOne({ _id: decodedToken._id, 'tokens.token': token })
    .then((user) => {
      if (!user) {
        throw new Error('no user found.');
      }
      console.log(token);
      req.header('Authorization', `Bearer ${token}`);
      req.user = user;
      next();
    })
    .catch((err) => {
      res.status(401).send({ error: 'Please Authenticate', err });
    });
};

module.exports = auth;
