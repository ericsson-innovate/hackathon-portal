'use strict';

angular.module('errorDescriptionFilter', [])

/**
 * @ngdoc filter
 * @name errorDescription
 * @requires httpErrorCodes
 * @description
 *
 * This is a filter for providing the descriptions of errors according to their error codes.
 */
.filter('errorDescription', function (httpErrorCodes) {
  return function (input) {
    return httpErrorCodes[input] || 'Unknown error';
  }
});
