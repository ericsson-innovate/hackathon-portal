'use strict';

angular.module('hackController', [])

/**
 * @ngdoc object
 * @name HackCtrl
 * @requires $scope
 * @requires $rootScope
 * @requires $state
 * @requires sideBarLinks
 * @requires categories
 * @description
 *
 * Controller for the overall hackathon portal page.
 */
.controller('HackCtrl', function ($scope, $rootScope, $state, sideBarLinks, categories) {
  $scope.hackState = {};
  $scope.hackState.sideBarLinks = sideBarLinks;

  $scope.hackState.categories = categories;

  $scope.hackState.handleCategoryTabClick = function (category) {
    $rootScope.selectedCategory = category;

    // Transition to the API documentation route/state
    if ($rootScope.routeState.name !== 'api-documentation') {
      $state.go('api-documentation');
    }
  };
});
