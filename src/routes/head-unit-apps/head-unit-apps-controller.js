angular.module('headUnitAppsController', [])

  .controller('HeadUnitAppsCtrl', function ($scope, $anchorScroll, topLevelRoutes, homeSectionsSideBarLinks) {
    var routeUrl = document.baseURI + '#/head-unit-apps';

    $scope.homeState = {};
    $scope.homeState.homeSectionsSideBarLinks = homeSectionsSideBarLinks;
    $scope.bubbles = [
      {
        label: 'Get Started',
        ref: routeUrl + '#getting-started',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon.png'
      },
      {
        label: 'Sample Apps',
        ref: routeUrl + '#sample-apps',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-sample-apps.png'
      },
      {
        label: 'Simulator',
        ref: routeUrl + '#simulator',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-simulator-3.png'
      },
      {
        label: 'UI Kit',
        ref: routeUrl + '#ui-kit',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-ui-kit.png'
      },
      {
        label: 'Drive API',
        ref: routeUrl + '#drive-api',
        isStateRoute: false,
        imageRoute: document.baseURI + 'dist/images/getting-started-icon-api.png'
      }
    ];

    $anchorScroll.yOffset = document.querySelector('short-header').offsetHeight + 20;
  });
