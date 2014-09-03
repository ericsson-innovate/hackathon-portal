'use strict';

angular.module('hackController', [])

.constant('car1Url', hack.rootPath + '/dist/images/car-1.png')
.constant('car2Url', hack.rootPath + '/dist/images/car-2.png')

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
.controller('HackCtrl', function ($scope, $rootScope, $state, sideBarLinks, categories, car1Url,
                                  car2Url) {
  var previousRouteName, carImageElement;

  previousRouteName = '';
  carImageElement = angular.element(document.getElementById('car-image-panel'));

  $scope.hackState = {};
  $scope.hackState.sideBarLinks = sideBarLinks;
  $scope.hackState.categories = categories;
  $scope.hackState.selectedApiCategory = $rootScope.selectedApiCategory;
  $scope.hackState.sideBarSelectedLink = null;

  $scope.myState = $state;

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
  	$scope.myState = toState;

  	for (var i = 0; i < sideBarLinks.length; i++) {
  		var link = sideBarLinks[i];

	  	if (toState.name.indexOf(link.ref) == 0) {
	  		$scope.hackState.sideBarSelectedLink = link.ref;
	  		break;
	  	}
  	}

    $scope.hackState.selectedApiCategory = $rootScope.selectedApiCategory;
  });

  $scope.hackState.handleSideBarClick = function (link) {
  	var targetState = link.ref;

  	if (link.ref === 'api-documentation')
		targetState = $rootScope.defaultCategory.ref;

  	$state.go(targetState);
  };

  $scope.hackState.handleCategoryTabClick = function (category) {
    $rootScope.selectedCategory = category.id;

    // Transition to the API documentation route/state
    $state.go('api-documentation.' + category.id);
  };

  $rootScope.$watch('routeState.name', function (nextRouteName) {
    if (previousRouteName !== nextRouteName) {
      maybeSwitchCarImage();
    }

    previousRouteName = nextRouteName;
  });

  // TODO: this image-switching logic really should be moved to a separate directive, but for lack of time I'm putting it here
  function maybeSwitchCarImage() {
    var url = 'url(' + (Math.random() < 0.5 ? car1Url : car2Url) + ')';
    carImageElement.css('background-image', url);
  }
});
