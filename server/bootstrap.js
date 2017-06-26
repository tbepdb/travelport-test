'use strict';

const express      = require('express'),
  domain         = require('domain'),
  bodyParser     = require('body-parser'),
  methodOverride = require('method-override'),
  http           = require('http'),

  path           = require('path'),
  url            = require('url'),
  slashes        = require('connect-slashes');

if (!process.env.LOG4JS_CONFIG) {
  process.env.LOG4JS_CONFIG = './log4js.json';
}
const
  log = require('log4js').getLogger('bootstrap');

function hideFramework (app) {
  //annonimize response framework info
  app.disable('x-powered-by');
}

function initErrorHandler (app) {
  app.use((req, res, next) => {
    req.on('error', e => {
      log.error(e);
    });
    next();
  });
  app.enable('verbose errors');
  let count = 0;
  app.use((req, res, next) => {
    const d = domain.create();
    count = count + 1;
    d.id = req.url + new Date().getTime() + count;
    d.add(req);
    d.add(res);
    d.run(() => {
      next();
    });
    d.on('error', e => {
      log.error(e);
      next(e);
    });
  });
}

function initTemplateRender (app) {
  app.set('view engine', 'pug');
  if (process.env.NODE_ENV === 'production') {
    app.enable('view cache');
  }
  app.set('views', path.resolve(path.dirname(require.main.filename), '..', 'views'));
}

function initRequestParsers (app) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  // parse application/json
  app.use(bodyParser.json());

  app.use(methodOverride('X-HTTP-Method-Override'));
  app.use(slashes(false));
}

function addRequestPrmHelpers (app) {
  app.use((req, res, next) => {
    req.routePrm = () => Object.assign({}, req.params || {});
    req.queryPrm = () => Object.assign({}, url.parse(req.originalUrl, true).query || {});
    req.bodyPrm = () => Object.assign({}, req.body || {});
    req.allPrm = () => Object.assign(Object.assign(req.queryPrm(), req.routePrm()), req.bodyPrm());
    next();
  });
}

function addErrorLogger (app) {
  app.use((req, res, next) => {
    if (res.status === 500) {
      log.error(res.status);
    }
    next();
  });
}

function pageNotFound (app) {
  app.use((req, res) => {
    res.status(404).render('error/404', {});
  });
}

function createServer (app) {
  const server = http.createServer(app);

  server.on('error', e => {
    log.error(e);
  });

  return server;
}

exports = module.exports = midlewares => {
  /**
   * Module dependencies.
   */
  const
    app    = express();

  hideFramework(app);
  initErrorHandler(app);
  initTemplateRender(app);
  initRequestParsers(app);
  addRequestPrmHelpers(app);

  if (midlewares) {
    midlewares.forEach(midleware => {
      app.use(midleware);
    });
  }

  addErrorLogger(app);
  pageNotFound(app);
  return createServer(app);
};
