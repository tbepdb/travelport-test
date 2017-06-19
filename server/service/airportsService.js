'use strict';

const
  log        = require('log4js').getLogger('service-airports'),
  http       = require('http'),
  url       = require('url')
  ;

/**
 * Airports storage service
 */
class AirportsService {

  constructor (db) {
    this.db = db;
  }

  find (query, callback) {
    //TODO implement storage support
    const options = {
      protocol: 'http:',
      host: 'node.locomote.com',
      pathname: `/code-task/airports`,
      query: {
        q: query
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

exports.AirportsService = AirportsService;
