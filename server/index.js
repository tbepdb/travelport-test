'use strict';

const
  log        = require('log4js').getLogger('start'),
  AppContext = require('./appContext').AppContext,
  bootstrap  = require('./bootstrap');

const modules = [
  './route/root',
  './route/airlines',
  './route/airports',
  './route/flightSearch'
];
const routers = [];
const appContext = new AppContext();
modules.forEach(module_name => {
  try {
    const module = require(module_name);
    routers.push(module(appContext));
  } catch (ex) {
    log.warn('error on load module ', module_name, ex);
    //Do nothing
  }
});

try {
  routers.push(require('./static'));
} catch (ex) {
  log.warn('error on load module static', ex);
  //Do nothing
}

bootstrap(routers).listen(process.env.PORT || 3000, () => {
  log.info('start server on port:', process.env.PORT || 3000);
});
