'use strict';

const
  data       = require('./airlinesData.json'),
  objectPath = require('object-path'),
  log        = require('log4js').getLogger('service-airline')
  ;

/**
 * Airlines storage service
 */
class AirlinesService {

  constructor (db) {
    this.db = db;
  }

  fetchAll (callback) {
    //const that = this;
    //TODO implement storage support
    callback(null, data);
  }

  findByCode (code, callback) {
    const that = this;
    //TODO implement storage support
    that.fetchAll((err, airlines) => {
      if (err) {
        log.warn('error on fetchAll airports');
        callback(err);
      } else {
        const result = airlines.find(airline => objectPath.get(airline, 'code') === code);
        callback(err, result);
      }
    });
  }

}

exports.AirlinesService = AirlinesService;
