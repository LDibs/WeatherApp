const app = require('./index');
const apiKeys = require('./routes/api/apiKeys')
const request = require('supertest');

it("should get the homepage", function(done){
  request(app)
    .get('/')
    .expect(200, done);
});

it("it should respond with invalid api key", function(done){
  request(app)
  .get('/api/weather?city=melbourne&country=au&api=asodjd2')
  .expect(200)
  .expect('Invalid API key')
  .end(function(err, res) {
    if (err) throw err;
    done()
  });

});

it("it should respond with weather condition", function(done){
  request(app)
  .get('/api/weather?city=melbourne&country=au&api=261864a9-68bf-4a75-811b-fd6d134da049')
  .expect(200)
  .expect(res => res.text.includes('Report'))
  .end(function(err, res) {
    if (err) throw err;
    done()
  });
});