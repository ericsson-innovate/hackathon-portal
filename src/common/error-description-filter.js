'use strict';

angular.module('errorDescriptionFilter', [])

/**
 * @ngdoc filter
 * @name errorDescription
 * @requires httpStatusCodes
 * @description
 *
 * This is a filter for providing the descriptions of errors according to their error codes.
 */
.filter('errorDescription', function (httpStatusCodes) {
  return function (input) {
    return httpStatusCodes[input] || 'Unknown error';
  }
});
