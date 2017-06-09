'use strict';

const
  Router         = require('express').Router;

exports = module.exports = appContext => {
  const router = Router();
  router.get('/airlines', (req, res) => {
    appContext.airlinesService.fetchAll((err, airlines) => {
      if (err) {
        res.status(500).send('Error on request airlines ');
      } else {
        res.json(airlines);
      }
    });
  });
  return router;
};
