'use strict';

const
  data       = require('./airportsData.json'),
  objectPath = require('object-path'),
  log        = require('log4js').getLogger('service-airports')
  ;

/**
 * Airports storage service
 */
class AirportsService {

  constructor (db) {
    this.db = db;
  }

  fetchAll (callback) {
    //const that = this;
    //TODO implement storage support
    callback(null, data);
  }

  find (query, callback) {
    const that = this;
    //TODO implement storage support
    that.fetchAll((err, airports) => {
      if (err) {
        log.warn('error on fetchAll airports');
        callback(err);
      } else {
        const result = [];
        airports.forEach(airport => {
          if (objectPath.get(airport, 'airportCode') === query ||
            objectPath.get(airport, 'cityName') === query ||
            objectPath.get(airport, 'cityCode') === query
          ) {
            result.push(airport);
          }
        });
        callback(err, result);
      }
    });
  }
}

exports.AirportsService = AirportsService;
