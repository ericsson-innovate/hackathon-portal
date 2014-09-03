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
.directive('apiListItem', function ($rootScope, $state, HackExamples, HackApi, apiListItemTemplatePath) {
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

      // TODO: implement scroll to selected API
      // var GetScreenCordinates = function(obj) {
      //   var p = {};
      //   p.x = obj.offsetLeft;
      //   p.y = obj.offsetTop;
      //   while (obj.offsetParent) {
      //     p.x = p.x + obj.offsetParent.offsetLeft;
      //     p.y = p.y + obj.offsetParent.offsetTop;
      //     if (obj == document.getElementsByTagName("body")[0]) {
      //       break;
      //     }
      //     else {
      //       obj = obj.offsetParent;
      //     }
      //   }
      //   return p;
      // };

      scope.handleHeaderClick = function (evt) {
        // var rect = GetScreenCordinates(evt.target);
        // window.scrollTo(0, rect.y);

        scope.apiListState.selectedItemId =
                scope.apiListState.selectedItemId === scope.apiItem.specification.id ?
                    null : scope.apiItem.specification.id;

        var targetRef = 'api-documentation.' + $rootScope.selectedApiCategory;

        if (scope.apiListState.selectedItemId != null)
          targetRef = targetRef + '.' + scope.apiItem.ref;
        
        $state.go(targetRef);
      };
    }
  };
});
