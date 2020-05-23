const path = require('path');
const express = require('express');
const productRouter = require('./routes/products/controller');
const userRouter = require('./routes/users/controller');

const app = express();
require('dotenv').config();

app.use(express.json());
app.use('/products', productRouter);
app.use('/users', userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

module.exports = app;
