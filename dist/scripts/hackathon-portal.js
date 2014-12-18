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
  'hljs',

  'hackController',

  'categoryFilter',
  'errorDescriptionFilter',
  'orderApiCallsFilter',
  'sectionTitleToStateIdFilter',
  'unescapeJsonStringFilter',

  'apiListItemDirective',
  'apiSpecificationCardDirective',
  'apiExampleCardDirective',
  'apiTryItCardDirective',
  'apiListDirective',
  'dynamicMarkdownListDirective',
  'dynamicMarkdownListItemDirective',
  'headerDirective',
  'homePageSectionDirective',
  'markdownBlockDirective',
  'shortHeaderDirective',
  'tallHeaderDirective',

  'apiService',
  'examplesService',
  'specificationsService',
  'tryItService',
  'markdownDataService',

  'webAppsApiController',
  'homeController',
  'apiDocsController',

  'apiDocumentationController',
  'gettingStartedController',
  'sampleAppsController'
])

.run(function ($rootScope, $http, categories, sampleAppData, HackApi) {
  $rootScope.defaultCategory = categories[2];
  $rootScope.carouselHasRunOnce = false;

  // Pre-fetch all of the API data
  HackApi.fetchAllApiData();
//      .then(loadSampleAppReadmeFiles);
//
//  function loadSampleAppReadmeFiles() {
//    sampleAppData.forEach(function (sampleAppItemData) {
//      $http.get(sampleAppItemData.readmeUrl)
//          .then(function (response) {
//            console.log('Loaded ' + sampleAppItemData.platform + ' README');
//            sampleAppItemData.readmeText = response.data;
//          })
//          .catch(function (error) {
//            console.log('Unable to load ' + sampleAppItemData.platform + ' README', error);
//          });
//    });
//  }
});

'use strict';

angular.module('categoryFilter', [])

/**
 * @ngdoc filter
 * @name category
 * @description
 *
 * This is a filter for only showing the API calls that belong to a given category.
 */
.filter('category', function () {
  return function (input, category) {
    var i, j, count, matches;

    matches = [];

    for (i = 0, j = 0, count = input.length; i < count; i += 1) {
      if (input[i].specification.categories.indexOf(category) >= 0) {
        matches[j++] = input[i];
      }
    }

    return matches;
  }
});

'use strict';

angular.module('hackApp')

  .constant('apiKey', 'api-key-1234')
  .constant('emulatorDomain', 'http://car1.hack.att.io:3000')
  .constant('username', 'provider')
  .constant('password', '1234')
