'use strict';

/**
 * @ngdoc object
 * @name hackApp
 * @requires $locationProvider
 * @requires $stateProvider
 * @requires $urlRouterProvider
 * @requires $rootScope
 * @requires $log
 * @requires $state
 * @description
 *
 * The main module of the hackathon-portal application.
 *
 *   - Loads all of the sub-modules
 *   - Defines routes via `$routeProvider`
 */
angular.module('hackApp', [
  'ui.router',

  'hackController',

  'categoryFilter',
  'errorDescriptionFilter',
  'orderApiCallsFilter',

  'syncPrismDirective',

  'apiListItemDirective',
  'apiSpecificationCardDirective',
  'apiExampleCardDirective',
  'apiTryItCardDirective',
  'apiListDirective',

  'apiService',
  'examplesService',
  'specificationsService',
  'tryItService',

  'apiDocumentationController',
  'gettingStartedController',
  'sampleAppsController'
])

.constant('authString', 'Basic cHJvdmlkZXI6MTIzNA==')
.constant('apiKey', 'api-key-1234')
.constant('emulatorDomain', 'http://lightning.att.io:3000')
//.constant('emulatorDomain', 'http://mater.att.io:3000')
//.constant('emulatorDomain', 'http://asdp-emulator-env-rtfnw3u24d.elasticbeanstalk.com')

.constant('specificationUrl', hack.rootPath + '/dist/data/specifications.json')
.constant('emptyImagePath', hack.rootPath + '/dist/images/empty.gif')
.constant('dataPath', hack.rootPath + '/data')

.constant('androidExampleUrl', hack.rootPath)// TODO: change this after the example code has been moved
.constant('iosExampleUrl', hack.rootPath)// TODO: change this after the example code has been moved
.constant('webExampleUrl', hack.rootPath)// TODO: change this after the example code has been moved

.constant('sideBarLinks', [
  {
    isStateRoute: true,
    ref: 'getting-started',
    label: 'Getting Started',
    url: '/getting-started',
    templateUrl: hack.rootPath + '/dist/templates/routes/getting-started/getting-started.html',
    controller: 'GettingStartedCtrl'
  },
  {
    isStateRoute: true,
    ref: 'api-documentation',
    label: 'API Documentation',
    url: '/api-documentation',
    templateUrl: hack.rootPath + '/dist/templates/routes/api-documentation/api-documentation.html',
    controller: 'ApiDocumentationCtrl'
  },
  {
    isStateRoute: true,
    ref: 'sample-apps',
    label: 'Sample Apps',
    url: '/sample-apps',
    templateUrl: hack.rootPath + '/dist/templates/routes/sample-apps/sample-apps.html',
    controller: 'SampleAppsCtrl'
  }
])
.constant('httpStatusCodes', {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  301: 'Moved permanently',
  302: 'Found',
  400: 'Bad request (invalid parameters)',
  401: 'Not authenticated',
  403: 'Not authorized to use the service',
  404: 'Resource not found',
  412: 'Resource already exists',
  500: 'Internal error',
  503: 'Service unavailable'
})
.constant('apiList', {
  '2.6-vehicle-remote-services': [
    '2.6.1-sign-up',
    '2.6.2-validate-otp',
    '2.6.3-set-pin',
    '2.6.4-login',
    '2.6.5-door-unlock',
    '2.6.6-door-lock',
    '2.6.7-engine-on',
    '2.6.8-engine-off',
    '2.6.9-honk-and-blink',
    '2.6.10-check-request-status',
    '2.6.11-view-diagnostic-data',
    '2.6.12-get-vehicle-status'
  ],
  '2.7-vehicle-telematics': [
    '2.7.1-get-message',
    '2.7.2-send-message',
    '2.7.3-tcu-shoulder-tap',
    '2.7.4-ping-tcu',
    '2.7.5-tcu-notification-channel'
  ],
  '2.12-commerce': [
    '2.12.1-consume',
    '2.12.2-consume-by-ticket-id',
    '2.12.3-check-valid-ticket',
    '2.12.4-create-premium-offers',
    '2.12.5-deactivate-one-time-purchase',
    '2.12.6-deactivate-recurrent-purchase',
    '2.12.7-full-purchase',
    '2.12.8-get-prices',
    '2.12.9-get-products',
    '2.12.10-get-products-by-ids',
    '2.12.11-get-user-purchases',
    '2.12.12-get-user-tickets',
    '2.12.13-get-tickets-by-purchase-id',
    '2.12.14-get-tickets-by-ticket-id',
    '2.12.15-purchase',
    '2.12.16-purchase-by-premium-offer-id',
    '2.12.17-purchase-by-product-id',
    '2.12.18-refund',
    '2.12.19-resume-recurrent-purchase',
    '2.12.20-stop-purchase-renewal',
    '2.12.21-extend-one-time-purchase',
    '2.12.22-extend-recurrent-purchase',
    '2.12.23-full-gift',
    '2.12.24-gift',
    '2.12.25-gift-by-product-id',
    '2.12.26-gift-by-premium-offer-id',
    '2.12.27-refill'
  ],
  '2.13-subscriber-management': [
    '2.13.1-add-a-subscriber',
    '2.13.2-add-a-subscriber-and-vehicle',
    '2.13.3-update-a-subscriber',
    '2.13.4-delete-a-subscriber',
    '2.13.5-view-a-subscriber',
    '2.13.6-search-subscribers'
  ],
  '2.16-vehicle-management': [
    '2.16.1-add-a-vehicle',
    '2.16.2-update-a-vehicle',
    '2.16.3-delete-a-vehicle',
    '2.16.4-view-a-vehicle',
    '2.16.5-update-vehicle-users',
    '2.16.6-delete-vehicle-users',
    '2.16.7-search-vehicles'
  ]
})
.constant('categories', [
  {
    id: 'know-driver',
    name: 'Know the Driver'
  },
  {
    id: 'know-car',
    name: 'Know the Car'
  },
  {
    id: 'control-car',
    name: 'Control the Car'
  }
])

.run(function ($rootScope, categories, HackApi) {
  $rootScope.defaultCategory = categories[1];

  // Pre-fetch all of the API data
  HackApi.fetchAllApiData();
});

// TODO: address the TODOs within the data JSON files
// TODO: make sure that the server can handle all of the requests that this fetching causes... run some stress tests?
