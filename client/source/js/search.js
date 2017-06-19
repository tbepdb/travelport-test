/* global require*/
'use strict';
require([
  'jquery',
  'async',
  'lodash',
  'log',
  'fetchAirlines',
  'fetchAirlineFlights'
], function (
  $,
  async,
  lodash,
  log,
  fetchAirlines,
  fetchAirlineFlights
) {
  $(document).on('submit', 'form#flight-search', function () {
    var that = this, prmStr =  $(that).serialize();

    async.auto({
      airlines: fetchAirlines,
      flights: ['airlines', function (data, callback) {
        async.map(data.airlines, function (airline, callback) {
          fetchAirlineFlights(airline.code, prmStr, callback);
        }, callback);
      }]
    }, function (err, result) {
      if (err) {
        log.warn('unexpected error' + err);
      }
      log.info(err, result);
    });
    return false;
  });
});