//.constant('emulatorDomain', 'http://mater.att.io:3000')
//.constant('emulatorDomain', 'http://asdp-emulator-env-rtfnw3u24d.elasticbeanstalk.com')

  .constant('specificationUrl', document.baseURI + '/dist/data/specifications.json')
  .constant('emptyImagePath', document.baseURI + '/dist/images/empty.gif')
  .constant('dataPath', document.baseURI + '/data')

  .constant('androidExampleUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-android/master')
  .constant('iosExampleUrl', 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-ios/master')
  .constant('webExampleUrl', document.baseURI)

  .constant('luceneDefinitionUrl', 'http://lucene.apache.org/core/2_9_4/queryparsersyntax.html')

  .constant('dataLoadedEvent', 'dataLoadedEvent')

  // TODO: add support for the old JSON data format
  // TODO: change one of these API doc URLs
  .constant('dataCollections', [
    {
      id: 'vehicle-apps-api',
      label: 'Vehicle Apps API',
      url: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/data/VehicleAPI.md',
      type: 'markdown-api',
      sections: []
    },
    {
      id: 'vehicle-ui-api',
      label: 'Vehicle UI API',
      url: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/data/VehicleAPI.md',
      type: 'markdown-api',
      sections: []
    },
    {
      id: 'web-apps-api',
      label: 'Web Apps API',
      url: document.baseURI + '/dist/data/specifications.json',
      type: 'json-api',
      sections: []
    },
    {
      id: 'setup',
      label: 'Setup',
      url: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/hackathon-portal/gh-pages/data/Setup.md',
      type: 'markdown-setup',
      sections: []
    }
  ])

  .constant('sampleAppData', [
    {
      platform: 'android',
      humanReadablePlatform: 'Android',
      iconUrl: document.baseURI + '/dist/images/android-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-android',
      readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-android/master/README.md',
      readmeText: 'Loading README...'
    },
    {
      platform: 'ios',
      humanReadablePlatform: 'iOS',
      iconUrl: document.baseURI + '/dist/images/ios-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-ios',
      readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-ios/master/README.md',
      readmeText: 'Loading README...'
    },
    {
      platform: 'web',
      humanReadablePlatform: 'Web',
      iconUrl: document.baseURI + '/dist/images/web-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/asdp-api-sampler-javascript',
      readmeUrl: 'http://github-raw-cors-proxy.herokuapp.com/ericsson-innovate/asdp-api-sampler-javascript/master/README.md',
      readmeText: 'Loading README...'
    },
    {
      platform: 'angularjs',
      humanReadablePlatform: 'AT&T Drive UI Kit',
      iconUrl: document.baseURI + '/dist/images/angularjs-icon.png',
      repoUrl: 'https://github.com/ericsson-innovate/ATT-Drive-UI-Framework',
      readmeUrl: 'https://raw.githubusercontent.com/ericsson-innovate/ATT-Drive-UI-Framework/master/README.md',
      readmeText: 'Loading README...'
    }
  ])

  .constant('topLevelRoutes', [
    {
      ref: 'home',
      url: '/home',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/home/home.html',
      controller: 'HomeCtrl',
      defaultParams: {
      }
    },
    {
      ref: 'web-apps-api',
      //url: '/web-apps-api/:sectionId/:categoryId/:callId',
      url: '/web-apps-api',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/web-apps-api.html',
      controller: 'WebAppsApiCtrl',
      defaultParams: {
        //sectionId: 'api-documentation',
        //categoryId: 'know-car',
        //callId: null
        // TODO: add the new structure for route IDs to the old routing logic
      }
    },
    {
      ref: 'vehicle-apps-api',
      url: '/vehicle-apps-api/:sectionId',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/api-docs/api-docs.html',
      controller: 'ApiDocsCtrl',
      defaultParams: {
        sectionId: 'context-initialization'
      }
    },
    {
      ref: 'vehicle-ui-api',
      url: '/vehicle-ui-api/:sectionId',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/api-docs/api-docs.html',
      controller: 'ApiDocsCtrl',
      defaultParams: {
        sectionId: 'context-initialization'
      }
    },
    {
      ref: 'setup',
      url: '/setup/:sectionId',
      isAbstract: false,
      templateUrl: document.baseURI + '/dist/templates/routes/api-docs/api-docs.html',
      controller: 'ApiDocsCtrl',
      defaultParams: {
        sectionId: 'introduction'
      }
    }
  ])

  .constant('homeSectionsSideBarLinks', {
    'gettingStarted': [
      {
        isStateRoute: true,
        state: 'setup',
        label: 'Developer Environment Setup Guide'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Download UI Design Assets'
      }
    ],
    'headUnitSimulator': [
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Download Head Unit Simulator'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Head Unit Simulator Settings'
      }
    ],
    'sampleApps': [
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Download Sample Apps'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Hello World App'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Navigation App'
      }
    ],
    'uiApi': [
      {
        isStateRoute: true,
        state: 'vehicle-ui-api',
        label: 'Preview UI API'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Download App Framework'
      },
      {
        isStateRoute: false,
        url: 'https://github.com/ericsson-innovate',// TODO: set the actual link
        label: 'Download UI Design Assets'
      }
    ],
    'vehicleApi': [
      {
        isStateRoute: true,
        state: 'vehicle-apps-api',
        label: 'Vehicle API'
      },
      {
        isStateRoute: false,
        url: document.baseURI + '/#/web-apps-api/api-documentation/know-car',
        label: 'Web API'
      }
    ]
  })

  .constant('sideBarLinks', [
    {
      isStateRoute: true,
      ref: 'web-apps-api.getting-started',
      label: 'Getting Started',
      url: '/getting-started',
      templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/getting-started/getting-started.html',
      controller: 'GettingStartedCtrl'
    },
    {
      isStateRoute: true,
      ref: 'web-apps-api.api-documentation',
      label: 'API Documentation',
      url: '/api-documentation',
      templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/api-documentation/api-documentation.html',
      controller: 'ApiDocumentationCtrl'
    },
    {
      isStateRoute: true,
      ref: 'web-apps-api.sample-apps',
      label: 'Sample Apps',
      url: '/sample-apps',
      templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/sample-apps/sample-apps.html',
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
      '2.12.9-get-products',
      '2.12.11-get-user-purchases',
      '2.12.15-purchase'
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
      name: 'Know the Driver',
      ref: 'web-apps-api.api-documentation.know-driver',
      specs: [
        '2.13.1-add-a-subscriber',
        '2.13.2-add-a-subscriber-and-vehicle',
        '2.13.3-update-a-subscriber',
        '2.13.4-delete-a-subscriber',
        '2.13.5-view-a-subscriber',
        '2.13.6-search-subscribers',
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
      ]
    },
    {
      id: 'know-car',
      name: 'Know the Car',
      ref: 'web-apps-api.api-documentation.know-car',
      specs: [
        '2.6.10-check-request-status',
        '2.6.11-view-diagnostic-data',
        '2.6.12-get-vehicle-status',
        '2.16.1-add-a-vehicle',
        '2.16.2-update-a-vehicle',
        '2.16.3-delete-a-vehicle',
        '2.16.4-view-a-vehicle',
        '2.16.5-update-vehicle-users',
        '2.16.6-delete-vehicle-users',
        '2.16.7-search-vehicles'
      ]
    },
    {
      id: 'control-car',
      name: 'Control the Car',
      ref: 'web-apps-api.api-documentation.control-car',
      specs: [
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
        '2.7.1-get-message',
        '2.7.2-send-message',
        '2.7.3-tcu-shoulder-tap',
        '2.7.4-ping-tcu',
        '2.7.5-tcu-notification-channel'
      ]
    }
  ])

  .constant('animations', [
    {
      id: 'animation-1',
      label: 'set-1',
      parameters: {}
    },
    {
      id: 'animation-2',
      label: 'set-2',
      parameters: {}
    },
    {
      id: 'animation-3',
      label: 'set-3',
      parameters: {}
    },
    {
      id: 'animation-4',
      label: 'set-4',
      parameters: {}
    }
  ]);
'use strict';

angular.module('errorDescriptionFilter', [])

/**
 * @ngdoc filter
 * @name errorDescription
 * @requires httpStatusCodes
 * @description
 *
 * This is a filter for providing the descriptions of errors according to their error codes.
 */
.filter('errorDescription', function (httpStatusCodes) {
  return function (input) {
    return httpStatusCodes[input] || 'Unknown error';
  }
});

angular.module('hackController', [])

  .constant('car1Url', document.baseURI + '/dist/images/car-1.png')
  .constant('car2Url', document.baseURI + '/dist/images/car-2.png')

  .controller('HackCtrl', function ($scope) {
    $scope.hackState = {};
  });

'use strict';

angular.module('orderApiCallsFilter', [])

/**
 * @ngdoc filter
 * @name orderApiCalls
 * @description
 *
 * This is a filter for ordering the API call items by ID.
 */
.filter('orderApiCalls', function () {
  return function (input) {
    input.sort(function (a, b) {
      if (a.specification.displayWeight !== b.specification.displayWeight) {
        return b.specification.displayWeight - a.specification.displayWeight;
      } else {
        return parseFloat(a.specification.docNumber.substr(2)) -
            parseFloat(b.specification.docNumber.substr(2))
      }
    });
    return input;
  };
});

'use strict';

/**
 * Defines routes via `$routeProvider`.
 */

