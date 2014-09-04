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
  var carImagePanel, currentSwiffyWrapper, currentSwiffyStage, carouselTimeout, currentSwiffyIndex,
      isFirstViewContentLoadedEvent;

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
  currentSwiffyIndex = 0;
  isFirstViewContentLoadedEvent = true;

  $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

  $scope.hackState.handleSideBarClick = handleSideBarClick;
  $scope.hackState.handleCategoryTabClick = handleCategoryTabClick;
  $scope.hackState.handleAnimationTabClick = handleAnimationTabClick;

  $rootScope.$on('$viewContentLoaded', function (event) {
    if (isFirstViewContentLoadedEvent) {
      console.log('Triggering swiffy animation from the initial load of the page');

      isFirstViewContentLoadedEvent = false;

      $timeout(function () {
        handleAnimationTabClick(swiffyAnimations[currentSwiffyIndex], false);
      }, 500);
    }
  });

  $scope.$on("$destroy", function () {
    console.log('HackCtrl $destroy');

    if (currentSwiffyStage) {
      currentSwiffyStage.destroy();
    }

    if (currentSwiffyWrapper) {
      currentSwiffyWrapper.innerHTML = '';
    }
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

  function handleAnimationTabClick(animation, wasHumanClick) {
    console.log('Animation tab click: wasHumanClick=' + wasHumanClick);

    // Do not allow animations to run that were triggered from timeouts that occurred after the
    // auto-transition was cancelled
    if (wasHumanClick || !$rootScope.carouselHasRunOnce) {
      delayedDestroy(currentSwiffyStage, currentSwiffyWrapper);

      $scope.hackState.selectedAnimation = animation;

      addNewSwiffyAnimation(animation.swiffyObject);
    }

    // Cancel any current auto-transition timeout
    if (carouselTimeout) {
      $timeout.cancel(carouselTimeout);
      carouselTimeout = null;
    }

    // Was this "click" triggered as part of the auto-transition?
    if (!$rootScope.carouselHasRunOnce && !wasHumanClick) {
      // Start a timeout for the next auto-transition
      carouselTimeout = $timeout(function () {
        // Stop the auto-transition after running through each animation once
        if (currentSwiffyIndex >= 3) {
          $rootScope.carouselHasRunOnce = true;
          return;
        }

        currentSwiffyIndex = (currentSwiffyIndex + 1) % 4;

        handleAnimationTabClick(swiffyAnimations[currentSwiffyIndex], false);
      }, 6000);
    } else {
      $rootScope.carouselHasRunOnce = true;
    }

    // ---  --- //

    function delayedDestroy(swiffyStage, swiffyWrapper) {
      if (swiffyWrapper) {
        swiffyWrapper.className += ' hidden';
      }

      setTimeout(function () {
        console.log('Destroying old swiffy animation');

        if (swiffyStage) {
          swiffyStage.destroy();
        }

        if (swiffyWrapper) {
          swiffyWrapper.innerHTML = '';
        }
      }, 700);
    }

    function addNewSwiffyAnimation(swiffyObject) {
      console.log('Starting new swiffy animation');

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
