angular.module('driveApiController', [])

  .controller('DriveApiCtrl', function ($scope, $rootScope, $state, $timeout, sideBarLinks, categories, animations) {
    $scope.driveApiState = {};
    $scope.driveApiState.sideBarLinks = sideBarLinks;
    $scope.driveApiState.categories = categories;
    $scope.driveApiState.animations = animations;
    $scope.driveApiState.selectedApiCategory = $rootScope.selectedApiCategory;
    $scope.driveApiState.selectedAnimation = null;
    $scope.driveApiState.sideBarSelectedLink = null;

    $scope.myState = $state;

    $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

    $scope.driveApiState.handleSideBarClick = handleSideBarClick;
    $scope.driveApiState.handleCategoryTabClick = handleCategoryTabClick;

    // ---  --- //

    function handleStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'drive-api.api-documentation') {
        $state.go($rootScope.defaultCategory.ref);
        return;
      }

      $scope.myState = toState;

      for (var i = 0; i < sideBarLinks.length; i++) {
        var link = sideBarLinks[i];

        if (toState.name.indexOf(link.ref) == 0) {
          $scope.driveApiState.sideBarSelectedLink = link.ref;
          break;
        }
      }

      $scope.driveApiState.selectedApiCategory = $rootScope.selectedApiCategory;
    }

    function handleSideBarClick(link) {
      console.log('Side bar item click');

      var targetState = link.ref;

      if (link.ref === 'drive-api.api-documentation')
        targetState = $rootScope.defaultCategory.ref;

      $state.go(targetState);
    }

    function handleCategoryTabClick(category) {
      console.log('Category tab click');

      $rootScope.selectedApiCategory = category.id;

      // Transition to the API documentation route/state
      $state.go('drive-api.api-documentation.' + category.id);
    }
  });
