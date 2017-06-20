'use strict';

/* global define*/

define('location', [
  'jquery',
  'lodash',
  'jquery.autocomplete'
], function ($, _) {
  return function (id) {
    $(id).autocomplete({
      serviceUrl: '/airports',
      type: 'GET',
      paramName: 'q',
      minChars: 2,
      transformResult (response) {
        if (typeof response === 'string') {
          return {
            suggestions: _.map($.parseJSON(response), function (item) {
              return {
                value: item.airportCode,
                data: item
              };
            })
          };
        }
        return {
          suggestions: []
        };
      },
      formatResult (suggestion, currentValue) {
        const s = `(${suggestion.value}) ${suggestion.data.airportName}`;

        if (!currentValue) {
          return s;
        }

        const pattern = `(${currentValue.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')})`;

        return s.
          replace(new RegExp(pattern, 'gi'), '<strong>$1<\/strong>').
          replace(/&/g, '&amp;').
          replace(/</g, '&lt;').
          replace(/>/g, '&gt;').
          replace(/"/g, '&quot;').
          replace(/&lt;(\/?strong)&gt;/g, '<$1>');
      }
    });
  };
});
