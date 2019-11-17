const dotenv = require('dotenv')
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const router = express.Router();

const cityList = fs.readFileSync('./constants/city.list.json');
const cities = JSON.parse(cityList.toString())

const verifyLocation = (request, response, next) => {
  const city = request.query.city;
  const country = request.query.country;
  if(!city || !country) {
    response.send('Missing params');
  }
  for (let i = 0; i < cities.length; i++) {
    console.log(cities[i].name);
    if (cities[i].country === country) {
      if(cities[i].name === city) {
        return next()
      }
    }
  }
  response.send('Invalid City or Country')
}

router.get('/weather', verifyLocation, (request, response) => {
  const city = request.query.city;
  const country = request.query.country;
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