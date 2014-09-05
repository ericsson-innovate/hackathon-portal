'use strict';

angular.module('swiffyDirective', [])

/**
 * @ngdoc directive
 * @name swiffy
 * @description
 *
 * A panel for managing animations using swiffy.
 */
.directive('swiffy', function ($rootScope, $timeout, swiffyAnimations) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var currentSwiffyWrapper, currentSwiffyStage, carouselTimeout, currentSwiffyIndex,
          isFirstViewContentLoadedEvent;

      // Add an event handler to the parent scope
      scope.hackState.handleAnimationTabClick = handleAnimationTabClick;

      currentSwiffyStage = null;
      carouselTimeout = null;
      currentSwiffyIndex = 0;
      isFirstViewContentLoadedEvent = true;

      $rootScope.$on('$viewContentLoaded', function (event) {
        if (isFirstViewContentLoadedEvent) {
          console.log('Triggering swiffy animation from the initial load of the page');

          isFirstViewContentLoadedEvent = false;

          $timeout(function () {
            handleAnimationTabClick(swiffyAnimations[currentSwiffyIndex], false);
          }, 500);
        }
      });

      $rootScope.$on('$stateChangeStart', destroyCurrentSwiffy);
      scope.$on("$destroy", destroyCurrentSwiffy);

      // ---  --- //

      function handleAnimationTabClick(animation, wasHumanClick) {
        console.log('Animation tab click: wasHumanClick=' + wasHumanClick);

        // Do not allow animations to run that were triggered from timeouts that occurred after the
        // auto-transition was cancelled
        if (wasHumanClick || !$rootScope.carouselHasRunOnce) {
          delayedDestroy(currentSwiffyStage, currentSwiffyWrapper);

          scope.hackState.selectedAnimation = animation;

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
      }

      function delayedDestroy(swiffyStage, swiffyWrapper) {
        if (swiffyWrapper) {
          swiffyWrapper.addClass('hidden');
        }

        setTimeout(function () {
          console.log('Destroying old swiffy animation');

          destroySwiffy(swiffyStage, swiffyWrapper);
        }, 700);
      }

      function addNewSwiffyAnimation(swiffyObject) {
        console.log('Starting new swiffy animation');

        // Create a wrapper element
        currentSwiffyWrapper = angular.element('<div></div>');
        currentSwiffyWrapper.addClass(' swiffy-wrapper');

        // Add the wrapper element as the first child of the swiffy container panel
        element.prepend(currentSwiffyWrapper);

        // Create and start the swiffy animation
        currentSwiffyStage = new swiffy.Stage(currentSwiffyWrapper[0], swiffyObject, {});
        currentSwiffyStage.start();
      }

      function destroyCurrentSwiffy() {
        console.log('Destroying swiffy');

        destroySwiffy(currentSwiffyStage, currentSwiffyWrapper);
      }

      function destroySwiffy(swiffyStage, swiffyWrapper) {
        if (swiffyStage) {
          swiffyStage.destroy();
        }

        if (swiffyWrapper) {
          swiffyWrapper.empty();
          swiffyWrapper.remove();
        }
      }
    }
  };
});
