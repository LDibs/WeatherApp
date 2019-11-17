const dotenv = require('dotenv')
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const router = express.Router();

const cityList = fs.readFileSync('./constants/city.list.json');
const cities = JSON.parse(cityList.toString());

let apiKeys = {
 '9ebd42b1-a467-495c-bb9f-5933f0431a33': {
   counter: 0,
 },
 'a07833c3-adc1-4841-8996-965b87815438': {
   counter: 0,
 },
 '261864a9-68bf-4a75-811b-fd6d134da049': {
   counter: 0,
 },
 'a638f906-8fb4-4365-8661-8da80cfaa29b': {
   counter: 0,
 },
 '18c4b2c0-9ace-48a1-9708-ae0ce8abd59a': {
   counter: 0,
 },
}

const verifyApi = (request, response, next) => {
  const api = request.query.api;
  if(!api) {
    return response.send('Missing API Key')
  }
  if(apiKeys[api]) {
    if(apiKeys[api].counter === 0) {
      apiKeys[api].counter++
      setTimeout(() => {
        apiKeys[api].counter = 0
      },60*60*1000)
    } else if (apiKeys[api].counter === 5) {
      return response.send('You have reached your API limit')
    } else {
      apiKeys[api].counter++
    }
    return next();
  } else {
    return response.send('Invalid API key')
  }
}

const verifyLocation = (request, response, next) => {
  const city = request.query.city;
  const country = request.query.country;
  if(!city || !country) {
    return response.send('Missing params');
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

router.get('/weather', verifyApi, verifyLocation, (request, response) => {
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