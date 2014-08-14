'use strict';

angular.module('categoryFilter', [])

/**
 * @ngdoc filter
 * @name category
 * @description
 *
 * This is a filter for only showing the API calls that belong to a given category.
 */
.filter('category', function () {
  return function (input, category) {
    var i, j, count, matches;

    matches = [];

    for (i = 0, j = 0, count = input.length; i < count; i += 1) {
      if (input[i].specification.categories.indexOf(category) >= 0) {
        matches[j++] = input[i];
      }
    }

    return matches;
  }
});