angular.module('hackApp')

  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, topLevelRoutes, sideBarLinks, categories) {
    // Re-route invalid routes back to home
    $urlRouterProvider.otherwise(topLevelRoutes[0].url);//topLevelRoutes[1].url + sideBarLinks[1].url

    var apiLink;

    topLevelRoutes.forEach(function (route) {
      $stateProvider
        .state({
          name: route.ref,
          url: route.url,
          abstract: route.isAbstract,
          templateUrl: route.templateUrl,
          controller: route.controller,
          resolve: {
            'collections': function (MarkdownData) {
              return MarkdownData.fetchDocumentation();
            }
          },
          params: route.defaultParams
        });
    });

    sideBarLinks.forEach(function (link) {
      if (link.isStateRoute) {
        // Use UI-Router to allow for both URL and state-based routing
        $stateProvider
          .state({
            name: link.ref,
            url: link.url,
            templateUrl: link.templateUrl,
            controller: link.controller
          });
      }

      if ('web-apps-api.api-documentation' === link.ref) {
        apiLink = link;
      }
    });

    if (apiLink) {
      categories.forEach(function (category) {
        var routeName = apiLink.ref + '.' + category.id;
        var routeUrl = '/' + category.id;

        $stateProvider.state({ name: routeName, url: routeUrl, templateUrl: apiLink.templateUrl, controller: apiLink.controller });

        category['specs'].forEach(function (api) {
          var apiName = api.replace(/\./g, '_');
          var routeName = apiLink.ref + '.' + category.id + '.' + apiName;
          var routeUrl = '/' + apiName;

          $stateProvider.state({ name: routeName, url: routeUrl, templateUrl: apiLink.templateUrl, controller: apiLink.controller });

          // TODO: implement these deeper nestings
          // $stateProvider.state(routeName + '.specification',    { url: '/specification',  templateUrl: apiLink.templateUrl, controller: apiLink.controller });
          // $stateProvider.state(routeName + '.example',          { url: '/example',        templateUrl: apiLink.templateUrl, controller: apiLink.controller });
          // $stateProvider.state(routeName + '.example.android',  { url: '/android',        templateUrl: apiLink.templateUrl, controller: apiLink.controller });
          // $stateProvider.state(routeName + '.example.ios',      { url: '/ios',            templateUrl: apiLink.templateUrl, controller: apiLink.controller });
          // $stateProvider.state(routeName + '.example.web',      { url: '/web',            templateUrl: apiLink.templateUrl, controller: apiLink.controller });
          // $stateProvider.state(routeName + '.try',              { url: '/try',            templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        });
      });
    }
  })

  .run(function ($rootScope, $log) {
    $rootScope.routeState = {};

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var isApiDoc;

      $log.debug('$stateChangeStart', toState.name);

      // If we are coming from another page, then do not continue with the carousel auto-transition
      if ($rootScope.routeState.name) {
        $rootScope.carouselHasRunOnce = true;
      }

      // Allows us to use a different CSS class for the top-level view element for each route
      $rootScope.routeState = toState;

      isApiDoc = toState.name.indexOf('web-apps-api.api-documentation') === 0;

      if (isApiDoc) {
        var entities = toState.name.split('.');

        if (entities.length > 1) {
          // TODO: get rid of these, if they are unneeded
          $rootScope.selectedApiCategory = entities[2];
          $rootScope.selectedApi = entities[3];
          $rootScope.selectedApiTab = entities[4];
          $rootScope.selectedApiExample = entities[5];
        } else {
          if ($rootScope.selectedApiCategory == null) {
            $rootScope.selectedApiCategory = $rootScope.defaultCategory;
          }
        }
      } else {
        $rootScope.selectedApiCategory = null;
      }
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
      $log.debug('$stateNotFound', unfoundState.name);
    });

    $rootScope.$on('$stateChangeSuccess',
      function (event, toState, toParams, fromState, fromParams) {
        $log.debug('$stateChangeSuccess', toState.name);
      });

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        $log.debug('$stateChangeError', toState.name, error);
      });

    $rootScope.$on('$viewContentLoaded', function (event) {
      console.log('$viewContentLoaded');
    });
  });

angular.module('sectionTitleToStateIdFilter', [])

.filter('sectionTitleToStateId', function () {
  return function (input) {
    return input.toLowerCase().replace(' ', '-').replace(/\W/, '');
  }
});

'use strict';

angular.module('unescapeJsonStringFilter', [])

/**
 * @ngdoc filter
 * @name unescapeJsonString
 * @description
 *
 * This is a filter for unescaping characters in a JSON string.
 */
