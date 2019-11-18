const apiKeys = require('./apiKeys')

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

module.exports = verifyApi;