'use strict';

angular.module('orderApiCallsFilter', [])

/**
 * @ngdoc filter
 * @name orderApiCalls
 * @description
 *
 * This is a filter for ordering the API call items by ID.
 */
.filter('orderApiCalls', function () {
  return function (input) {
    input.sort(function (a, b) {
      if (a.specification.displayWeight !== b.specification.displayWeight) {
        return b.specification.displayWeight - a.specification.displayWeight;
      } else {
        return parseFloat(a.specification.docNumber.substr(2)) -
            parseFloat(b.specification.docNumber.substr(2))
      }
    });
    return input;
  };
});
