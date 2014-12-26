angular.module('twoVideosController', [])

  .controller('TwoVideosCtrl', function ($scope, $sce) {
    $scope.subColumns = [
      {
        label: 'Build In-Car Head Unit Apps',
        videoSrc: $sce.trustAsResourceUrl('//www.youtube.com/embed/fbW2ESVqSvk?list=UUyDZ-l0emqyxpypCi-_rJyQ'),
        links: [
          {
            label: 'Get Started',
            ref: 'head-unit-apps',
            isStateRoute: true
          },
          {
            label: 'Vehicle API',
            ref: 'api-docs.vehicle-apps-api',
            isStateRoute: true
          },
          {
            label: 'App Framework',
            ref: 'api-docs.vehicle-apps-api',
            isStateRoute: true
          },
          {
            label: 'Sample App',
            ref: 'api-docs.vehicle-apps-api',
            isStateRoute: true
          }
        ],
        headerLink: 'head-unit-apps'
      },
      {
        label: 'Build Out-of-Car Mobile or Web Apps',
        videoSrc: $sce.trustAsResourceUrl('//www.youtube.com/embed/fbW2ESVqSvk?list=UUyDZ-l0emqyxpypCi-_rJyQ'),
        links: [
          {
            label: 'Get Started',
            ref: 'head-unit-apps',
            isStateRoute: true
          },
          {
            label: 'Web API',
            ref: 'api-docs.web-apps-api.getting-started',
            isStateRoute: true
          },
          {
            label: 'Sandbox (Luigi)',
            ref: 'api-docs.vehicle-apps-api',
            isStateRoute: true
          },
          {
            label: 'Sample App',
            ref: 'https://github.com/ericsson-innovate/asdp-api-sampler-javascript',
            isStateRoute: false
          }
        ],
        headerLink: 'api-docs.web-apps-api.getting-started'
      }
    ];
  });
