const dotenv = require('dotenv').config();
const express = require('express');

const app = express();

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
  app.use(express.json());
  app.use('/', require('./routes'));
});

module.exports = app;