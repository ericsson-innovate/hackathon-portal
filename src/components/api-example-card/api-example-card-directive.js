'use strict';

angular.module('apiExampleCardDirective', [])

.constant('apiExampleCardTemplatePath', hack.rootPath + '/dist/templates/components/api-example-card/api-example-card.html')

/**
 * @ngdoc directive
 * @name apiExampleCard
 * @requires apiExampleCardTemplatePath
 * @param {object} example
 * @description
 *
 * A panel used for displaying platform-specific examples of a single API call.
 */
.directive('apiExampleCard', function (apiExampleCardTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      apiItem: '='
    },
    templateUrl: apiExampleCardTemplatePath,
    link: function (scope, element, attrs) {
      scope.handleTabClick = function (platform) {
        scope.apiItem.HackExamples.currentPlatform = platform;
      };
    }
  };
});
