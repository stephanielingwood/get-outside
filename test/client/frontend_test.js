/*jshint browserify: true*/
'use strict';

var expect = require('chai').expect;
var app = require('../../app/js/app.js');
var parsed = require('../../app/js/parsed.js');

describe('client test', function() {
  var data;

  before(function() {
    data = {city: 'Mount Vernon', state: 'Washington', country: 'United States', name: 'Little Mountain ', activities: []};
  });

  it('returns a place to go for outdoor adventure', function() {
    expect(parsed(data)).to.have.property('name');
  });

});
