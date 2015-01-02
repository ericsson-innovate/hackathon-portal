angular.module('twoVideosController', [])

  .controller('TwoVideosCtrl', function ($scope, $sce) {
    $scope.subColumns = [
      {
        label: 'Build In-Car Head Unit Apps',
        videoSrc: $sce.trustAsResourceUrl('/dist/images/app-image.png'),
        links: [
          {
            label: 'Get Started',
            ref: 'head-unit-apps',
            isStateRoute: true
          },
          {
            label: 'Vehicle API',
            ref: 'api-docs.vehicle-apps-api({sectionId:\'context-initialization\'})',
            isStateRoute: true
          },
          {
            label: 'App Framework',
            ref: 'https://github.com/ericsson-innovate/ATT-Drive-UI-Framework',
            isStateRoute: false
          },
          {
            label: 'Sample App',
            ref: 'https://github.com/ericsson-innovate/sample-app',
            isStateRoute: false
          }
        ],
        headerLink: 'head-unit-apps'
      },
      {
        label: 'Build Out-of-Car Mobile or Web Apps',
        videoSrc: $sce.trustAsResourceUrl('/dist/images/api-image.png'),
        links: [
          {
            label: 'Get Started',
            ref: 'api-docs.web-apps-api.getting-started',
            isStateRoute: true
          },
          {
            label: 'Web API',
            ref: 'api-docs.web-apps-api.control-car',
            isStateRoute: true
          },
          {
            label: 'Sandbox (Luigi)',
            ref: 'http://mafalda.hack.att.io/',
            isStateRoute: false
          },
          {
            label: 'Sample Apps',
            ref: 'api-docs.web-apps-api.sample-apps',
            isStateRoute: true
          }
        ],
        headerLink: 'api-docs.web-apps-api.getting-started'
      }
    ];
  });
