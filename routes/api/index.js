const dotenv = require('dotenv')
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/ping', (request, response) => {
  response.send('working');
})

router.get('/weather', (request, response) => {
  const city = request.query.city;
  const country = request.query.country;
  if(!city || !country) {
    response.send('Missing params');
  }
  axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.API_KEY}`)
  .then(result => {
    const description = result.data.weather[0].description;
    response.send(description);
  })
  .catch(error => {
    console.log(error);
    response.send('Something went wrong');
  })
})

module.exports = router;