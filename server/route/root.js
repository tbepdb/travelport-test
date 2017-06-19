'use strict';

const
  Router         = require('express').Router;

exports = module.exports = () => {
  const router = Router();
  router.get('/', (req, res) => {
    res.render('root', {
    });
  });
  return router;
};
