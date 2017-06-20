'use strict';

/* global define, console, window*/
/* eslint no-console: 0 */

define('log', [
], function () {
  /** TODO append implementation remote logging service */
  function f () {
    return undefined;
  }

  if (!window.console) {
    window.console = {
      log: f, info: f, warn: f, debug: f, error: f
    };
  }

  return {
    info: Function.prototype.bind.call(console.log, console),
    warn: Function.prototype.bind.call(console.warn, console)
  };
});
