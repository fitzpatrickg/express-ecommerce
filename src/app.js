const express = require('express');
const productRouter = require('./routes/products/controller');

const app = express();

app.use(express.json());
app.use('/products', productRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

module.exports = app;
