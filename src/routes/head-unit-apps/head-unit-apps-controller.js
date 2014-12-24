angular.module('headUnitAppsController', [])

  .controller('HeadUnitAppsCtrl', function ($scope, homeSectionsSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.homeSectionsSideBarLinks = homeSectionsSideBarLinks;
    $scope.bubbles = [
      {
        label: 'Get Started',
        ref: 'api-docs.vehicle-apps-api',
        isStateRoute: true
      },
      {
        label: 'Sample Apps',
        ref: 'api-docs.web-apps-api.sample-apps',
        isStateRoute: true
      },
      {
        label: 'Simulator',
        ref: 'api-docs.vehicle-apps-api',
        isStateRoute: true
      },
      {
        label: 'UI Kit',
        ref: 'api-docs.vehicle-apps-api',
        isStateRoute: true
      },
      {
        label: 'Drive API',
        ref: 'api-docs.web-apps-api.getting-started',
        isStateRoute: true
      }
    ];
  });
