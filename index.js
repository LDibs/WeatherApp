const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.SERVER_PORT || 5000;

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
  app.use(express.json());
  app.use(cors());
  app.use('/', require('./routes'));
});