.filter('unescapeJsonString', function () {
  var token = '########',
      tokenRegex = /########/g;
  return function (input) {
    if (input[0] === '"') {
      input.substr(1, input.length - 2);
    }
    return input
        .replace(/\\\\/g, token)
        .replace(/\\n/g, '\n')
        .replace(/\\'/g, '\'')
        .replace(/\\"/g, '"')
        .replace(/\\&/g, '&')
        .replace(/\\r/g, '\r')
        .replace(/\\t/g, '\t')
        .replace(/\\b/g, '\b')
        .replace(/\\f/g, '\f')
        .replace(tokenRegex, '\\');
  };
});

'use strict';

angular.module('apiService', [])

// TODO: change the data services to instead:
// - get the example data from files according to where they are defined in the specifications
//   - I will need to manually cache the content of files that have already been fetched, so that I can pull other examples from them when there are multiple examples in one file
//   - similarly, I will need to manually cache the example text that has been retrieved, so that I do not have to re-parse files

/**
 * @ngdoc service
 * @name HackSpecifications
 * @requires $q
 * @requires $http
 * @requires $log
 * @requires $filter
 * @requires HackSpecifications
 * @requires HackExamples
 * @requires categories
 * @description
 *
 * This is the model for all of the hackathon's api.
 */
.factory('HackApi', function ($q, $http, $log, $filter, HackSpecifications, HackExamples,
                              categories) {
  function filterByCategories() {
    categories.forEach(function (category) {
      HackApi.apiDataByCategory[category.id] = $filter('category')(HackApi.apiData, category.id);
    });
  }

  var HackApi = {
    /**
     * @returns {Promise}
     */
    fetchAllApiData: function () {
      return HackSpecifications.getAllSpecificationsData()
          .then(HackExamples.getAllExamplesData)
          .then(function () {
            var apiKey, i;

            i = 0;
            for (apiKey in HackSpecifications.specificationsData) {
              HackApi.apiData[i++] = {
                key: apiKey,
                specification: HackSpecifications.specificationsData[apiKey],
                example: HackExamples.examplesData[apiKey],
                ref: apiKey.replace(/\./g, "_")
              };
            }

            filterByCategories();
          });
    },
    /**
     * @returns {Promise}
     */
    getAllApiData: function () {
      var deferred = $q.defer();

      if (HackApi.apiData.length > 0) {
        deferred.resolve(HackApi.apiData);
      } else {
        HackApi.fetchAllApiData()
            .then(function () {
              deferred.resolve(HackApi.apiData);
            });
      }

      return deferred.promise;
    },
    apiData: [],
    apiDataByCategory: {},
    currentCard: 'specification'
  };

  return HackApi;
});

'use strict';

angular.module('examplesService', [])

/**
 * @ngdoc service
 * @name HackExamples
 * @requires $q
 * @requires $http
 * @requires $filter
 * @requires HackSpecifications
 * @requires dataPath
 * @requires apiList
 * @requires androidExampleUrl
 * @requires iosExampleUrl
 * @requires webExampleUrl
 * @description
 *
 * This is the model for all of the hackathon's examples.
 */
.factory('HackExamples', function ($q, $http, $filter, HackSpecifications, dataPath, apiList,
                                   androidExampleUrl, iosExampleUrl, webExampleUrl) {
  var newline = '\n',
      startRegex = /^\s*\/\/ ## START /g,
      endRegex = /^\s*\/\/ ## END /g,
      eitherRegex = /^\s*\/\/ ## /,
      commonSnippetId = 'COMMON',
      filePromises = {},
      HackExamples;

  function extractText(exampleCompleteText, specificationId) {
    var lines, startLineIndex, endLineIndex;

    lines = exampleCompleteText.split(newline);

    // Extract the example from the text
    startLineIndex = findFlag(startRegex, specificationId, lines, 0) + 1;
    endLineIndex = findFlag(endRegex, specificationId, lines, startLineIndex);

    // Ensure the start and end flags are present
    if (startLineIndex >= 0 && endLineIndex >= 0) {
      endLineIndex = removeAnyNestedFlags(lines, startLineIndex, endLineIndex);

      return lines.slice(startLineIndex, endLineIndex).join(newline);
    } else {
      return null;
    }

    function findFlag(regex, specificationId, lines, startLineIndex) {
      var i, count;

      for (i = startLineIndex, count = lines.length; i < count; i += 1) {
        if (regex.exec(lines[i]) &&
            lines[i].indexOf(specificationId, regex.lastIndex) === regex.lastIndex) {
          regex.lastIndex = 0;
          return i;
        }
        regex.lastIndex = 0;
      }

      return -1;
    }

    function removeAnyNestedFlags(lines, startLineIndex, endLineIndex) {
      var i;

      for (i = startLineIndex; i < endLineIndex; i += 1) {
        if (eitherRegex.test(lines[i])) {
          lines.splice(i, 1);
          endLineIndex--;
          i--;
        }
      }

      return endLineIndex;
    }
  }

  function extractExampleText(exampleData, apiName, platform) {
    var snippetText = extractText(exampleData.file.allText, apiName);

    if (!snippetText) {
      console.warn('Example not found in file: platform=' + platform + ', apiName=' + apiName);
      snippetText =  '// Example forthcoming';
    } else {
      snippetText += exampleData.file.commonText;
    }

    exampleData.text = snippetText;
  }

  HackExamples = {
    /**
     * @param {string} groupDirectoryName
     * @param {string} apiName
     * @param {'all'|'web'|'ios'|'android'} platform
     * @returns {Promise}
     */
    fetchExampleData: function (groupDirectoryName, apiName, platform) {
      var url, promises;

      if (platform === 'all') {
        promises = [];

        ['web', 'ios', 'android'].forEach(function (platform) {
          promises.push(HackExamples.fetchExampleData(groupDirectoryName, apiName, platform));
        });

        return $q.all(promises);
      } else {
        // Determine the complete URL for this example
        url = platform === 'android' ? androidExampleUrl : platform === 'ios' ? iosExampleUrl :
            webExampleUrl;
        url += HackSpecifications.specificationsData[apiName].codeExamples[platform];

        // Make sure the example object exists
        HackExamples.examplesData[apiName] = HackExamples.examplesData[apiName] ?
            HackExamples.examplesData[apiName] : {};

        HackExamples.examplesData[apiName][platform] = {
          file: {
            allText: '',
            commonText: ''
          },
          text: ''
        };

        // Check whether we have already made a request for this example's file
        if (!filePromises[url]) {
          // Make the request for this example's file
          filePromises[url] = $http.get(url)
              .then(function (response) {
                var file = {};

                file.allText = $filter('unescapeJsonString')(response.data);

                file.commonText = extractText(file.allText, commonSnippetId, platform);
                file.commonText = file.commonText ? newline + newline + file.commonText : '';

                return file;
              })
              .catch(function (error) {
                var message = 'Problem retrieving example data';

                console.error(message, error);

                return {
                  allText: message,
                  commonText: ''
                };
              });
        }

        // Return the promise for this example data
        return filePromises[url]
            .then(function (file) {
              // Extract this example's text from the file
              HackExamples.examplesData[apiName][platform].file = file;
              extractExampleText(HackExamples.examplesData[apiName][platform], apiName, platform);
              return HackExamples.examplesData[apiName][platform];
            });
      }
    },
    /**
     * @returns {Promise}
     */
    fetchAllExamplesData: function () {
      var apiSectionKey, promises = [];

      for (apiSectionKey in apiList) {
        apiList[apiSectionKey].forEach(function (apiName) {
          promises.push(HackExamples.fetchExampleData(apiSectionKey, apiName, 'all'));
        });
      }

      return $q.all(promises)
          .then(function () {
            HackExamples.allDataHasBeenFetched = true;
          });
    },
    /**
     * @returns {Promise}
     */
    getAllExamplesData: function () {
      var deferred = $q.defer();

      if (HackExamples.allDataHasBeenFetched) {
        deferred.resolve(HackExamples.examplesData);
      } else {
        HackExamples.fetchAllExamplesData()
            .then(function () {
              deferred.resolve(HackExamples.examplesData);
            });
      }

      return deferred.promise;
    },
    allDataHasBeenFetched: false,
    examplesData: {},
    currentPlatform: 'web'
  };

  return HackExamples;
});

angular.module('markdownDataService', [])

  .factory('MarkdownData', function ($q, $http, $filter, $rootScope, dataCollections, dataLoadedEvent) {
    /**
     * @typedef {Object} Section
     * @property {Number} index
     * @property {String} id
     * @property {String} title
     * @property {String} convertedMarkdown
     */

    var sectionHeaderRegex = /<h2(?:.*?)>\s*(.*?)\s*<\/h2>/gi;

    var startAndEndQuotRegex = /(?:^"|"$)/g;

    var dataPromise = null;

    var converter = new Showdown.converter({extensions: ['table']});

    var MarkdownData = {
      fetchDocumentation: fetchAllDocumentation,
      getCollection: getCollection
    };

    return MarkdownData;

    // ---  --- //

    /**
     * @returns {Promise}
     */
    function fetchAllDocumentation() {
      if (dataPromise) {
        return dataPromise;
      } else {
        var promises = dataCollections.map(function (collection) {
          return $http.get(collection.url)
            .then(function (response) {
              switch (collection.type) {
                case 'markdown-api':
                  collection.sections = parseDocumentationIntoSections(response.data);
                  break;
                case 'json-api':
                  // TODO: integrate this into the old JSON parsing logic?
                  break;
                case 'markdown-setup':
                  collection.sections = parseDocumentationIntoSections(response.data);
                  break;
                default:
                  throw new Error('Invalid data collection type: ' + collection.type);
              }
            });
        });

        dataPromise = $q.all(promises)
          .then(function () {
            $rootScope.$broadcast(dataLoadedEvent, dataCollections);
            return dataCollections;
          });

        return dataPromise;
      }
    }

    function getCollection(id) {
      var i, count;

      for (i = 0, count = dataCollections.length; i < count; i += 1) {
        if (dataCollections[i].id === id) {
          return dataCollections[i];
        }
      }

      return null;
    }

    /**
     * @param {String} documentationText
     * @returns {Array.<Section>}
     */
    function parseDocumentationIntoSections(documentationText) {
      documentationText = documentationText.replace(startAndEndQuotRegex, '');
      documentationText = documentationText.replace(/\\n/g, '\n');// TODO: unescape other possible characters
      var convertedMarkdown = parseMarkdown(documentationText);
      return extractSections(convertedMarkdown);
    }

    /**
     * @param {String} rawMarkdown
     * @returns {String}
     */
    function parseMarkdown(rawMarkdown) {
      return converter.makeHtml(rawMarkdown);
    }

    /**
     * @param {String} convertedMarkdown
     * @returns {Array.<Section>}
     */
    function extractSections(convertedMarkdown) {
      var sections = [];
      var index = 0;
      var previousContentIndex = 0;

      var result;

      sectionHeaderRegex.lastIndex = 0;

      // Add a section for the content before the first header
      addSection('Introduction', null);

      result = sectionHeaderRegex.exec(convertedMarkdown);

      // Iterate over the h1 elements within the overall converted markdown text
      while (result !== null) {
        // Set the markdown content of the previous section (now that we know where that section ends)
        sections[index - 1].convertedMarkdown = convertedMarkdown.substring(previousContentIndex, result.index);

        // Add a new section for the header we just found
        addSection(result[1], null);

        // Save the starting index of the content for this new section
        previousContentIndex = result.index + result[0].length;

        result = sectionHeaderRegex.exec(convertedMarkdown);
      }

      // Set the markdown content of the previous section (now that we know where that section ends)
      sections[index - 1].convertedMarkdown = convertedMarkdown.substring(previousContentIndex);

      // If there was no content before the first header, then we should remove the preliminary section we created
      // earlier
      if (!sections[0].convertedMarkdown) {
        sections.shift();
      }

      return sections;

      // ---  --- //

      function addSection(title, convertedMarkdown) {
        var id = $filter('sectionTitleToStateId')(title);

        sections[index] = {
          index: index,
          id: id,
          title: title,
          convertedMarkdown: convertedMarkdown
        };

        index++;
      }
    }
  });

'use strict';

angular.module('specificationsService', [])

/**
 * @ngdoc service
 * @name HackSpecifications
 * @requires $q
 * @requires $http
 * @requires $log
 * @requires dataPath
 * @requires specificationUrl
 * @description
 *
 * This is the model for all of the hackathon's specifications.
 */
.factory('HackSpecifications', function ($q, $http, $log, dataPath, specificationUrl) {
  var HackSpecifications = {
    /**
     * @returns {Promise}
     */
    fetchAllSpecificationsData: function () {
      return $http.get(specificationUrl)
          .then(function (response) {
            var i, count;

            for (i = 0, count = response.data.length; i < count; i += 1) {
              HackSpecifications.specificationsData[response.data[i].id] = response.data[i];
            }

            HackSpecifications.allDataHasBeenFetched = true;
          });
    },
    /**
     * @returns {Promise}
     */
    getAllSpecificationsData: function () {
      var deferred = $q.defer();

      if (HackSpecifications.allDataHasBeenFetched) {
        deferred.resolve(HackSpecifications.specificationsData);
      } else {
        HackSpecifications.fetchAllSpecificationsData()
            .then(function () {
              deferred.resolve(HackSpecifications.specificationsData);
            });
      }

      return deferred.promise;
    },
    allDataHasBeenFetched: false,
    specificationsData: {}
  };

  return HackSpecifications;
});

'use strict';

angular.module('tryItService', [])

.constant('routeParams', [
  'vin',
  'requestId',
  'messageId',
  'id',
  'userURI',
  'senderURI'
])
.constant('queryParams', [
  'longpoll'
])

/**
 * @ngdoc service
 * @name TryItData
 * @requires emulatorDomain
 * @requires routeParams
 * @requires queryParams
 * @description
 *
 * This model stores the current "try it"/emulator values.
 */
.factory('TryItData', function (emulatorDomain, apiKey, username, password, routeParams, queryParams) {
  var TryItData, originalValues, i, count, key, value;

  function generateRandomId() {
    return '' + parseInt(Math.random() * 10000000000);
  }

  function generateRandomBoolean() {
    return '' + (Math.random() < 0.5);
  }

  function reset() {
    for (i = 0, count = routeParams.length; i < count; i += 1) {
      TryItData.routeParams[routeParams[i]] = originalValues.routeParams[routeParams[i]];
    }

    for (i = 0, count = queryParams.length; i < count; i += 1) {
      TryItData.queryParams[queryParams[i]] = originalValues.queryParams[queryParams[i]];
    }

    TryItData.emulatorDomain = originalValues.emulatorDomain;
  }

  function updateAuthString() {
//  TryItData.authString = 'Basic cHJvdmlkZXI6MTIzNA==';
    TryItData.authString = 'Basic ' + btoa(TryItData.username + ':' + TryItData.password);
  }

  originalValues = {
    emulatorDomain: emulatorDomain,
    apiKey: apiKey,
    username: username,
    password: password,
    routeParams: {},
    queryParams: {}
  };

  TryItData = {
    emulatorDomain: originalValues.emulatorDomain,
    apiKey: originalValues.apiKey,
    username: originalValues.username,
    password: originalValues.password,
    routeParams: {},
    queryParams: {},
    reset: reset,
    updateAuthString: updateAuthString
  };

  for (i = 0, count = routeParams.length; i < count; i += 1) {
    originalValues.routeParams[routeParams[i]] = generateRandomId();
  }

  for (i = 0, count = queryParams.length; i < count; i += 1) {
    originalValues.queryParams[queryParams[i]] = generateRandomBoolean();
  }

  reset();

  return TryItData;
});

'use strict';

angular.module('apiExampleCardDirective', [])

.constant('apiExampleCardTemplatePath', document.baseURI + '/dist/templates/components/api-example-card/api-example-card.html')

/**
 * @ngdoc directive
 * @name apiExampleCard
 * @requires apiExampleCardTemplatePath
 * @param {object} example
 * @description
 *
 * A panel used for displaying platform-specific examples of a single API call.
 */
.directive('apiExampleCard', function (apiExampleCardTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      apiItem: '='
    },
    templateUrl: apiExampleCardTemplatePath,
    link: function (scope, element, attrs) {
      scope.handleTabClick = function (platform) {
        scope.apiItem.HackExamples.currentPlatform = platform;
      };
    }
  };
});

