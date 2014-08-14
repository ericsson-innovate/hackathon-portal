'use strict';

angular.module('syncPrismDirective', [])

/**
 * @ngdoc directive
 * @name syncPrism
 * @param {string} source
 * @description
 *
 * A directive for re-running Prism parsing for syntax highlighting when content changes.
 */
.directive('syncPrism', [function() {
  return {
    restrict: 'A',
    scope: {
      source: '@'
    },
    link: function(scope, element, attrs) {
      var code = element.find('code')[0];

      scope.$watch('source', function () {
        Prism.highlightElement(code);
      });
    },
    template: '<code ng-bind="source"></code>'
  };
}]);
