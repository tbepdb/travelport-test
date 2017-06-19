/* global require require*/
'use strict';
require([
  'jquery'
], function ($) {
  require([
    'bootstrap.datepicker'
  ], function () {
    $('#date').datepicker({
      startDate: new Date(),
      format: 'yyyy-mm-dd',
      todayHighlight: true
    });
  });
});
