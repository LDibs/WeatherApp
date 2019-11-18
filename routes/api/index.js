const dotenv = require('dotenv')
const express = require('express');
const axios = require('axios');

const router = express.Router();

const verifyLocation = require('./verifyLocation')
const verifyApi = require('./verifyApi')

router.get('/weather', verifyApi, verifyLocation, (request, response) => {
  const city = request.query.city;
  const country = request.query.country;
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.API_KEY}`)
  .then(result => {
    const description = `Report: ${result.data.weather[0].description}`
    response.send(description);
  })
  .catch(error => {
    console.log(error);
    response.send('Something went wrong');
  })
})

module.exports = router;