const fs = require('fs');

const cityList = fs.readFileSync('./constants/city.list.json');
const cities = JSON.parse(cityList.toString());

const verifyLocation = (request, response, next) => {
    let city = request.query.city;
    let country = request.query.country;
    if(!city || !country) {
      return response.send('Missing params');
    }
    country = country.toUpperCase();
    city = city.charAt(0).toUpperCase() + city.slice(1);
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].country === country) {
        if(cities[i].name === city) {
          return next()
        }
      }
    }
    response.send('Invalid City or Country')
}

module.exports = verifyLocation;