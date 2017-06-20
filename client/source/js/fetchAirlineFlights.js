'use strict';

/* global define*/
define('fetchAirlineFlights', [
  'jquery',
  'log'
], function ($, log) {
  return function (airlineCode, prmStr, callback) {
    log.info(`/flight_search/${airlineCode}?${prmStr}`);
    $.ajax({
      type: 'GET',
      url: `/flight_search/${airlineCode}?${prmStr}`,
      success (data, textStatus) {
        if (textStatus === 'success') {
          callback(null, data);
        } else {
          callback(textStatus);
        }
      },
      error (err) {
        callback(err);
      }
    });
  };
});
