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
.controller('HackCtrl', function ($scope, $rootScope, $state, sideBarLinks, categories,
                                  swiffyAnimations) {
  var carImagePanel, currentSwiffyElement, currentSwiffyStage;

  $scope.hackState = {};
  $scope.hackState.sideBarLinks = sideBarLinks;
  $scope.hackState.categories = categories;
  $scope.hackState.swiffyAnimations = swiffyAnimations;
  $scope.hackState.selectedApiCategory = $rootScope.selectedApiCategory;
  $scope.hackState.selectedAnimation = null;
  $scope.hackState.sideBarSelectedLink = null;

  $scope.myState = $state;

  // TODO: this is a quick fix; the animation logic really ought to be moved to a separate directive
  carImagePanel = document.getElementById('car-image-panel');
  currentSwiffyStage = null;

  $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

  $scope.hackState.handleSideBarClick = handleSideBarClick;
  $scope.hackState.handleCategoryTabClick = handleCategoryTabClick;
  $scope.hackState.handleAnimationTabClick = handleAnimationTabClick;

  handleAnimationTabClick(swiffyAnimations[0]);

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
    var targetState = link.ref;

    if (link.ref === 'api-documentation')
      targetState = $rootScope.defaultCategory.ref;

    $state.go(targetState);
  }

  function handleCategoryTabClick(category) {
    $rootScope.selectedApiCategory = category.id;

    // Transition to the API documentation route/state
    $state.go('api-documentation.' + category.id);
  }

  function handleAnimationTabClick(animation) {
    delayedDestroy(currentSwiffyStage, currentSwiffyElement);

    $scope.hackState.selectedAnimation = animation;

    currentSwiffyStage = new swiffy.Stage(carImagePanel, animation.swiffyObject, {});
    currentSwiffyStage.start();

//    setTimeout(function () {
//      var allDivs = carImagePanel.querySelectorAll('div');
//      currentSwiffyElement = allDivs[allDivs.length - 1];
//      currentSwiffyElement.className += ' shown';
//    }, 10);

    function delayedDestroy(swiffyStage, swiffyElement) {
      if (swiffyElement) {
        swiffyElement.style.opacity = 0;
      }

      if (swiffyStage) {
//        setTimeout(function () {
          swiffyStage.destroy();
//        }, 700);
      }
    }
  }
});
