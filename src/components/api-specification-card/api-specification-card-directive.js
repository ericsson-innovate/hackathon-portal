'use strict';

angular.module('apiSpecificationCardDirective', [])

.constant('apiSpecificationCardTemplatePath', hack.rootPath + '/dist/templates/components/api-specification-card/api-specification-card.html')

/**
 * @ngdoc directive
 * @name apiSpecificationCard
 * @requires apiSpecificationCardTemplatePath
 * @param {Object} apiItem
 * @description
 *
 * A panel used for displaying the specification for a single API call.
 */
.directive('apiSpecificationCard', function (apiSpecificationCardTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      apiItem: '='
    },
    templateUrl: apiSpecificationCardTemplatePath,
    link: function (scope, element, attrs) {
      scope.isArray = function (input) {
        return input instanceof Array;
      };
    }
  };
});
