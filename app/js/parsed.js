/*jshint browserify: true*/
'use strict';

module.exports = function(data) {
  var city = data.city;
  var state = data.state;
  var name = data.name;
  var directions = data.directions;
  var activity = '';
  var url = '';

  for (var i = 0; i < data.activities.length; i++) {
    if (data.activities[i].activity_type_name) {
      activity += (' ' + data.activities[i].activity_type_name);
    }
    if (data.activities[i].url) {
      url += (' ' + data.activities[i].url + '\n');
    }
  }

  return {city: city, state: state, name: name, directions: directions, activity: activity, url: url};
};
