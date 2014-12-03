'use strict';

var chai = require('chai');
var chaihttp = require("chai-http");
var expect = chai.expect;
require('../../server.js');
chai.use(chaihttp);

var port = process.env.PORT || 3000;
var url = 'http://localhost:' + port;

describe('finding an outdoor activity near you', function() {
  this.timeout(15000);
  it('should return one outdoor activity location per request', function(done) {
    chai.request(url)
    .post('/findplace')
    .send({'latitude': 47.606, 'longitude': -122.332})
    .end(function(err, res) {
      expect(res.body).to.have.property('city');
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('directions');
      done();
    });
  });
});