'use strict';

angular.module('apiListDirective', [])

.constant('apiListTemplatePath', document.baseURI + '/dist/templates/components/api-list/api-list.html')

/**
 * @ngdoc directive
 * @name apiList
 * @requires HackApi
 * @requires apiListTemplatePath
 * @description
 *
 * A footer list used for displaying a list of navigation links.
 */
.directive('apiList', function ($rootScope, HackApi, apiListTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      category: '='
    },
    templateUrl: apiListTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiListState = {};
      scope.apiListState.apiData = [];
      scope.apiListState.selectedItemId = null;

      HackApi.getAllApiData()
          .then(function (apiData) {
            scope.apiListState.apiData = apiData;

            if ($rootScope.selectedApi != null) {
              scope.apiListState.selectedItemId = $rootScope.selectedApi.replace(/_/g, '.');
              console.log(scope.apiListState.selectedItemId);
            }
          });

      scope.$watch('category', function () {
        scope.apiListState.selectedItemId = null;
      });
    }
  };
});

'use strict';

angular.module('apiListItemDirective', [])

.constant('apiListItemTemplatePath', document.baseURI + '/dist/templates/components/api-list-item/api-list-item.html')

/**
 * @ngdoc directive
 * @name apiListItem
 * @requires HackExamples
 * @requires HackApi
 * @requires apiListItemTemplatePath
 * @param {Object} apiItem
 * @description
 *
 * A panel used for displaying the specification for a single API call.
 */
