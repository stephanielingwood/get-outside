/*jshint node: true*/
'use strict';

var express = require('express');
var app = express();
var superagent = require('superagent');

var bodyparser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/build/'));

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.post('/findplace', function(req, res) {

  //receive geolocation
  var lat = req.body.latitude;
  var lon = req.body.longitude;

  //put zip and key into trail api and find records within 60 miles
  var trailApiUrl = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=' + process.env.TRAILAPI + '&lat=' + lat + '&lon=' + lon + '&radius=60&limit=100';

  superagent
    .get(trailApiUrl)

    .end(function(err, response) {

      if (err) console.log('superagent req error ' + err);
      var prettified = JSON.parse(response.text);

      //generate random number to select an outdoor place from the api response
      var random = Math.floor(Math.random() * (prettified.places.length - 1));
      res.json(prettified.places[random]);

    });
});

app.listen(port, function() {
  console.log('Server started on port %d', port);
});
