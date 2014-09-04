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
                                  swiffyAnimations) {
  var carImagePanel, currentSwiffyWrapper, currentSwiffyStage, carouselTimeout,
      carouselHasRunOnce, currentSwiffyIndex;

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
  carouselTimeout = null;
  carouselHasRunOnce = false;
  currentSwiffyIndex = 0;

  $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

  $scope.hackState.handleSideBarClick = handleSideBarClick;
  $scope.hackState.handleCategoryTabClick = handleCategoryTabClick;
  $scope.hackState.handleAnimationTabClick = handleAnimationTabClick;

  $rootScope.$on('$viewContentLoaded', function (event) {
    $timeout(function () {
      handleAnimationTabClick(swiffyAnimations[currentSwiffyIndex], false);
    }, 500);
  });

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

  function handleAnimationTabClick(animation, wasHumanClick) {
    delayedDestroy(currentSwiffyStage, currentSwiffyWrapper);

    $scope.hackState.selectedAnimation = animation;

    addNewSwiffyAnimation(animation.swiffyObject);

    // Cancel any current auto-transition timeout
    if (carouselTimeout) {
      $timeout.cancel(carouselTimeout);
    }

    // Was this "click" triggered as part of the auto-transition?
    if (!carouselHasRunOnce && !wasHumanClick) {
      // Start a timeout for the next auto-transition
      carouselTimeout = $timeout(function () {
        // Stop the auto-transition after running through each animation once
        if (currentSwiffyIndex >= 3) {
          carouselHasRunOnce = true;
          carouselTimeout = null;
          return;
        }

        currentSwiffyIndex = (currentSwiffyIndex + 1) % 4;

        handleAnimationTabClick(swiffyAnimations[currentSwiffyIndex], false);
      }, 6000);
    }

    // ---  --- //

    function delayedDestroy(swiffyStage, swiffyWrapper) {
      if (swiffyWrapper) {
        swiffyWrapper.className += ' hidden';
      }

      if (swiffyStage) {
        setTimeout(function () {
          swiffyStage.destroy();
        }, 700);
      }
    }

    function addNewSwiffyAnimation(swiffyObject) {
      // Create a wrapper element
      currentSwiffyWrapper = document.createElement('div');
      currentSwiffyWrapper.className += ' swiffy-wrapper';

      // Add the wrapper element as the first child of the swiffy container panel
      if (carImagePanel.firstChild) {
        carImagePanel.insertBefore(currentSwiffyWrapper, carImagePanel.firstChild);
      } else {
        carImagePanel.appendChild(currentSwiffyWrapper);
      }

      // Create and start the swiffy animation
      currentSwiffyStage = new swiffy.Stage(currentSwiffyWrapper, swiffyObject, {});
      currentSwiffyStage.start();
    }
  }
});
