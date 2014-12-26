angular.module('tallHeaderDirective', [])

.constant('tallHeaderTemplatePath', document.baseURI + '/dist/templates/components/tall-header/tall-header.html')

.directive('tallHeader', function ($rootScope, $interval, animations, tallHeaderTemplatePath) {
  return {
    restrict: 'E',

    scope: {
    },

    templateUrl: tallHeaderTemplatePath,

    link: function (scope, element, attrs) {
      scope.animations = animations;
      scope.selectedLabel = null;
      scope.timeline = null;
      
      var carouselInterval, isFirstViewContentLoadedEvent;

      // Add an event handler to the parent scope
      scope.handleAnimationTabClick = handleAnimationTabClick;

      carouselInterval = null;
      isFirstViewContentLoadedEvent = true;

      // $rootScope.$on('$viewContentLoaded', function (event) {
        if (isFirstViewContentLoadedEvent) {
          console.log('Triggering animation from the initial load of the page');

          var carScreen = document.getElementById('car-hero-screen');
          var carScreenInitialAlpha = 0.7;

          var questionSet1 = [
            document.getElementById('car-question-set-1-question-1'),
            document.getElementById('car-question-set-1-question-2'),
            document.getElementById('car-question-set-1-question-3')
          ];

          var questionSet2 = [
            document.getElementById('car-question-set-2-question-1'),
            document.getElementById('car-question-set-2-question-2'),
            document.getElementById('car-question-set-2-question-3')
          ];

          var questionSet3 = [
            document.getElementById('car-question-set-3-question-1'),
            document.getElementById('car-question-set-3-question-2'),
            document.getElementById('car-question-set-3-question-3')
          ];

          var questionSet4 = [
            document.getElementById('car-question-set-4-question-1'),
            document.getElementById('car-question-set-4-question-2'),
            document.getElementById('car-question-set-4-question-3')
          ];

          scope.timeline = new TimelineMax({repeat: 10000});

          scope.timeline.add("start");

          scope.timeline.add("set-1", "+=2");
          scope.timeline.add(TweenMax.from(carScreen, 0.25, {alpha:0}), "+=1");
          scope.timeline.add(TweenMax.staggerFrom(questionSet1, 1.75, {x:"60", alpha:0}, 0.3), "-=1.0");
          scope.timeline.add(TweenMax.staggerTo(questionSet1, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:0}), "-=1");

          scope.timeline.add("set-2", "+=2");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:carScreenInitialAlpha}), "+=1");
          scope.timeline.add(TweenMax.staggerFrom(questionSet2, 1.75, {x:"60", alpha:0}, 0.3), "-=1");
          scope.timeline.add(TweenMax.staggerTo(questionSet2, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:0}), "-=1");

          scope.timeline.add("set-3", "+=2");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:carScreenInitialAlpha}), "+=1");
          scope.timeline.add(TweenMax.staggerFrom(questionSet3, 1.75, {x:"60", alpha:0}, 0.3), "-=1");
          scope.timeline.add(TweenMax.staggerTo(questionSet3, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:0}), "-=1");

          scope.timeline.add("set-4", "+=2");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:carScreenInitialAlpha}), "+=1");
          scope.timeline.add(TweenMax.staggerFrom(questionSet4, 1.75, {x:"60", alpha:0}, 0.3), "-=1");
          scope.timeline.add(TweenMax.staggerTo(questionSet4, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.05, {alpha:0}), "-=1");

          scope.timeline.add("end");


          carouselInterval = $interval(function() {
            var currentLabel = scope.timeline.currentLabel();

            if (scope.selectedLabel != currentLabel) {
                scope.selectedLabel = currentLabel;
            }
          }, 100);

          scope.$on('$destroy', function() {
            // Make sure that the interval is destroyed too
            if (carouselInterval != null) {
              carouselInterval.cancel();
              carouselInterval = null;
            }
          });

          isFirstViewContentLoadedEvent = false;
        }
      // });

      function handleAnimationTabClick(animation, wasHumanClick) {
        scope.timeline.seek(animation.label, false);
      }
    }
  };
});
