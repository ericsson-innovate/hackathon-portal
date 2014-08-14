'use strict';

angular.module('apiListDirective', [])

.constant('apiListTemplatePath', '/dist/templates/components/api-list/api-list.html')

/**
 * @ngdoc directive
 * @name apiList
 * @requires HackApi
 * @requires apiListTemplatePath
 * @description
 *
 * A footer list used for displaying a list of navigation links.
 */
.directive('apiList', function (HackApi, apiListTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      category: '='
    },
    templateUrl: apiListTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiData = [];

      HackApi.getAllApiData()
          .then(function (apiData) {
            scope.apiData = apiData;
          });
    },
    controller: function ($scope) {
      var selectedSpec;

      selectedSpec = null;

      this.setSelectedSpecification = setSelectedSpecification;

      $scope.$watch('category', function () {
        setSelectedSpecification(null);
      });

      function setSelectedSpecification(spec) {
        var oldSelectedSpec = selectedSpec;
        selectedSpec = spec;

        if (oldSelectedSpec && oldSelectedSpec !== selectedSpec) {
          oldSelectedSpec.setIsSelected(false);
        }

        if (selectedSpec) {
          selectedSpec.setIsSelected(true);
        }
      }
    }
  };
});
