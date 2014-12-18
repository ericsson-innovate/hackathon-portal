angular.module('webAppsApiController', [])

  .controller('WebAppsApiCtrl', function ($scope, $rootScope, $state, $timeout, sideBarLinks, categories) {
    $scope.webAppsApiState = {};
    $scope.webAppsApiState.sideBarLinks = sideBarLinks;
    $scope.webAppsApiState.categories = categories;
    $scope.webAppsApiState.selectedApiCategory = $rootScope.selectedApiCategory;
    $scope.webAppsApiState.selectedAnimation = null;
    $scope.webAppsApiState.sideBarSelectedLink = null;

    $scope.myState = $state;

    $rootScope.$on('$stateChangeSuccess', handleStateChangeSuccess);

    $scope.webAppsApiState.handleSideBarClick = handleSideBarClick;
    $scope.webAppsApiState.handleCategoryTabClick = handleCategoryTabClick;

    // ---  --- //

    function handleStateChangeSuccess(event, toState, toParams, fromState, fromParams) {
      if (toState.name === 'web-apps-api.api-documentation') {
        $state.go($rootScope.defaultCategory.ref);
        return;
      }

      $scope.myState = toState;

      for (var i = 0; i < sideBarLinks.length; i++) {
        var link = sideBarLinks[i];

        if (toState.name.indexOf(link.ref) == 0) {
          $scope.webAppsApiState.sideBarSelectedLink = link.ref;
          break;
        }
      }

      $scope.webAppsApiState.selectedApiCategory = $rootScope.selectedApiCategory;
    }

    function handleSideBarClick(link) {
      console.log('Side bar item click');

      var targetState = link.ref;

      if (link.ref === 'web-apps-api.api-documentation')
        targetState = $rootScope.defaultCategory.ref;

      $state.go(targetState);
    }

    function handleCategoryTabClick(category) {
      console.log('Category tab click');

      $rootScope.selectedApiCategory = category.id;

      // Transition to the API documentation route/state
      $state.go('web-apps-api.api-documentation.' + category.id);
    }
  });