.directive('apiListItem', function ($rootScope, $state, HackExamples, HackApi, apiListItemTemplatePath) {
  return {
    restrict: 'A',
    scope: {
      apiItem: '=apiListItem',
      apiListState: '='
    },
    templateUrl: apiListItemTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiItem.HackExamples = HackExamples;
      scope.apiItem.HackApi = HackApi;

      // TODO: implement scroll to selected API
      // var GetScreenCordinates = function(obj) {
      //   var p = {};
      //   p.x = obj.offsetLeft;
      //   p.y = obj.offsetTop;
      //   while (obj.offsetParent) {
      //     p.x = p.x + obj.offsetParent.offsetLeft;
      //     p.y = p.y + obj.offsetParent.offsetTop;
      //     if (obj == document.getElementsByTagName("body")[0]) {
      //       break;
      //     }
      //     else {
      //       obj = obj.offsetParent;
      //     }
      //   }
      //   return p;
      // };

      scope.handleHeaderClick = function (evt) {
        // var rect = GetScreenCordinates(evt.target);
        // window.scrollTo(0, rect.y);

        scope.apiListState.selectedItemId =
                scope.apiListState.selectedItemId === scope.apiItem.specification.id ?
                    null : scope.apiItem.specification.id;

        var targetRef = 'web-apps-api.api-documentation.' + $rootScope.selectedApiCategory;

        if (scope.apiListState.selectedItemId != null)
          targetRef = targetRef + '.' + scope.apiItem.ref;
        
        $state.go(targetRef);
      };
    }
  };
});

'use strict';

angular.module('apiSpecificationCardDirective', [])

.constant('apiSpecificationCardTemplatePath', document.baseURI + '/dist/templates/components/api-specification-card/api-specification-card.html')

/**
 * @ngdoc directive
 * @name apiSpecificationCard
 * @requires apiSpecificationCardTemplatePath
 * @param {Object} apiItem
 * @description
 *
 * A panel used for displaying the specification for a single API call.
 */
.directive('apiSpecificationCard', function (apiSpecificationCardTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      apiItem: '='
    },
    templateUrl: apiSpecificationCardTemplatePath,
    link: function (scope, element, attrs) {
      scope.isArray = function (input) {
        return input instanceof Array;
      };
    }
  };
});

'use strict';

angular.module('apiTryItCardDirective', [])

.constant('apiTryItCardTemplatePath', document.baseURI + '/dist/templates/components/api-try-it-card/api-try-it-card.html')

/**
 * @ngdoc directive
 * @name apiTryItCard
 * @requires TryItData
 * @requires jsonFilter
 * @requires errorDescriptionFilter
 * @requires emulatorDomain
 * @requires apiTryItCardTemplatePath
 * @requires apiKey
 * @requires authString
 * @param {Object} apiItem
 * @description
 *
 * A panel that contains input areas that enable the user to try out making a single API call.
 */
