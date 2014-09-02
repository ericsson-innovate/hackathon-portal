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

  $scope.hackState.handleCategoryTabClick = function (category) {
    $rootScope.selectedCategory = category;

    // Transition to the API documentation route/state
    if ($rootScope.routeState.name !== 'api-documentation') {
      $state.go('api-documentation');
    }
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
