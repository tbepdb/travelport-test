'use strict';

/* global define*/
define('fetchAirlines', [
  'jquery'
], function ($) {
  return function (callback) {
    $.ajax({
      type: 'GET',
      url: '/airlines',
      success (data, textStatus) {
        if (textStatus === 'success') {
          callback(null, data);
        } else {
          callback(textStatus);
        }
      },
      error (err) {
        callback(err);
      }
    });
  };
});