.directive('apiTryItCard', function (TryItData, jsonFilter, errorDescriptionFilter,
                                     apiTryItCardTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      apiItem: '='
    },
    templateUrl: apiTryItCardTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiItem.tryIt = {};
      scope.apiItem.tryIt.requestBody = '';
      scope.apiItem.tryIt.response = {};

      scope.apiItem.TryItData = TryItData;
      scope.apiItem.tryIt.requestState = 'waiting-to-send';

      scope.$watch('apiItem.TryItData.queryParams', updateUrl, true);
      scope.$watch('apiItem.TryItData.routeParams', updateUrl, true);
      scope.$watch('apiItem.TryItData.emulatorDomain', updateUrl, true);
      scope.$watch('apiItem.TryItData.username', TryItData.updateAuthString, true);
      scope.$watch('apiItem.TryItData.password', TryItData.updateAuthString, true);
      scope.$watch('apiItem.HackApi.currentCard', handleCardChange);

      function updateUrl() {
        var route, i, count, key, value, index;

        route = scope.apiItem.specification.resourceTable['Route'];

        // Handle any query string parameters
        index = route.indexOf('?');
        if (index >= 0) {
          // Strip the query string from the specification route
          route = route.substring(0, index + 1);

          for (i = 0, count = scope.apiItem.specification.parameters.query.length;
               i < count; i += 1) {
            key = scope.apiItem.specification.parameters.query[i];
            value = TryItData.queryParams[key];
            route += key + '=' + (value || 'true') + '&';
          }

          route = route.substring(0, route.length - 1);
        }

        // Handle the route parameters
        for (key in scope.apiItem.specification.parameters.route) {
          value = TryItData.routeParams[key];
          route = route.replace('{' + key + '}', value || '');
        }

        scope.apiItem.tryIt.url = TryItData.emulatorDomain + route;
      }

      function handleCardChange() {
        if (scope.apiItem.HackApi.currentCard === 'try it') {
          fillWithCommonData();
        }
      }

      function fillWithCommonData() {
        // Request body params
        scope.apiItem.tryIt.requestBody = findRequestBody();

        function findRequestBody() {
          var requestBody = '';

          scope.apiItem.specification.examples.forEach(function (example) {
            if (example.type === 'request' && example.body) {
              requestBody = jsonFilter(example.body);
              requestBody = replaceVin(requestBody);
            }
          });

          return requestBody;
        }

        function replaceVin(requestBody) {
          if (TryItData.routeParams['vin']) {
            return requestBody.replace('"vin": "~vin~"', '"vin": "' + TryItData.routeParams['vin'] +'"');
          } else {
            return requestBody;
          }
        }
      }

      scope.reset = function () {
        TryItData.reset();
        fillWithCommonData();
      };

      scope.handleSendRequestClick = function () {
        var xhr, verb;

        verb = scope.apiItem.specification.resourceTable['HTTP Verb'][0];

        xhr = new XMLHttpRequest();

        xhr.addEventListener('load', onLoad, false);
        xhr.addEventListener('error', onError, false);
        xhr.addEventListener('abort', onAbort, false);

        console.log('Sending request to ' + scope.apiItem.tryIt.url);

        xhr.open(verb, scope.apiItem.tryIt.url, true);
        xhr.setRequestHeader('Authorization', TryItData.authString);
        xhr.setRequestHeader('APIKey', TryItData.apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(scope.apiItem.tryIt.requestBody);

        scope.apiItem.tryIt.requestState = 'waiting-for-response';
        scope.apiItem.tryIt.response.error = false;
        scope.apiItem.tryIt.response.status = 0;
        scope.apiItem.tryIt.response.body = {};

        function onLoad() {
          console.log('Response status=' + xhr.status + ' (' + xhr.statusText + ')');
          console.log('Response body=' + xhr.response);

          scope.$apply(function () {
            var customStatusText, responseBody;

            customStatusText = errorDescriptionFilter(xhr.status);

            scope.apiItem.tryIt.requestState = 'received-response';
            scope.apiItem.tryIt.response.error =
                parseInt(xhr.status / 100) !== 2 && customStatusText;
            scope.apiItem.tryIt.response.status = xhr.status + ' (' + customStatusText + ')';

            try {
              responseBody = JSON.parse(xhr.response);
              scope.apiItem.tryIt.response.body = responseBody;
              scope.apiItem.tryIt.response.bodyParseError = null;
            } catch (error) {
              responseBody = xhr.response;
              console.warn('Unable to parse response body as JSON: ' + responseBody);
              scope.apiItem.tryIt.response.body = null;
              scope.apiItem.tryIt.response.bodyParseError = responseBody;
            }
          });
        }

        function onError() {
          var message = 'An error occurred while transferring the data';
          console.error(message);

          scope.$apply(function () {
            scope.apiItem.tryIt.requestState = 'error-with-request';
            scope.apiItem.tryIt.response.error = message;
          });
        }

        function onAbort() {
          var message = 'The transfer has been cancelled by the user';
          console.error(message);

          scope.$apply(function () {
            scope.apiItem.tryIt.requestState = 'error-with-request';
            scope.apiItem.tryIt.response.error = message;
          });
        }
      };
    }
  };
});

angular.module('dynamicMarkdownListDirective', [])

.constant('dynamicMarkdownListTemplatePath', document.baseURI + '/dist/templates/components/dynamic-markdown-list/dynamic-markdown-list.html')

.directive('dynamicMarkdownList', function (MarkdownData, dynamicMarkdownListTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      id: '@'
    },
    templateUrl: dynamicMarkdownListTemplatePath,
    link: function (scope, element, attrs) {
      scope.markdownListState = {};
      scope.markdownListState.sections = [];
      scope.markdownListState.selectedSection = null;

      MarkdownData.fetchDocumentation(scope.url)
        .then(onMarkdownUpdate)
        .catch(function (error) {
          console.error(error);
        });

      // ---  --- //

      function onMarkdownUpdate() {
        scope.markdownListState.sections = MarkdownData.getCollection(scope.id).sections;
        scope.markdownListState.selectedSection = scope.markdownListState.sections.length && scope.markdownListState.sections[0] || null;
      }
    }
  };
});

angular.module('headerDirective', [])

.constant('headerTemplatePath', document.baseURI + '/dist/templates/components/header/header.html')

.directive('hackHeader', function (headerTemplatePath) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
    },
    templateUrl: headerTemplatePath,
    link: function (scope, element, attrs) {
    }
  };
});

angular.module('homePageSectionDirective', [])

.constant('homePageSectionTemplatePath', document.baseURI + '/dist/templates/components/home-page-section/home-page-section.html')

.directive('homePageSection', function (homePageSectionTemplatePath) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@',
      sideBarLinks: '='
    },
    templateUrl: homePageSectionTemplatePath,
    link: function (scope, element, attrs) {
    }
  };
});

