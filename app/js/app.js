/*jshint browserify: true */
'use strict';

var $ = require('jquery');
var parsed = require('./parsed.js');

var getWeather = function(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  $("#locate").on("click", function() {
    $.ajax({
      url: '/findplace',
      type: "post",
      data: {"latitude": lat, "longitude": lon},
      success: function(data) {
        var place = parsed(data);
        // console.log(parsed);
        if (data.hasOwnProperty('name')) {
          $('#commenttext').html('<h2>' +
            'Destination: ' + place.name +
            '</h2> <ul>' +
              '<li> Location: ' + place.city + ', ' + place.state +
              '<li> Directions: ' + place.directions +
              '<li> Activities: ' + place.activity +
              '<li> Website: ' + place.url +
            '</ul>'
          );
        } else {
          $('#noresults').removeClass('hidden');
          $('#noresults').addClass('active');
        }
      },
      dataType: 'json'
    });
  });
};

$(document).ready(function() {
//get geolocation data on page load
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather, function(err) {
      if (err) $('#commenttext').html('Sorry, we had an error finding your location.');
    });
  } else {
    $('#commenttext').html('Please allow geolocation so we can find your next adventure.');
  }
});
