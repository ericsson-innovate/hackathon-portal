angular.module('connectedCarSDK', ['connectedCarSDK.attAlert','connectedCarSDK.attBadge','connectedCarSDK.attButtons','connectedCarSDK.attCarousel','connectedCarSDK.attContent','connectedCarSDK.attDrawer','connectedCarSDK.attDropdown','connectedCarSDK.attFooter','connectedCarSDK.attHeader','connectedCarSDK.attListView','connectedCarSDK.attLoader','connectedCarSDK.attMediaPlayer','connectedCarSDK.attMenu','connectedCarSDK.attModal','connectedCarSDK.attPinPad','connectedCarSDK.attProgressBar','connectedCarSDK.attSimError','connectedCarSDK.attSlider','connectedCarSDK.attTab','connectedCarSDK.attTabset','connectedCarSDK.attToggleSwitch','connectedCarSDK.attVehicleInMotion','connectedCarSDK.transition']);'use strict';

angular.module('connectedCarSDK.transition', [])
  /**
 * $transition service provides a consistent interface to trigger CSS 3 transitions and to be informed when they complete.
 * @param  {DOMElement} element  The DOMElement that will be animated.
 * @param  {string|object|function} trigger  The thing that will cause the transition to start:
 *   - As a string, it represents the css class to be added to the element.
 *   - As an object, it represents a hash of style attributes to be applied to the element.
 *   - As a function, it represents a function to be called that will cause the transition to occur.
 * @return {Promise}  A promise that is resolved when the transition finishes.
 */
.factory('$transition', ['$q', '$timeout', '$rootScope', function ($q, $timeout, $rootScope) {

    var $transition = function (element, trigger, options) {
        options = options || {};
        var deferred = $q.defer();
        var endEventName = $transition[options.animation ? 'animationEndEventName' : 'transitionEndEventName'];

        var transitionEndHandler = function () {
            $rootScope.$apply(function () {
                element.unbind(endEventName, transitionEndHandler);
                deferred.resolve(element);
            });
        };

        if (endEventName) {
            element.bind(endEventName, transitionEndHandler);
        }

        // Wrap in a timeout to allow the browser time to update the DOM before the transition is to occur
        $timeout(function () {
            if (angular.isString(trigger)) {
                element.addClass(trigger);
            } else if (angular.isFunction(trigger)) {
                trigger(element);
            } else if (angular.isObject(trigger)) {
                element.css(trigger);
            }
            //If browser does not support transitions, instantly resolve
            if (!endEventName) {
                deferred.resolve(element);
            }
        });

        // Add our custom cancel function to the promise that is returned
        // We can call this if we are about to run a new transition, which we know will prevent this transition from ending,
        // i.e. it will therefore never raise a transitionEnd event for that transition
        deferred.promise.cancel = function () {
            if (endEventName) {
                element.unbind(endEventName, transitionEndHandler);
            }
            deferred.reject('Transition cancelled');
        };

        return deferred.promise;
    };

    // Work out the name of the transitionEnd event
    var transElement = document.createElement('trans');
    var transitionEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'transition': 'transitionend'
    };
    var animationEndEventNames = {
        'WebkitTransition': 'webkitAnimationEnd',
        'MozTransition': 'animationend',
        'OTransition': 'oAnimationEnd',
        'transition': 'animationend'
    };
    function findEndEventName(endEventNames) {
        for (var name in endEventNames) {
            if (transElement.style[name] !== undefined) {
                return endEventNames[name];
            }
        }
    }
    $transition.transitionEndEventName = findEndEventName(transitionEndEventNames);
    $transition.animationEndEventName = findEndEventName(animationEndEventNames);
    return $transition;
}]);
'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSdk.alert.directive:attAlert
 * @description
 * # attAlert
 */
angular.module('connectedCarSDK.attAlert', [])
     .constant('alertConfig', {
         type: 'info',
         max: 100,
         min: 0
     })
    .factory('alertProvider', ['$timeout', 'alertConfig', function ($timeout, alertConfig) {
        return {
            alerts: [],
            timeoutPromise: null,

            addAlert: function (scope) {

                scope.alert = {
                    type: angular.isDefined(scope.type) ? scope.type : alertConfig.type,
                    onClose: angular.isDefined(scope.onClose) ? scope.onClose : null,
                    onClick: angular.isDefined(scope.onClick) ? scope.onClick : null,
                    showIcon: angular.isDefined(scope.showIcon) ? scope.showIcon : false,
                    showConfirmationBtn: angular.isDefined(scope.showConfirmationBtn) ? scope.showConfirmationBtn : false,
                    buttonText: angular.isDefined(scope.buttonText) ? scope.buttonText : '',
                    autoCloseInterval: angular.isDefined(scope.autoCloseInterval) ? scope.autoCloseInterval : null,
                    title: angular.isDefined(scope.title) ? scope.title : ''
                };

                if (this.alerts.length === 0)
                    scope.alert.isActive = true;

                this.alerts.push(scope.alert);
            },

            removeActiveAlert: function () {

                this.alerts[0].isActive = false;
                this.alerts.splice(0, 1);

                if (this.alerts.length > 0)
                    this.alerts[0].isActive = true;
            },

            closeAlert: function() {
                
                    if (this.timeoutPromise)
                        $timeout.cancel(this.timeoutPromise);

                    this.alerts[0].onClose();
                    this.removeActiveAlert();
                

                this.handleAutoClose();
            },

            handleAutoClose: function() {
                if (this.alerts[0] && this.alerts[0].autoCloseInterval && parseInt(this.alerts[0].autoCloseInterval) > 0) {
                    var that = this;
                    this.timeoutPromise = $timeout(function() {
                        that.closeAlert();
                    }, this.alerts[0].autoCloseInterval);
                }
            }
        };
    }])
    .factory('$alert', ['$rootScope', '$compile', '$document', function ($rootScope, $compile, $document) {

        return {
            
            show: function(options) {
                var angularDomEl = angular.element('<att-alert on-close="onClose()" on-click="onClick()">' + options.text + '</att-alert>');
                angularDomEl.attr({
                    'type': options.type,
                    'title': options.title,
                    'show-icon': options.showIcon,
                    'show-confirmation-btn': options.showConfirmationBtn,
                    'button-text': options.buttonText,
                    'auto-close-interval': options.autoCloseInterval ? options.autoCloseInterval : null
                });

                var alertScope = $rootScope.$new(false);
                alertScope.onClose = options.onClose ? options.onClose : null;
                alertScope.onClick = options.onClick ? options.onClick : null;
                
                var alertDomEl = $compile(angularDomEl)(alertScope);
                $document.find('body').eq(0).append(alertDomEl);
            },

            info: function(options) {
                options.type = 'info';
                this.show(options);
            },

            success: function(options) {
                options.type = 'success';
                this.show(options);
            },

            danger: function(options) {
                options.type = 'danger';
                this.show(options);
            }

        };
    }])
    .directive('attAlert', [
         'alertProvider', function (alertProvider) {
             return {
                 restrict: 'AE',
                 templateUrl: 'templates/attAlert.html',
                 replace: true,
                 transclude: true,
                 scope: {
                     type: '@',
                     showIcon: '=',
                     showConfirmationBtn: '=',
                     buttonText: '@',
                     onClick: '&',  // click on confirmation button
                     onClose: '&',
                     autoCloseInterval: '=',
                     title: '@',
                     text: '@'
                 },
                 link: function (scope) {
                     alertProvider.addAlert(scope);

                     if (scope.alert.isActive)
                         alertProvider.handleAutoClose();

                     scope.close = function () {
                         // if there is no confirmation button
                         // tapping anywhere on the alert will close the alert
                         // otherwise, you must dismiss the alert by clicking
                         // on the confirmation button
                         if (!scope.showConfirmationBtn) {
                             alertProvider.closeAlert();
                         }
                     };

                     scope.btnClick = function() {
                         scope.onClick();
                         alertProvider.closeAlert();
                     };

                     scope.$on('$destroy', function () {
                         if (scope.alert.isActive)
                             alertProvider.closeAlert();
                     });

                 }
             };

         }
    ]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.badge.directive:attbadge
 * @description
 * # attBadge
 */
angular.module('connectedCarSDK.attBadge', [])
  .directive('attBadge', function () {
      return {
          templateUrl: 'templates/attBadge.html',
          restrict: 'E',
          replace: true,
          scope: {
              value: '@',
              badgeType: '@'
          },
          link: function () {
              // Implement logic here..
          }
      };
  });

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.buttons.directive:attBtnRadio, attBtnCheckbox
 * @description
 * # attButtons
 */
angular.module('connectedCarSDK.attButtons', [])
  .constant('buttonConfig', {
      activeClass: 'active',
      toggleEvent: 'click'
  })

.controller('ButtonsController', ['buttonConfig', function (buttonConfig) {
    this.activeClass = buttonConfig.activeClass || 'active';
    this.toggleEvent = buttonConfig.toggleEvent || 'click';
}])

.directive('attBtnRadio', function () {
    return {
        require: ['attBtnRadio', 'ngModel'],
        controller: 'ButtonsController',
        link: function (scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

            //model -> UI
            ngModelCtrl.$render = function () {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, scope.$eval(attrs.attBtnRadio)));
            };

            //ui->model
            element.bind(buttonsCtrl.toggleEvent, function () {
                var isActive = element.hasClass(buttonsCtrl.activeClass);

                if (!isActive || angular.isDefined(attrs.uncheckable)) {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(isActive ? null : scope.$eval(attrs.attBtnRadio));
                        ngModelCtrl.$render();
                    });
                }
            });
        }
    };
})

