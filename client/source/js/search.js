'use strict';

/* global require, document*/
require([
  'jquery',
  'async',
  'lodash',
  'moment',
  'objectPath',
  'log',
  'fetchAirlines',
  'fetchAirlineFlights',
  'SearchResult'
], function (
  $,
  async,
  lodash,
  moment,
  objectPath,
  log,
  fetchAirlines,
  fetchAirlineFlights,
  SearchResult
) {
  $(document).on('submit', 'form#flight-search', function () {
    const that = this,
      date = $(that).find('#date').val(),
      from = $(that).find('#from').val(),
      to = $(that).find('#to').val(),
      dateM = moment(date, 'YYYY-MM-DD');
    let searchResult;

    async.auto({
      airlines: fetchAirlines,
      dates (callback) {
        const dates = [
          dateM,
          moment(date, 'YYYY-MM-DD').add(1, 'day'),
          moment(date, 'YYYY-MM-DD').add(2, 'day'),
          moment(date, 'YYYY-MM-DD').add(-1, 'day'),
          moment(date, 'YYYY-MM-DD').add(-2, 'day')
        ];
        callback(null, dates);
      },
      searchResult: ['dates', 'airlines', (data, callback) => {
        log.info(objectPath.get(data, 'dates.length', 0) * objectPath.get(data, 'airlines.length', 0));
        searchResult = new SearchResult(dateM, objectPath.get(data, 'dates.length', 0) * objectPath.get(data, 'airlines.length', 0));
        objectPath.get(data, 'dates', []).concat().sort((a, b) => b.isBefore(a)).forEach(function (dateM) {
          searchResult.appendDate(dateM);
        });
        searchResult.selectDate(dateM);
        callback(null, searchResult);
      }],
      flights: ['airlines', function (data, callback) {
        async.each(data.dates, function (dateM, callback) {
          async.each(data.airlines, function (airline, callback) {
            const prmStr =  $.param({
              date: dateM.format('YYYY-MM-DD'),
              to,
              from
            });
            fetchAirlineFlights(airline.code, prmStr, function (err, flights) {
              if (flights) {
                flights.forEach(function (flight) {
                  searchResult.appendFlight(dateM, flight);
                });
              }
              searchResult.airlineDone();
              callback(null, flights);
            });
          }, callback);
        }, callback);
      }]
    }, function (err) {
      if (err) {
        log.warn(`unexpected error ${err}`);
      }
    });
    return false;
  });
});
