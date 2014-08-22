'use strict';

angular.module('unescapeJsonStringFilter', [])

/**
 * @ngdoc filter
 * @name unescapeJsonString
 * @description
 *
 * This is a filter for unescaping characters in a JSON string.
 */
.filter('unescapeJsonString', function () {
  var token = '########',
      tokenRegex = /########/g;
  return function (input) {
    if (input[0] === '"') {
      input.substr(1, input.length - 2);
    }
    return input
        .replace(/\\\\/g, token)
        .replace(/\\n/g, '\n')
        .replace(/\\'/g, '\'')
        .replace(/\\"/g, '"')
        .replace(/\\&/g, '&')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f')
        .replace(tokenRegex, '\\');
  };
});