.directive('attBtnCheckbox', function () {
    return {
        require: ['attBtnCheckbox', 'ngModel'],
        controller: 'ButtonsController',
        link: function (scope, element, attrs, ctrls) {
            var buttonsCtrl = ctrls[0], ngModelCtrl = ctrls[1];

            function getTrueValue() {
                return getCheckboxValue(attrs.attBtnCheckboxTrue, true);
            }

            function getFalseValue() {
                return getCheckboxValue(attrs.attBtnCheckboxFalse, false);
            }

            function getCheckboxValue(attributeValue, defaultValue) {
                var val = scope.$eval(attributeValue);
                return angular.isDefined(val) ? val : defaultValue;
            }

            //model -> UI
            ngModelCtrl.$render = function () {
                element.toggleClass(buttonsCtrl.activeClass, angular.equals(ngModelCtrl.$modelValue, getTrueValue()));
            };

            //ui->model
            element.bind(buttonsCtrl.toggleEvent, function () {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(element.hasClass(buttonsCtrl.activeClass) ? getFalseValue() : getTrueValue());
                    ngModelCtrl.$render();
                });
            });
        }
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.carousel.directive:attCarousel
 * @description
 * # attcarousel
 */
angular.module('connectedCarSDK.attCarousel', ['connectedCarSDK.transition'])
.controller('CarouselController', ['$scope', '$timeout', '$transition', '$animate', function ($scope, $timeout, $transition, $animate) {
      $animate.enabled(false);
      var self = this,
        slides = self.slides = $scope.slides = [],
        currentIndex = -1,
        currentTimeout, isPlaying;
      self.currentSlide = null;

      var destroyed = false;
      /* direction: "prev" or "next" */
      self.select = $scope.select = function (nextSlide, direction) {
          var nextIndex = slides.indexOf(nextSlide);
          //Decide direction if it's not given
          if (direction === undefined) {
              direction = nextIndex > currentIndex ? 'next' : 'prev';
          }
          if (nextSlide && nextSlide !== self.currentSlide) {
              if ($scope.$currentTransition) {
                  $scope.$currentTransition.cancel();
                  //Timeout so ng-class in template has time to fix classes for finished slide
                  $timeout(goNext);
              } else {
                  goNext();
              }
          }
          function goNext() {
              // Scope has been destroyed, stop here.
              if (destroyed) { return; }
              //If we have a slide to transition from and we have a transition type and we're allowed, go
              if (self.currentSlide && angular.isString(direction) && !$scope.noTransition && nextSlide.$element) {
                  //We shouldn't do class manip in here, but it's the same weird thing bootstrap does. need to fix sometime
                  nextSlide.$element.addClass(direction);
                  nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth; //force reflow hack

                  //Set all other slides to stop doing their stuff for the new transition
                  angular.forEach(slides, function (slide) {
                      angular.extend(slide, { direction: '', entering: false, leaving: false, active: false });
                  });
                  angular.extend(nextSlide, { direction: direction, active: true, entering: true });
                  angular.extend(self.currentSlide || {}, { direction: direction, leaving: true });

                  $scope.$currentTransition = $transition(nextSlide.$element, {});
                  //We have to create new pointers inside a closure since next & current will change
                  (function (next, current) {
                      $scope.$currentTransition.then(
                        function () { transitionDone(next, current); },
                        function () { transitionDone(next, current); }
                      );
                  }(nextSlide, self.currentSlide));
              } else {
                  transitionDone(nextSlide, self.currentSlide);
              }
              self.currentSlide = nextSlide;
              currentIndex = nextIndex;
              //every time you change slides, reset the timer
              restartTimer();
          }
          function transitionDone(next, current) {
              angular.extend(next, { direction: '', active: true, leaving: false, entering: false });
              angular.extend(current || {}, { direction: '', active: false, leaving: false, entering: false });
              $scope.$currentTransition = null;
          }
      };
      $scope.$on('$destroy', function () {
          destroyed = true;
      });

      /* Allow outside people to call indexOf on slides array */
      self.indexOfSlide = function (slide) {
          return slides.indexOf(slide);
      };

      $scope.next = function () {
          var newIndex = (currentIndex + 1) % slides.length;

          //Prevent this user-triggered transition from occurring if there is already one in progress
          if (!$scope.$currentTransition) {
              return self.select(slides[newIndex], 'next');
          }
      };

      $scope.prev = function () {
          var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;

          //Prevent this user-triggered transition from occurring if there is already one in progress
          if (!$scope.$currentTransition) {
              return self.select(slides[newIndex], 'prev');
          }
      };

      $scope.isActive = function (slide) {
          return self.currentSlide === slide;
      };

      $scope.$watch('interval', restartTimer);
      $scope.$on('$destroy', resetTimer);

      function restartTimer() {
          resetTimer();
          var interval = +$scope.interval;
          if (!isNaN(interval) && interval >= 0) {
              currentTimeout = $timeout(timerFn, interval);
          }
      }

      function resetTimer() {
          if (currentTimeout) {
              $timeout.cancel(currentTimeout);
              currentTimeout = null;
          }
      }

      function timerFn() {
          if (isPlaying) {
              $scope.next();
              restartTimer();
          } else {
              $scope.pause();
          }
      }

      $scope.play = function () {
          if (!isPlaying) {
              isPlaying = true;
              restartTimer();
          }
      };
      $scope.pause = function () {
          if (!$scope.noPause) {
              isPlaying = false;
              resetTimer();
          }
      };

      self.addSlide = function (slide, element) {
          slide.$element = element;
          slides.push(slide);
          //if this is the first slide or the slide is set to active, select it
          if (slides.length === 1 || slide.active) {
              self.select(slides[slides.length - 1]);
              if (slides.length === 1) {
                  $scope.play();
              }
          } else {
              slide.active = false;
          }
      };

      self.removeSlide = function (slide) {
          //get the index of the slide inside the carousel
          var index = slides.indexOf(slide);
          slides.splice(index, 1);
          if (slides.length > 0 && slide.active) {
              if (index >= slides.length) {
                  self.select(slides[index - 1]);
              } else {
                  self.select(slides[index]);
              }
          } else if (currentIndex > index) {
              currentIndex--;
          }
      };

  }])
.directive('attCarousel', [function () {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        controller: 'CarouselController',
        require: 'carousel',
        templateUrl: 'templates/carousel/carousel.html',
        scope: {
            interval: '=',
            noTransition: '=',
            noPause: '='
        }
    };
}])
.directive('attSlide', function () {
    return {
        require: '^attCarousel',
        restrict: 'EA',
        transclude: true,
        replace: true,
        templateUrl: 'templates/carousel/slide.html',
        scope: {
            active: '=?'
        },
        link: function (scope, element, attrs, carouselCtrl) {
            carouselCtrl.addSlide(scope, element);
            //when the scope is destroyed then remove the slide from the current slides array
            scope.$on('$destroy', function () {
                carouselCtrl.removeSlide(scope);
            });

            scope.$watch('active', function (active) {
                if (active) {
                    carouselCtrl.select(scope);
                }
            });
        }
    };
});

