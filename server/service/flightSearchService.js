'use strict';

const
  log        = require('log4js').getLogger('service-flight-search'),
  http       = require('http'),
  url       = require('url')
  ;
/**
 * Airports storage service
 */
class FlightSearchService {

  constructor (db, airlineService, airportService) {
    this.db = db;
    this.airlineService = airlineService;
    this.airportService = airportService;
  }
  /*
  checkAirline (airlineCode, callback) {
    const that = this;
    that.airlineService.findByCode(airlineCode, (err, airline) => {
      callback(Boolean(airline));
    });
  }

  check (prm, callback) {
    async.each()
  }
  */

  search (prm, callback) {
    //const that = this;
    //TODO implement storage support
    const options = {
      protocol: 'http:',
      host: 'node.locomote.com',
      pathname: `/code-task/flight_search/${prm.airlineCode}/`,
      query: {
        from: prm.from,
        to: prm.to,
        date: prm.date
      }
    };
    const req = http.get(url.format(options), res => {
      log.info(`STATUS: ${res.statusCode}`);
      log.info(`HEADERS: ${JSON.stringify(res.headers)}`);

      // Buffer the body entirely for processing as a whole.
      const bodyChunks = [];
      res.on('data', chunk => {
        // You can process streamed parts here...
        bodyChunks.push(chunk);
      }).on('end', () => {
        const body = Buffer.concat(bodyChunks);
        log.info(`BODY: ${body}`);
        // ...and/or process the entire body here.
        callback(null, JSON.parse(body.toString()));
      });
    });

    req.on('error', e => {
      log.warn('ERROR: ', e.message);
      callback(null, []);
    });

  }
}

exports.FlightSearchService = FlightSearchService;
