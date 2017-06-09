'use strict';

const
  Router      = require('express').Router;

exports = module.exports = appContext => {
  const router = Router();
  router.get('/flight_search/:airlineCode', (req, res) => {
    const prm = req.allPrm();
    appContext.flightSearchService.search({
      airlineCode: prm.airlineCode,
      date: prm.date,
      to: prm.to,
      from: prm.from
    }, (err, flights) => {
      if (err) {
        res.status(500).send('Error on request flight_search');
      } else {
        res.json(flights);
      }
    });
  });
  return router;
};