'use strict';

angular.module('connectedCarSDK.attContent', [])
  .directive('attContent', [function(){
  return {
    restrict: 'E',
    transclude: true,
    replace: true,
    templateUrl: 'templates/attContent.html',
    link: function(scope, element, attrs){
      attrs.$observe('hasHeader', function(value){
        if(value === 'true'){
          element.addClass('has-header');
        }
        else{
          element.removeClass('has-header');

        }
      });
      attrs.$observe('hasFooter', function(value){
        if(value === 'true'){
          element.addClass('has-footer');
        }
        else{
          element.removeClass('has-footer');
        }
      });

      attrs.$observe('backgroundImg', function(value){
        element.css('background', 'url(' + value +') no-repeat center center fixed');
        element.css('-webkit-background-size', 'cover');
        element.css('-moz-background-size', 'cover');
        element.css('-o-background-size', 'cover');
        element.css('background-size', 'cover');
      });
    }

  };
}]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSdkApp.directive:attdrawer
 * @description
 * # attdrawer
 */
angular.module('connectedCarSDK.attDrawer', [])
    .directive('attDrawer', [
        '$rootScope', function ($rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'templates/attDrawer.html',
                transclude: true,
                scope: {},
                link: function(scope) {

                    scope.showDrawer = false;

                    scope.closeDrawer = function() {
                        scope.showDrawer = false;
                    };

                    $rootScope.$on('changeDrawer', function(event, args) {
                        scope.showDrawer = args[0];
                    });
                }
            };
        }
    ]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.dropdown.directive:attDropdown
 * @description
 * # attDropdown
 */
angular.module('connectedCarSDK.attDropdown', [])
    .directive('attDropdown', [
        '$timeout', function($timeout) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: function(tElement, tAttrs) {
                  return tAttrs.templateUrl || 'templates/attDropdown.html';
                },
                require: '^ngModel',
                scope: {
                    ngModel: '=',
                    defaultOption: '@',
                    items: '=',
                    closeButton: '@'
                },
                link: function(scope) {

                    scope.show = false;

                    if (scope.ngModel !== null && scope.ngModel !== undefined) {
                        $timeout(function() {
                            scope.defaultOption = scope.ngModel.text;
                        });
                    }

                    scope.selectItem = function(item) {
                        scope.ngModel = item;
                        scope.defaultOption = scope.ngModel.text;
                        scope.show = false;
                    };
                }
            };
        }
    ]);

'use strict';

angular.module('connectedCarSDK.attFooter', [])
  .directive('attFooter',  function(){
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      templateUrl: 'templates/attFooter.html',
      link: function(scope, element, attrs){

        attrs.$observe('verticalAlignment', function(value){
          if(value){
            scope.alignment = value;
          }
          else{
            scope.alignment = 'center';
          }
        });

        attrs.$observe('isFixed', function(value){

          value = typeof value !== 'undefined' ? value : 'true';
          if(value === 'true'){
            scope.isFixed = 'footer-fixed';
          }
          else{
            scope.isFixed = null;
          }
        });

      }
    };
  });

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.attHeader.directive:attHeader
 * @description
 * # attHeader
 */
angular.module('connectedCarSDK.attHeader', [])
    .factory('$header', ['$rootScope', '$interval', function ($rootScope, $interval) {
        return {
            showBackButton: function (show, callback) {
                var that = this;
                this.backButtonInterval = $interval(function () {
                    $rootScope.$broadcast('showBackButton', [show, callback, function () {
                        $interval.cancel(that.backButtonInterval);
                    }]);
                }, 100);
            }
        };
    }])
    .directive('attHeader', [
        '$rootScope', function ($rootScope) {
            return {
                restrict: 'E',
                templateUrl: 'templates/attHeader.html',
                replace: true,
                scope: {
                    appName: '=',
                    currentItem: '=',
                    appImage: '@',
                    showBackButton: '=',
                    backButtonCallback: '&'
                },
                link: function (scope) {

                    scope.backButton = scope.showBackButton ? scope.showBackButton : false;
                    scope.backCallback = scope.backButtonCallback ? scope.backButtonCallback : null;

                    scope.openMenu = function () {
                        $rootScope.$broadcast('changeDrawer', [true]);
                    };

                    $rootScope.$on('showBackButton', function (event, args) {
                        scope.backButton = args[0];
                        scope.backCallback = args[1];
                        args[2]();
                    });

                }
            };
        }
    ]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSdkApp.directive:attlistview
 * @description
 * # attlistview
 */
angular.module('connectedCarSDK.attListView', [])
    .directive('attListView', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/attListView.html',
            replace: true,
            
            scope: {
                items: '=',         // list of objects to bind {text, desc, selected}
                title: '=',         // string
                multiSelect: '='    // true/false
            },
            link: function (scope) {

                scope.onItemClick = function(item) {

                    console.log('Selected item ', item);

                    if (item.selected) {
                        item.selected = false;
                    } else {
                        if (scope.items) {
                            scope.items.forEach(function(i) {
                                if (i === item) {
                                    i.selected = true;
                                } else {
                                    if (scope.multiSelect !== true) {
                                        i.selected = false;
                                    }
                                }
                            });
                        }
                    }
                };

            }
        };
    });

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.loader.directive:attLoader
 * @description
 * # attLoader
 */
