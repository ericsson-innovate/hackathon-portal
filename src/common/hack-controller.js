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

  $scope.myState = $state;
  $scope.hackState.sideBarSelectedLink = null;

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  	$scope.myState = toState;

  	for (var i = 0; i < sideBarLinks.length; i++) {
  		var link = sideBarLinks[i];

	  	if (toState.name.indexOf(link.ref) == 0) {
	  		$scope.hackState.sideBarSelectedLink = link.ref;
	  		break;
	  	}
  	}
  });

  $scope.hackState.handleSideBarClick = function (link) {
  	var targetState = link.ref;

  	if (link.ref === 'api-documentation')
		targetState = $rootScope.defaultCategory.ref;

  	$state.go(targetState);
  };

  $scope.hackState.handleCategoryTabClick = function (category) {
    $rootScope.selectedCategory = category;

    // Transition to the API documentation route/state
    $state.go('api-documentation.' + $rootScope.selectedCategory.id);
  };
});
