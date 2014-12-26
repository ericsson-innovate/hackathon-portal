angular.module('headUnitAppsController', [])

  .controller('HeadUnitAppsCtrl', function ($scope, homeSectionsSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.homeSectionsSideBarLinks = homeSectionsSideBarLinks;
    $scope.bubbles = [
      {
        label: 'Get Started',
        ref: document.URL + '#getting-started',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon.png'
      },
      {
        label: 'Sample Apps',
        ref: document.URL + '#sample-apps',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-sample-apps.png'
      },
      {
        label: 'Simulator',
        ref: document.URL + '#simulator',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-simulator-3.png'
      },
      {
        label: 'UI Kit',
        ref: document.URL + '#ui-kit',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-ui-kit.png'
      },
      {
        label: 'Drive API',
        ref: document.URL + '#drive-api',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-api.png'
      }
    ];
  });