angular.module('connectedCarSDK.attLoader', [])
    .factory('$loader', ['$rootScope', '$compile', '$document', '$timeout', function ($rootScope, $compile, $document, $timeout) {

        var getLoaderReference = function () {

            var loaderDomEl;

            // try to find any existing loader in document body
            var allDivElements = $document.find('body').find('div');

            if (allDivElements) {

                angular.forEach(allDivElements, function (divEl) {
                    if (angular.element(divEl).hasClass('att-loader')) {
                        loaderDomEl = divEl;
                    }
                });

            }
            
            // if there are no existing loaders, create one and add to document body
            if (!loaderDomEl) {

                var angularDomEl = angular.element('<att-loader></att-loader>');

                // TODO: add support for 'show after'
                //angularDomEl.attr({

                //});

                var alertScope = $rootScope.$new(false);
                loaderDomEl = $compile(angularDomEl)(alertScope);
                $document.find('body').eq(0).append(loaderDomEl);

            }

            return loaderDomEl;
        };

        return {

            show: function () {

                var loader = getLoaderReference();

                // show the loader
                if (loader) {
                    $timeout(function () {
                        var scope = angular.element(loader).scope();
                        scope.forceshow = true;
                    }, 0);
                }
            },

            hide: function() {

                var loader = getLoaderReference();

                // show the loader
                if (loader) {
                    $timeout(function () {
                        var scope = angular.element(loader).scope();
                        scope.forceshow = false;
                    }, 0);
                }
            }

        };
    }])
  .directive('attLoader', ['$http', function ($http) {
      return {
          restrict: 'E',
          replace: true,
          templateUrl: 'templates/attLoader.html',
          link: function (scope, element) {

              scope.isLoading = function () {
                  return ($http.pendingRequests.length > 0) || scope.forceshow;
              };

              scope.$watch(scope.isLoading, function (v) {
                  if (v) {
                      element.css('display', 'flex');
                  } else {
                      element.css('display', 'none');
                  }
              });

          }
      };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.directive:attMediaPlayer
 * @description
 * # attMediaPlayer
 */
angular.module('connectedCarSDK.attMediaPlayer', [])
  .directive('attMediaPlayer', ['$http', '$interval', '$timeout', '$document', function ($http, $interval, $timeout, $document) {
      return {
          restrict: 'E',
          replace: true,
          templateUrl: function (tElement, tAttrs) {
              if (tAttrs.templateUrl === undefined) {
                  return 'templates/attMediaPlayer.html';
              } else {
                  return tAttrs.templateUrl;
              }
          },
          scope: {
              playlist: '=',
              autoplay: '='
          },
          link: function (scope) {

              scope.audio = null;
              scope.sliderConfig = { val: 0 };
              scope.currentIndex = 0;
              scope.repeatActive = false;
              scope.shuffleActive = false;
              scope.audioPaused = false;

              // volume data
              scope.showVolume = false;
              scope.currentVolume = 50;
              scope.minVolume = 0;
              scope.maxVolume = 100;
              scope.changeVolumeQuantity = 10;

              // volume slider parameters
              scope.volumeSliderMovingInterval = null;
              scope.volumeInactive = true;
              scope.volumeInactivityInterval = null;
              scope.volumeInativityTime = 2000;

              var changePositionInterval = 5, // seconds
                  changePositionTimeInterval = 500, // miliseconds                 
                  intervalpromise = null,
                  secondsleft = 0,
                  secondsElapsed = 0,
                  sliderInterval = null,
                  intervalCounter = 0;

              function init() {
                  if (scope.playlist && scope.playlist.length > 0) {

                      var audioEl = $document.find('body').find('audio');

                      if (audioEl.length === 0) {
                          audioEl = document.createElement('audio');
                          scope.audio = audioEl;
                      } else {
                          scope.audio = audioEl[0];
                      }

                      $document.find('body').eq(0).append(audioEl);

                      scope.audio.addEventListener('error', function () {
                          console.log('error loading file');
                          // invalidate current file in the playlist
                          scope.playlist[scope.currentIndex].isValid = false;
                          if (sliderInterval)
                              $interval.cancel(sliderInterval);
                          scope.changeFile(1, true);
                      });

                      if (scope.audio !== null && scope.audio.canPlayType && scope.audio.canPlayType('audio/mpeg')) {
                          scope.audio.src = scope.playlist[scope.currentIndex].src;

                          if (scope.autoplay) {
                              startPlayer(true);
                          }
                      }
                  }
              }

              init();

              //Init playlist only when playlist is populated and was empty before
              scope.$watchCollection('playlist', function (newPlaylist, oldPlaylist) {
                  if (!scope.playlist || (oldPlaylist && oldPlaylist.length > 0)) {
                      return;
                  }
                  init();
                  scope.changeFile(0);
              });

              function startPlayer(reset) {
                  if (reset && sliderInterval)
                      $interval.cancel(sliderInterval);

                  var counter = 0;
                  var maxValue = 100;

                  var intervalDuration = $interval(function () {
                      var isDurationAvailable = !isNaN(scope.audio.duration);
                      if (counter >= maxValue || isDurationAvailable) {
                          $interval.cancel(intervalDuration);

                          if (isDurationAvailable) {
                              scope.audio.play();
                              setupSlider(reset);
                          }
                      }
                      counter++;
                  }, 50);
              }

              function setupSlider(reset) {
                  if (reset) {
                      scope.sliderConfig = {
                          min: 0,
                          max: scope.audio.duration,
                          val: 0,
                          elapsedTime: 0,
                          remainingTime: scope.audio.duration
                      };

                      secondsleft = scope.audio.duration;
                      secondsElapsed = 0;
                  }

                  if (sliderInterval)
                      $interval.cancel(sliderInterval);

                  // setup count down timer
                  sliderInterval = $interval(function () {
                      if (parseInt(secondsleft) === 0) { // if time elapsed, move to next file
                          $interval.cancel(sliderInterval);
                          scope.changeFile(1);
                          return;
                      }

                      secondsleft--;
                      secondsElapsed++;
                      scope.sliderConfig.val++;
                  }, 1000);
              }

              function setTime() {
                  $timeout(function () {
                      scope.audio.currentTime = scope.sliderConfig.val;
                      secondsElapsed = scope.audio.currentTime;
                      scope.sliderConfig.elapsedTime = secondsElapsed;
                      secondsleft = scope.audio.duration - scope.sliderConfig.val;
                      scope.sliderConfig.remainingTime = secondsleft;
                  }, 100);
              }

              function setVolume() {
                  scope.audio.volume = (scope.currentVolume / 100);
              }

              function change(manuallyChanged) {
                  if (!scope.validateSong()) {
                      scope.changeFile(1, manuallyChanged);
                      return;
                  }

                  scope.audio.src = scope.playlist[scope.currentIndex].src;

                  if (!scope.audioPaused)
                      startPlayer(true);
                  else {
                      //scope.sliderConfig.val = 0;
                      setupSlider(true);
                      setTime();
                      $interval.cancel(sliderInterval);
                  }
              }

              scope.$on('sliderMoved', function (event, message) {
                  if (message === 'time')
                      setTime();
                  else if (message === 'volume') {
                      scope.volumeInactive = false;
                      setVolume();
                      $interval.cancel(scope.volumeSliderMovingInterval);
                  }
              });

              scope.$on('sliderMoving', function (event, message) {
                  if (message === 'volume') {
                      scope.volumeInactive = false;

                      // setup an interval every 200 ms that will set scope.volumeInactive = false;
                      // that interval will be canceled at **
                      scope.volumeSliderMovingInterval = $interval(function () {
                          scope.volumeInactive = false;
                      }, 200);

                  }
              });

              scope.countdown = function (isElapsed) {
                  var min, sec;
                  if (isElapsed) {
                      min = parseInt(secondsElapsed / 60);
                      sec = parseInt(secondsElapsed % 60);
                  } else {
                      min = parseInt(secondsleft / 60);
                      sec = parseInt(secondsleft % 60);
                  }

                  if (min.toString().length === 1)
                      min = '0' + min;
                  if (sec.toString().length === 1)
                      sec = '0' + sec;

                  if (isElapsed)
                      scope.sliderConfig.elapsedTime = min + ':' + sec;
                  else scope.sliderConfig.remainingTime = '-' + min + ':' + sec;
              };

              scope.changePosition = function (rewind, stop) {

                  if (stop) { // key released, stop changing position   
                      $interval.cancel(intervalpromise);

                      // if user kept button pressed less than intervalCounter * 2
                      // then move to next song
                      // othwerwise it means there occured rewind/fast forward operations, so just reset the counter
                      if (intervalCounter < 2) {
                          var index = rewind ? -1 : 1;
                          intervalCounter = 0;
                          scope.changeFile(index, true);
                      }
                      else intervalCounter = 0;
                  }
                  else {
                      intervalpromise = $interval(function () {
                          intervalCounter++;
                          if (intervalCounter >= 2) {
                              if (rewind) {
                                  if (scope.audio.currentTime < changePositionInterval)
                                      scope.audio.currentTime = 0;
                                  else scope.audio.currentTime -= changePositionInterval;
                              }
                              else {
                                  if ((scope.audio.duration - scope.audio.currentTime) < changePositionInterval)
                                      scope.audio.currentTime = scope.audio.duration;
                                  else scope.audio.currentTime += changePositionInterval;
                              }

                              scope.sliderConfig.val = scope.audio.currentTime;
                              setTime();
                          }
                      }, changePositionTimeInterval);
                  }
              };

              scope.changeStatus = function () {

                  scope.audioPaused = !scope.audioPaused;

                  if (!scope.audio.paused && scope.audio.duration > 0) {
                      scope.audio.pause();
                      $interval.cancel(sliderInterval);
                  }
                  else startPlayer(false);
              };

              scope.changeFile = function (index, manuallyChanged) {

                  // NOTE: repeat has priority over shuffle
                  // if repeat functionality is enabled, do not increase current file index
                  if (scope.repeatActive) {
                      if (manuallyChanged)
                          scope.currentIndex += index;
                      change(manuallyChanged);
                  }
                  else if (!scope.repeatActive) {
                      if (scope.shuffleActive) { // check if shuffle is enabled
                          var randomIndex = scope.currentIndex;
                          //currentSong = scope.playlist[scope.currentIndex],

                          while (randomIndex === scope.currentIndex) // be sure that the random index is different from current index
                              randomIndex = Math.floor((Math.random() * scope.playlist.length) + 0);

                          scope.currentIndex = randomIndex;
                          change();
                      }
                      else {
                          scope.currentIndex += index;
                          change();
                      }
                  }
              };

              scope.validateSong = function () {
                  if (!scope.playlist[scope.currentIndex]) {

                      // if the last song on the list is playing and user click "Next"
                      // then reset to 0
                      // otherwise, user clicked "Previous" while on first song
                      if (scope.playlist.length === scope.currentIndex) {
                          scope.currentIndex = -1;
                      }
                      else scope.currentIndex = scope.playlist.length - 1;

                      return false;
                  }

                  if (scope.playlist[scope.currentIndex].isValid === false)
                      return false;

                  return true;
              };

              scope.volume = function () {
                  scope.showVolume = !scope.showVolume;

                  if (scope.showVolume) {

                      if (scope.volumeInactivityInterval)
                          $interval.cancel(scope.volumeInactivityInterval);

                      // start timer to calculate inactivity time
                      // if > 2 sec of inactivity, close the volume control
                      scope.volumeInactivityInterval = $interval(function () {

                          if (scope.volumeInactive) {
                              scope.showVolume = false;
                              $interval.cancel(scope.volumeInactivityInterval);
                          } else scope.volumeInactive = true;

                      }, scope.volumeInativityTime);
                  } else $interval.cancel(scope.volumeInactivityInterval);
              };

              scope.nextSong = function () {
                  if (!scope.playlist)
                      return false;

                  var index = scope.currentIndex;
                  if (scope.playlist.length === (scope.currentIndex + 1))
                      index = -1;
                  return scope.playlist && scope.playlist[index + 1];
              };

              scope.currentSong = function () {
                  if (!scope.playlist)
                      return false;
                  return scope.playlist[scope.currentIndex];
              };
          }
      };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.attMenu.directive:attMenu
 * @description
 * # attMenu
 */
angular.module('connectedCarSDK.attMenu', [])
  .directive('attMenu', function ($timeout, $rootScope) {
      return {
          templateUrl: 'templates/attMenu.html',
          restrict: 'E',
          replace: true,
          scope: {
              items: '=',         // list of objects to bind {text, desc, selected}
              title: '='          // string
          },
          link: function (scope) {

              scope.activeTemp = false; // used to fix menu scrolling issue in Chrome

              scope.onItemClick = function (item) {
                  if (scope.items) {
                      scope.items.forEach(function (i) {
                          if (i === item)
                              i.selected = true;
                          else i.selected = false;
                      });
                  }
              };

              $rootScope.$on('setMenuItem', function (event, args) {
                  scope.onItemClick(args[0]);
              });

              $rootScope.$on('changeDrawer', function () {
                  $timeout(function () {
                      scope.activeTemp = true;
                  }, 500);
              });

          }
      };
  });

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.modal.directive:attModal
 * @description
 * # attModal
 */
angular.module('connectedCarSDK.attModal', ['connectedCarSDK.transition'])
  /**
 * A helper, internal data structure that acts as a map but also allows getting / removing
 * elements in the LIFO order
 */
  .factory('$$stackedMap', function () {
      return {
          createNew: function () {
              var stack = [];

              return {
                  add: function (key, value) {
                      stack.push({
                          key: key,
                          value: value
                      });
                  },
                  get: function (key) {
                      for (var i = 0; i < stack.length; i++) {
                          if (key === stack[i].key) {
                              return stack[i];
                          }
                      }
                  },
                  keys: function () {
                      var keys = [];
                      for (var i = 0; i < stack.length; i++) {
                          keys.push(stack[i].key);
                      }
                      return keys;
                  },
                  top: function () {
                      return stack[stack.length - 1];
                  },
                  remove: function (key) {
                      var idx = -1;
                      for (var i = 0; i < stack.length; i++) {
                          if (key === stack[i].key) {
                              idx = i;
                              break;
                          }
                      }
                      return stack.splice(idx, 1)[0];
                  },
                  removeTop: function () {
                      return stack.splice(stack.length - 1, 1)[0];
                  },
                  length: function () {
                      return stack.length;
                  }
              };
          }
      };
  })

/**
 * A helper directive for the $modal service. It creates a backdrop element.
 */
  .directive('modalBackdrop', ['$timeout', function ($timeout) {
      return {
          restrict: 'EA',
          replace: true,
          templateUrl: 'templates/modal/backdrop.html',
          link: function (scope, element, attrs) {
              scope.backdropClass = attrs.backdropClass || '';

              scope.animate = false;

              //trigger CSS transitions
              $timeout(function () {
                  scope.animate = true;
              });
          }
      };
  }])

  .directive('modalWindow', ['$modalStack', '$timeout', function ($modalStack, $timeout) {
      return {
          restrict: 'EA',
          scope: {
              index: '@',
              animate: '='
          },
          replace: true,
          transclude: true,
          templateUrl: function (tElement, tAttrs) {
              return tAttrs.templateUrl || 'templates/modal/window.html';
          },
          link: function (scope, element, attrs) {
              element.addClass(attrs.windowClass || '');
              scope.size = attrs.size;

              $timeout(function () {
                  // trigger CSS transitions
                  scope.animate = true;

                  /**
                   * Auto-focusing of a freshly-opened modal element causes any child elements
                   * with the autofocus attribute to loose focus. This is an issue on touch
                   * based devices which will show and then hide the onscreen keyboard.
                   * Attempts to refocus the autofocus element via JavaScript will not reopen
                   * the onscreen keyboard. Fixed by updated the focusing logic to only autofocus
                   * the modal element if the modal does not contain an autofocus element.
                   */
                  if (!element[0].querySelectorAll('[autofocus]').length) {
                      element[0].focus();
                  }
              });

              scope.close = function (evt) {
                  var modal = $modalStack.getTop();
                  if (modal && modal.value.backdrop && modal.value.backdrop !== 'static' && (evt.target === evt.currentTarget)) {
                      evt.preventDefault();
                      evt.stopPropagation();
                      $modalStack.dismiss(modal.key, 'backdrop click');
                  }
              };
          }
      };
  }])

  .directive('modalTransclude', function () {
      return {
          link: function ($scope, $element, $attrs, controller, $transclude) {
              $transclude($scope.$parent, function (clone) {
                  $element.empty();
                  $element.append(clone);
              });
          }
      };
  })

  .factory('$modalStack', ['$transition', '$timeout', '$document', '$compile', '$rootScope', '$$stackedMap',
    function ($transition, $timeout, $document, $compile, $rootScope, $$stackedMap) {

        var OPENED_MODAL_CLASS = 'modal-open';

        var backdropDomEl, backdropScope;
        var openedWindows = $$stackedMap.createNew();
        var $modalStack = {};

        function backdropIndex() {
            var topBackdropIndex = -1;
            var opened = openedWindows.keys();
            for (var i = 0; i < opened.length; i++) {
                if (openedWindows.get(opened[i]).value.backdrop) {
                    topBackdropIndex = i;
                }
            }
            return topBackdropIndex;
        }

        $rootScope.$watch(backdropIndex, function (newBackdropIndex) {
            if (backdropScope) {
                backdropScope.index = newBackdropIndex;
            }
        });

        function removeModalWindow(modalInstance) {

            var body = $document.find('body').eq(0);
            var modalWindow = openedWindows.get(modalInstance).value;

            //clean up the stack
            openedWindows.remove(modalInstance);

            //remove window DOM element
            removeAfterAnimate(modalWindow.modalDomEl, modalWindow.modalScope, 300, function () {
                modalWindow.modalScope.$destroy();
                body.toggleClass(OPENED_MODAL_CLASS, openedWindows.length() > 0);
                checkRemoveBackdrop();
            });
        }

        function checkRemoveBackdrop() {
            //remove backdrop if no longer needed
            if (backdropDomEl && backdropIndex() === -1) {
                var backdropScopeRef = backdropScope;
                removeAfterAnimate(backdropDomEl, backdropScope, 150, function () {
                    backdropScopeRef.$destroy();
                    backdropScopeRef = null;
                });
                backdropDomEl = undefined;
                backdropScope = undefined;
            }
        }

        function removeAfterAnimate(domEl, scope, emulateTime, done) {
            // Closing animation
            scope.animate = false;

            var transitionEndEventName = $transition.transitionEndEventName;
            if (transitionEndEventName) {
                // transition out
                var timeout = $timeout(afterAnimating, emulateTime);

                domEl.bind(transitionEndEventName, function () {
                    $timeout.cancel(timeout);
                    afterAnimating();
                    scope.$apply();
                });
            } else {
                // Ensure this call is async
                $timeout(afterAnimating);
            }

            function afterAnimating() {
                if (afterAnimating.done) {
                    return;
                }
                afterAnimating.done = true;

                domEl.remove();
                if (done) {
                    done();
                }
            }
        }

        $document.bind('keydown', function (evt) {
            var modal;

            if (evt.which === 27) {
                modal = openedWindows.top();
                if (modal && modal.value.keyboard) {
                    evt.preventDefault();
                    $rootScope.$apply(function () {
                        $modalStack.dismiss(modal.key, 'escape key press');
                    });
                }
            }
        });

        $modalStack.open = function (modalInstance, modal) {

            openedWindows.add(modalInstance, {
                deferred: modal.deferred,
                modalScope: modal.scope,
                backdrop: modal.backdrop,
                keyboard: modal.keyboard
            });

            var body = $document.find('body').eq(0),
                currBackdropIndex = backdropIndex();

            if (currBackdropIndex >= 0 && !backdropDomEl) {
                backdropScope = $rootScope.$new(true);
                backdropScope.index = currBackdropIndex;
                var angularBackgroundDomEl = angular.element('<div modal-backdrop></div>');
                angularBackgroundDomEl.attr('backdrop-class', modal.backdropClass);
                backdropDomEl = $compile(angularBackgroundDomEl)(backdropScope);
                body.append(backdropDomEl);
            }

            var angularDomEl = angular.element('<div modal-window></div>');
            angularDomEl.attr({
                'template-url': modal.windowTemplateUrl,
                'window-class': modal.windowClass,
                'size': modal.size,
                'index': openedWindows.length() - 1,
                'animate': 'animate'
            }).html(modal.content);

            var modalDomEl = $compile(angularDomEl)(modal.scope);
            openedWindows.top().value.modalDomEl = modalDomEl;
            body.append(modalDomEl);
            body.addClass(OPENED_MODAL_CLASS);
        };

        $modalStack.close = function (modalInstance, result) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow) {
                modalWindow.value.deferred.resolve(result);
                removeModalWindow(modalInstance);
            }
        };

        $modalStack.dismiss = function (modalInstance, reason) {
            var modalWindow = openedWindows.get(modalInstance);
            if (modalWindow) {
                modalWindow.value.deferred.reject(reason);
                removeModalWindow(modalInstance);
            }
        };

        $modalStack.dismissAll = function (reason) {
            var topModal = this.getTop();
            while (topModal) {
                this.dismiss(topModal.key, reason);
                topModal = this.getTop();
            }
        };

        $modalStack.getTop = function () {
            return openedWindows.top();
        };

        return $modalStack;
    }])

  .provider('$modal', function () {

      var $modalProvider = {
          options: {
              backdrop: false, //can be also false or 'static'
              keyboard: true
          },
          $get: ['$injector', '$rootScope', '$q', '$http', '$templateCache', '$controller', '$modalStack',
            function ($injector, $rootScope, $q, $http, $templateCache, $controller, $modalStack) {

                var $modal = {};

                function getTemplatePromise(options) {
                    return options.template ? $q.when(options.template) :
                      $http.get(angular.isFunction(options.templateUrl) ? (options.templateUrl)() : options.templateUrl,
                        { cache: $templateCache }).then(function (result) {
                            return result.data;
                        });
                }

                function getResolvePromises(resolves) {
                    var promisesArr = [];
                    angular.forEach(resolves, function (value) {
                        if (angular.isFunction(value) || angular.isArray(value)) {
                            promisesArr.push($q.when($injector.invoke(value)));
                        }
                    });
                    return promisesArr;
                }

                $modal.open = function (modalOptions) {

                    var modalResultDeferred = $q.defer();
                    var modalOpenedDeferred = $q.defer();

                    //prepare an instance of a modal to be injected into controllers and returned to a caller
                    var modalInstance = {
                        result: modalResultDeferred.promise,
                        opened: modalOpenedDeferred.promise,
                        close: function (result) {
                            $modalStack.close(modalInstance, result);
                        },
                        dismiss: function (reason) {
                            $modalStack.dismiss(modalInstance, reason);
                        }
                    };

                    //merge and clean up options
                    modalOptions = angular.extend({}, $modalProvider.options, modalOptions);
                    modalOptions.resolve = modalOptions.resolve || {};

                    //verify options
                    if (!modalOptions.template && !modalOptions.templateUrl) {
                        throw new Error('One of template or templateUrl options is required.');
                    }

                    var templateAndResolvePromise =
                      $q.all([getTemplatePromise(modalOptions)].concat(getResolvePromises(modalOptions.resolve)));


                    templateAndResolvePromise.then(function resolveSuccess(tplAndVars) {

                        var modalScope = (modalOptions.scope || $rootScope).$new();
                        modalScope.$close = modalInstance.close;
                        modalScope.$dismiss = modalInstance.dismiss;

                        var ctrlInstance, ctrlLocals = {};
                        var resolveIter = 1;

                        //controllers
                        if (modalOptions.controller) {
                            ctrlLocals.$scope = modalScope;
                            ctrlLocals.$modalInstance = modalInstance;
                            angular.forEach(modalOptions.resolve, function (value, key) {
                                ctrlLocals[key] = tplAndVars[resolveIter++];
                            });

                            ctrlInstance = $controller(modalOptions.controller, ctrlLocals);
                            if (modalOptions.controllerAs) {
                                modalScope[modalOptions.controllerAs] = ctrlInstance;
                            }
                        }

                        $modalStack.open(modalInstance, {
                            scope: modalScope,
                            deferred: modalResultDeferred,
                            content: tplAndVars[0],
                            backdrop: modalOptions.backdrop,
                            keyboard: modalOptions.keyboard,
                            backdropClass: modalOptions.backdropClass,
                            windowClass: modalOptions.windowClass,
                            windowTemplateUrl: modalOptions.windowTemplateUrl,
                            size: modalOptions.size
                        });

                    }, function resolveError(reason) {
                        modalResultDeferred.reject(reason);
                    });

                    templateAndResolvePromise.then(function () {
                        modalOpenedDeferred.resolve(true);
                    }, function () {
                        modalOpenedDeferred.reject(false);
                    });

                    return modalInstance;
                };

                return $modal;
            }]
      };

      return $modalProvider;
  });

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSdkApp.directive:attpinpad
 * @description
 * # attpinpad
 */
angular.module('connectedCarSDK.attPinPad', [])
    .factory('$pinPad', ['$rootScope', '$compile', '$document', function ($rootScope, $compile, $document) {

        return {

            show: function (options) {

                // first remove any existing pinPad elements from DOM
                var pinPadDomEl = $document.find('body').find('att-pin-pad');
                if (pinPadDomEl)
                    pinPadDomEl.remove();

                var angularDomEl = angular.element('<att-pin-pad ng-model="ngModel" on-confirm="onConfirm(ngModel)"></att-pin-pad>');
                angularDomEl.attr({
                  'num-digits': options.numDigits
                });
                angularDomEl.attr({
                  'template-url': options.templateUrl
                });

                var pinPadScope = $rootScope.$new(false);
                pinPadScope.ngModel = options.ngModel || '';
                pinPadScope.onConfirm = options.onConfirm ? options.onConfirm : null;

                pinPadDomEl = $compile(angularDomEl)(pinPadScope);

                $document.find('body').eq(0).append(pinPadDomEl);
            },

            close: function() {
                var pinPadDomEl = $document.find('body').find('att-pin-pad');
                if (pinPadDomEl)
                    pinPadDomEl.remove();
            }

        };
    }])
    .directive('attPinPad', function() {
        return {
            templateUrl: function(tElement, tAttrs) {
              return tAttrs.templateUrl || 'templates/attPinPad.html';
            },
            restrict: 'EA',
            scope: {
                numDigits: '@',
                ngModel: '=',
                onConfirm: '&'
            },
            link: function(scope) {

                // if model is undefined, set to empty string
                if (!scope.ngModel) {
                    scope.ngModel = '';
                }

                // if number of digits is undefined, default is 4 digits for pin number
                var numberOfDigits = 4;
                if (scope.numDigits) {
                    numberOfDigits = scope.numDigits;
                }

                scope.backspace = function () {
                    if (scope.ngModel && scope.ngModel.length > 0) {
                        scope.ngModel = scope.ngModel.slice(0, -1);
                    }
                };

                scope.appendToPin = function (val) {
                    if (val>=0 && scope.ngModel.length < numberOfDigits)
                        scope.ngModel += val.toString();
                };

                scope.isDisabled = function() {
                    if (scope.ngModel.length < numberOfDigits)
                        return true;
                    else return false;
                };
            }
        };
    });

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.progressbar.directive:attProgressbar
 * @description
 * # attprogressbar
 */
angular.module('connectedCarSDK.attProgressBar', [])
 .constant('progressConfig', {
     animate: true,
     max: 100,
     min: 0
 })

.controller('ProgressController', ['$scope', '$attrs', 'progressConfig', function ($scope, $attrs, progressConfig) {
    var self = this,
        animate = angular.isDefined($attrs.animate) ? $scope.$parent.$eval($attrs.animate) : progressConfig.animate;

    this.bars = [];
    $scope.max = angular.isDefined($attrs.max) ? $scope.$parent.$eval($attrs.max) : progressConfig.max;
    $scope.min = angular.isDefined($attrs.min) ? $scope.$parent.$eval($attrs.min) : progressConfig.min;
    $scope.textLeft = angular.isDefined($attrs.textLeft) ? $scope.$parent.$eval($attrs.textLeft) : progressConfig.textLeft;
    $scope.textRight = angular.isDefined($attrs.textRight) ? $scope.$parent.$eval($attrs.textRight) : progressConfig.textRight;

    this.addBar = function (bar, element) {
        if (!animate) {
            element.css({ 'transition': 'none' });
        }

        this.bars.push(bar);

        bar.$watch('value', function (value) {
            bar.percent = +(100 * value / $scope.max).toFixed(2);
        });

        bar.$on('$destroy', function () {
            element = null;
            self.removeBar(bar);
        });
    };

    this.removeBar = function (bar) {
        this.bars.splice(this.bars.indexOf(bar), 1);
    };
}])

.directive('attProgressBar', function () {
    return {
        restrict: 'EA',
        replace: true,
        controller: 'ProgressController',
        scope: {
            value: '=',
            type: '@'
        },
        templateUrl: 'templates/attProgressBar.html',
        link: function (scope, element, attrs, progressCtrl) {

            if (attrs.max && scope.value > scope.$parent.$eval(attrs.max))
                scope.value = attrs.max;

            progressCtrl.addBar(scope, angular.element(element.children()[0]));
        }
    };
});

'use strict';

angular.module('connectedCarSDK.attSimError', [])
  .directive('attSimError', [function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'templates/attSimError.html',
      link: function(scope, iElm, iAttrs, controller) {
          console.log('Params: ', scope, iElm, iAttrs, controller);
      }
    };
  }]);

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSdkApp.directive:attSlider
 * @description
 * # attSlider
 */
angular.module('connectedCarSDK.attSlider', [])
    .directive('attSlider', [function() {
        return {
            restrict: 'EA',
            templateUrl: 'templates/attSlider.html',
            scope: {
                type: '@',
                ngModel: '=',
                min: '@',
                max: '@',
                textLeft: '@',
                textRight: '@',
                parentControl: '@'
            },
            link: function (scope, element) {

                // set default values
                scope.min = scope.min || 0;
                scope.max = scope.max || 100;
                scope.ngModel = scope.ngModel || 0;
                
                var input = element.find('input');
                if (input && input.length > 0) {

                    // calculate gradient stop position
                    var value = (scope.ngModel - scope.min) / (scope.max - scope.min);
                    input[0].style.backgroundImage = [
                        '-webkit-gradient(',
                        'linear, ',
                        'left top, ',
                        'right top, ',
                        'color-stop(' + value + ', ' + getComputedStyle(input[0]).backgroundColor + '), ',
                        'color-stop(' + value + ', #ffffff)',
                        ')'
                    ].join('');
                    
                }

                //scope.sliderMovingInterval;
                scope.sliderMovingTime = 200;
                scope.sliderMoved = false;

                scope.sliderMoved = function () {
                    scope.$emit('sliderMoved', scope.parentControl);
                };               

                scope.sliderMoving = function () {
                    scope.$emit('sliderMoving', scope.parentControl);
                };

                // Add touch events to control slider on mobile devices
                var slider = element.find('input');

                slider.bind('touchstart', function () {
                    scope.$emit('sliderMoving', scope.parentControl);
                    this.focus();
                });

                slider.bind('touchend', function () {
                    scope.$emit('sliderMoved', scope.parentControl);
                    this.focus();
                });

                // watch for model changes and repaint the slider
                // using new calculated gradient stops
                scope.$watch(function () {
                    return scope.ngModel;
                }, function () {

                    if (input && input.length > 0) {
                        // calculate gradient stop position
                        var gradStop = (scope.ngModel - scope.min) / (scope.max - scope.min);
                        input[0].style.backgroundImage = [
                            '-webkit-gradient(',
                            'linear, ',
                            'left top, ',
                            'right top, ',
                            'color-stop(' + gradStop + ', ' + getComputedStyle(input[0]).backgroundColor + '), ',
                            'color-stop(' + gradStop + ', #ffffff)',
                            ')'
                        ].join('');
                    }
                });
            }
        };
    }]);

'use strict';

angular.module('connectedCarSDK.attTab', ['connectedCarSDK.attTabset'])
.directive('attTab', ['$parse', function ($parse) {
      return {
          require: '^attTabset',
          restrict: 'EA',
          replace: true,
          templateUrl: 'templates/tabs/attTab.html',
          transclude: true,
          scope: {
              active: '=?',
              heading: '@',
              onSelect: '&select', //This callback is called in contentHeadingTransclude
              //once it inserts the tab's content into the dom
              onDeselect: '&deselect'
          },
          controller: function () {
              //Empty controller so other directives can require being 'under' a tab
          },
          compile: function (elm, attrs, transclude) {
              return function postLink(scope, elm, attrs, tabsetCtrl) {
                  scope.$watch('active', function (active) {
                      if (active) {
                          tabsetCtrl.select(scope);
                      }
                  });

                  scope.disabled = false;
                  if (attrs.disabled) {
                      scope.$parent.$watch($parse(attrs.disabled), function (value) {
                          scope.disabled = !!value;
                      });
                  }

                  scope.select = function () {
                      if (!scope.disabled) {
                          scope.active = true;
                      }
                  };

                  tabsetCtrl.addTab(scope);
                  scope.$on('$destroy', function () {
                      tabsetCtrl.removeTab(scope);
                  });

                  //We need to transclude later, once the content container is ready.
                  //when this link happens, we're inside a tab heading.
                  scope.$transcludeFn = transclude;
              };
          }
      };
  }])
.directive('tabHeadingTransclude', [function () {
    return {
        restrict: 'A',
        require: '^attTab',
        link: function (scope, elm) {
            scope.$watch('headingElement', function updateHeadingElement(heading) {
                if (heading) {
                    elm.html('');
                    elm.append(heading);
                }
            });
        }
    };
}])
.directive('tabContentTransclude', function () {
    function isTabHeading(node) {
        return node.tagName && (
          node.hasAttribute('tab-heading') ||
          node.hasAttribute('data-tab-heading') ||
          node.tagName.toLowerCase() === 'tab-heading' ||
          node.tagName.toLowerCase() === 'data-tab-heading'
        );
    }

    return {
        restrict: 'A',
        require: '^attTabset',
        link: function (scope, elm, attrs) {
            var tab = scope.$eval(attrs.tabContentTransclude);

            //Now our tab is ready to be transcluded: both the tab heading area
            //and the tab content area are loaded.  Transclude 'em both.
            tab.$transcludeFn(tab.$parent, function (contents) {
                angular.forEach(contents, function (node) {
                    if (isTabHeading(node)) {
                        //Let tabHeadingTransclude know.
                        tab.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });
        }
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.tabset.directive:attTabset
 * @description
 * # attTabset
 */
angular.module('connectedCarSDK.attTabset', [])
.controller('TabsetController', [
    '$scope', function($scope) {
        var ctrl = this,
            tabs = ctrl.tabs = $scope.tabs = [];

        ctrl.select = function(selectedTab) {
            angular.forEach(tabs, function(tab) {
                if (tab.active && tab !== selectedTab) {
                    tab.active = false;
                    tab.onDeselect();
                }
            });
            selectedTab.active = true;
            selectedTab.onSelect();
        };

        ctrl.addTab = function addTab(tab) {
            tabs.push(tab);
            // we can't run the select function on the first tab
            // since that would select it twice
            if (tabs.length === 1) {
                tab.active = true;
            } else if (tab.active) {
                ctrl.select(tab);
            }
        };

        ctrl.removeTab = function removeTab(tab) {
            var index = tabs.indexOf(tab);
            //Select a new tab if the tab to be removed is selected
            if (tab.active && tabs.length > 1) {
                //If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index === tabs.length - 1 ? index - 1 : index + 1;
                ctrl.select(tabs[newActiveIndex]);
            }
            tabs.splice(index, 1);
        };
    }
])
.directive('attTabset', function() {
    return {
        restrict: 'EA',
        transclude: true,
        replace: true,
        scope: {
            type: '@'
        },
        controller: 'TabsetController',
        templateUrl: 'templates/tabs/attTabset.html',
        link: function(scope, element, attrs) {
            scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
            scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
            scope.topPosition = angular.isDefined(attrs.topPosition) ? scope.$parent.$eval(attrs.topPosition) : false;
        }
    };
});

'use strict';

/**
 * @ngdoc directive
 * @name connectedCarSDK.toggleSwitch.directive:attToggleSwitch
 * @description
 * # attToggleSwitch
 */
angular.module('connectedCarSDK.attToggleSwitch', [])
  .directive('attToggleSwitch', function () {
      return {
          templateUrl: 'templates/attToggleSwitch.html',
          restrict: 'E',
          scope: {
              ngModel: '=',
              onChange: '&'
          },
          require: '^ngModel',
          link: function (scope, element, attrs) {

              if (angular.isDefined(attrs.disabled) && (attrs.disabled === 'true' || attrs.disabled === '')) {
                  element.find('*').attr('disabled', 'disabled');
              }

              scope.click = function(enabled) {
                  scope.ngModel = enabled;
              };

              scope.$watch('ngModel', function (newValue, oldValue) {
                  if (angular.isDefined(oldValue) && newValue !== oldValue)
                      scope.onChange();
              });

          }
      };
  });

'use strict';

angular.module('connectedCarSDK.attVehicleInMotion', [])
  .directive('attVehicleInMotion', [function(){
    return {
      restrict: 'E',
      replace: 'true',
      templateUrl: 'templates/attVehicleInMotion.html',
      link: function (scope, iElm, iAttrs, controller) {

          console.log('Properties: ', scope, iElm, iAttrs, controller);
      }
    };
  }]);
