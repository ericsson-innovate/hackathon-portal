'use strict';

angular.module('apiListItemDirective', [])

.constant('apiListItemTemplatePath', '/dist/templates/components/api-list-item/api-list-item.html')

/**
 * @ngdoc directive
 * @name apiListItem
 * @requires apiListItemTemplatePath
 * @param {Object} apiItem
 * @description
 *
 * A panel used for displaying the specification for a single API call.
 */
.directive('apiListItem', function (apiListItemTemplatePath) {
  return {
    restrict: 'A',
    require: '^apiList',
    scope: {
      apiItem: '=apiListItem'
    },
    templateUrl: apiListItemTemplatePath,
    link: function (scope, element, attrs, apiListCtrl) {
      scope.isSelected = false;
      scope.apiItem.selectedCard = 'specification';
      scope.apiItem.selectedPlatform = 'web';

      scope.handleHeaderClick = function () {
        apiListCtrl.setSelectedSpecification(scope.isSelected ? null : scope);
      };

      scope.setIsSelected = function (isSelected) {
        scope.isSelected = isSelected;
      };
    },
    controller: function () {
    }
  };
});
