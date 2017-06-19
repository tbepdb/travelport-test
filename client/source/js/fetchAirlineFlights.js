'use strict';
/* global define*/

define('fetchAirlineFlights', [
  'jquery'
], function ($) {
  return function (airlineCode, prmStr, callback) {
    $.ajax({
      type: 'GET',
      url: '/flight_search/' + airlineCode + '?' + prmStr,
      success: function (data, textStatus) {
        if (textStatus === 'success') {
          callback(null, data);
        } else {
          callback(textStatus);
        }
      },
      error: function (err) {
        callback(err);
      }
    });
  };
});
