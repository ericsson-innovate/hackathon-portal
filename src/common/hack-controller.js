'use strict';

angular.module('hackController', [])

.constant('car1Url', hack.rootPath + '/dist/images/car-1.png')
.constant('car2Url', hack.rootPath + '/dist/images/car-2.png')

/**
 * @ngdoc object
 * @name HackCtrl
 * @description
 *
 * Controller for the overall hackathon portal page.
 */
.controller('HackCtrl', function ($scope, $rootScope, $state, $timeout, sideBarLinks, categories,
                                  animations) {
  $scope.hackState = {};
  $scope.hackState.sideBarLinks = sideBarLinks;
  $scope.hackState.categories = categories;
  $scope.hackState.animations = animations;
  $scope.hackState.selectedApiCategory = $rootScope.selectedApiCategory;
  $scope.hackState.selectedAnimation = null;
  $scope.hackState.sideBarSelectedLink = null;

  $scope.myState = $state;

  $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

  $scope.hackState.handleSideBarClick = handleSideBarClick;
  $scope.hackState.handleCategoryTabClick = handleCategoryTabClick;

  // ---  --- //

  function handleStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
    if (toState.name === 'api-documentation') {
      $state.go($rootScope.defaultCategory.ref);
      return;
    }

    $scope.myState = toState;

    for (var i = 0; i < sideBarLinks.length; i++) {
      var link = sideBarLinks[i];

      if (toState.name.indexOf(link.ref) == 0) {
        $scope.hackState.sideBarSelectedLink = link.ref;
        break;
      }
    }

    $scope.hackState.selectedApiCategory = $rootScope.selectedApiCategory;
  }

  function handleSideBarClick(link) {
    console.log('Side bar item click');

    var targetState = link.ref;

    if (link.ref === 'api-documentation')
      targetState = $rootScope.defaultCategory.ref;

    $state.go(targetState);
  }

  function handleCategoryTabClick(category) {
    console.log('Category tab click');

    $rootScope.selectedApiCategory = category.id;

    // Transition to the API documentation route/state
    $state.go('api-documentation.' + category.id);
  }
});
