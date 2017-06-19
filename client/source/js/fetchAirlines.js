'use strict';
/* global define*/

define('fetchAirlines', [
  'jquery',
  'log'
], function ($, log) {
  return function (callback) {
    $.ajax({
      type: 'GET',
      url: '/airlines',
      success: function (data, textStatus) {
        if (textStatus === 'success') {
          log.info(data);
          callback(null, data);
        } else {
          callback(textStatus);
        }
      },
      error: function (err) {
        callback(err);
      }
    });
  };
});