angular.module('markdownBlockDirective', [])

    .directive('markdownBlock', function ($compile, $timeout) {
      var codeBlockRegex = /<pre>\s*<code(?: class="(.*?)")?>((?:.|\n)*?)<\/code>\s*<\/pre>/gi;
      var codeBlockReplacement = '<div hljs source="\'$2\'" class="language-($1)"></div>';

      return {
        restrict: 'E',
        scope: {
          convertedMarkdown: '@'
        },
        link: function (scope, element, attrs) {
          scope.$watch('convertedMarkdown', onConvertedMarkdownChange);

          // ---  --- //

          function onConvertedMarkdownChange() {
            scope.syntaxHighlightedMarkdown = parseHtmlForSyntaxHighlighting(scope.convertedMarkdown);

            // Add the markdown content to the DOM
            element.html(scope.syntaxHighlightedMarkdown);

            compileCodeBlocks();
          }

          function compileCodeBlocks() {
            // TODO: instead of using the above regex and then searching for [hljs] elements, search for the raw pre elements; then check for a child code element; then use element.html and element.replaceWith to add and compile the hljs element

            var matches = element[0].querySelectorAll('[hljs]');

            var i, count;

            for (i = 0, count = matches.length; i < count; i += 1) {
              var hljsElement = angular.element(matches[i]);
              var codeBlockElement = $compile(hljsElement)(scope);
              hljsElement.replaceWith(codeBlockElement);
            }
          }

          /**
           * @param {String} htmlText
           * @returns {String}
           */
          function parseHtmlForSyntaxHighlighting(htmlText) {
            return htmlText.replace(codeBlockRegex, codeBlockReplacement);
          }
        }
      };
    });

angular.module('shortHeaderDirective', [])

.constant('shortHeaderTemplatePath', document.baseURI + '/dist/templates/components/short-header/short-header.html')

.directive('shortHeader', function ($rootScope, $interval, animations, shortHeaderTemplatePath) {
  return {
    restrict: 'E',

    scope: {
    },

    templateUrl: shortHeaderTemplatePath,

    link: function (scope, element, attrs) {
    }
  };
});

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

          scope.timeline = new TimelineMax();

          scope.timeline.add("start");

          scope.timeline.add("set-1", "+=2");
          scope.timeline.add(TweenMax.from(carScreen, 1.5, {alpha:0}), "+=2");
          scope.timeline.add(TweenMax.staggerFrom(questionSet1, 1.75, {x:"60", alpha:0}, 0.3), "-=1.0");
          scope.timeline.add(TweenMax.staggerTo(questionSet1, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.75, {alpha:0}), "-=1");

          scope.timeline.add("set-2", "+=2");
          scope.timeline.add(TweenMax.to(carScreen, 1.5, {alpha:carScreenInitialAlpha}), "+=2");
          scope.timeline.add(TweenMax.staggerFrom(questionSet2, 1.75, {x:"60", alpha:0}, 0.3), "-=1");
          scope.timeline.add(TweenMax.staggerTo(questionSet2, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.75, {alpha:0}), "-=1");

          scope.timeline.add("set-3", "+=2");
          scope.timeline.add(TweenMax.to(carScreen, 1.5, {alpha:carScreenInitialAlpha}), "+=2");
          scope.timeline.add(TweenMax.staggerFrom(questionSet3, 1.75, {x:"60", alpha:0}, 0.3), "-=1");
          scope.timeline.add(TweenMax.staggerTo(questionSet3, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.75, {alpha:0}), "-=1");

          scope.timeline.add("set-4", "+=2");
          scope.timeline.add(TweenMax.to(carScreen, 1.5, {alpha:carScreenInitialAlpha}), "+=2");
          scope.timeline.add(TweenMax.staggerFrom(questionSet4, 1.75, {x:"60", alpha:0}, 0.3), "-=1");
          scope.timeline.add(TweenMax.staggerTo(questionSet4, 1, {x:"-60", alpha:0}, 0.3), "+=3");
          scope.timeline.add(TweenMax.to(carScreen, 0.75, {alpha:0}), "-=1");

          scope.timeline.add("end");

          carouselInterval = $interval(function() {
            var currentLabel = scope.timeline.currentLabel();

            if (scope.selectedLabel != currentLabel) {
                scope.selectedLabel = currentLabel;
            }
          }, 500);

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

angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope, $state, $stateParams, MarkdownData) {
    $scope.apiDocsState = {};
    $scope.apiDocsState.selectedCollection = MarkdownData.getCollection($state.current.name);
    $scope.apiDocsState.selectedSection =
      $scope.apiDocsState.selectedCollection.sections[($stateParams.sectionId ? $stateParams.sectionId : 0)];

    $scope.handleSideBarLinkClick = handleSideBarLinkClick;

    // ---  --- //

    function handleSideBarLinkClick(section) {
      console.log('API docs side bar section link clicked', section.title);
      $scope.apiDocsState.selectedSection = section;
    }
  });

angular.module('homeController', [])

  .controller('HomeCtrl', function ($scope, homeSectionsSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.homeSectionsSideBarLinks = homeSectionsSideBarLinks;
  });

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

angular.module('dynamicMarkdownListItemDirective', [])

.constant('dynamicMarkdownListItemTemplatePath', document.baseURI + '/dist/templates/components/dynamic-markdown-list/dynamic-markdown-list-item/dynamic-markdown-list-item.html')

.directive('dynamicMarkdownListItem', function (MarkdownData, dynamicMarkdownListItemTemplatePath) {
  return {
    restrict: 'A',
    scope: {
      markdownListState: '=',
      section: '='
    },
    templateUrl: dynamicMarkdownListItemTemplatePath,
    link: function (scope, element, attrs) {
      scope.handleLabelClick = handleLabelClick;

      // ---  --- //

      function handleLabelClick() {
        console.log('Dynamic Markdown list section label clicked', scope.title);

        scope.markdownListState.selectedSection = scope.section;
      }
    }
  };
});

'use strict';

angular.module('apiDocumentationController', [])

/**
 * @ngdoc object
 * @name ApiDocumentationCtrl
 * @description
 *
 * Controller for the API Documentation page.
 */
.controller('ApiDocumentationCtrl', function () {
});

'use strict';

angular.module('gettingStartedController', [])

/**
 * @ngdoc object
 * @name GettingStartedCtrl
 * @description
 *
 * Controller for the Getting Started page.
 */
.controller('GettingStartedCtrl', function () {
});

'use strict';

angular.module('sampleAppsController', [])

/**
 * @ngdoc object
 * @name SampleAppsCtrl
 * @description
 *
 * Controller for the Sample Apps page.
 */
.controller('SampleAppsCtrl', function ($scope, sampleAppData) {
  $scope.sampleAppsState = {};
  $scope.sampleAppsState.sampleAppData = sampleAppData;
});
