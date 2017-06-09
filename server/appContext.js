'use strict';

const
  AirlinesService = require('./service/airlinesService').AirlinesService,
  AirportsService = require('./service/airportsService').AirportsService,
  FlightSearchService = require('./service/flightSearchService').FlightSearchService
  ;

class AppContext {

  constructor () {
    this.db = null;
    this._airlinesService = new AirlinesService(this.db);
    this._airportsService = new AirportsService(this.db);
    this._flightSearchService = new FlightSearchService(this.db, this.airlinesService, this.airportsService);
  }

  get airlinesService () {
    return this._airlinesService;
  }

  get airportsService () {
    return this._airportsService;
  }

  get flightSearchService () {
    return this._flightSearchService;
  }

}

exports.AppContext = AppContext;
