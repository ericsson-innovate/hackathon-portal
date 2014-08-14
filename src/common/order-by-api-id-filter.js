'use strict';

angular.module('orderByApiIdFilter', [])

/**
 * @ngdoc filter
 * @name orderByApiId
 * @description
 *
 * This is a filter for ordering the API call items by ID.
 */
.filter('orderByApiId', function () {
  return function (input) {
    input.sort(function (a, b) {
      return parseFloat(a.specification.docNumber.substr(2)) -
          parseFloat(b.specification.docNumber.substr(2))
    });
    return input;
  }
});
