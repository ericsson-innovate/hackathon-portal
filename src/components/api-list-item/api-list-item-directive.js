'use strict';

angular.module('apiListItemDirective', [])

.constant('apiListItemTemplatePath', hack.rootPath + '/dist/templates/components/api-list-item/api-list-item.html')

/**
 * @ngdoc directive
 * @name apiListItem
 * @requires HackExamples
 * @requires HackApi
 * @requires apiListItemTemplatePath
 * @param {Object} apiItem
 * @description
 *
 * A panel used for displaying the specification for a single API call.
 */
.directive('apiListItem', function (HackExamples, HackApi, apiListItemTemplatePath) {
  return {
    restrict: 'A',
    scope: {
      apiItem: '=apiListItem',
      apiListState: '='
    },
    templateUrl: apiListItemTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiItem.HackExamples = HackExamples;
      scope.apiItem.HackApi = HackApi;

      scope.handleHeaderClick = function () {
        scope.apiListState.selectedItemId =
                scope.apiListState.selectedItemId === scope.apiItem.specification.id ?
                    null : scope.apiItem.specification.id;
      };
    }
  };
});
