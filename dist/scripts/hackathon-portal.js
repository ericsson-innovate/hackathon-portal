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

.constant('androidExampleCommonFilePath', hack.rootPath + '/data/examples/android/app/src/com/idean/atthack/network/RequestHelper.java')
.constant('iosExampleCommonFilePath', hack.rootPath + '/data/examples/ios/example.m')
.constant('webExampleCommonFilePath', hack.rootPath + '/dist/data/web-examples.js')

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
.constant('httpErrorCodes', {
  200: 'OK',
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

angular.module('errorDescriptionFilter', [])

/**
 * @ngdoc filter
 * @name errorDescription
 * @requires httpErrorCodes
 * @description
 *
 * This is a filter for providing the descriptions of errors according to their error codes.
 */
.filter('errorDescription', function (httpErrorCodes) {
  return function (input) {
    return httpErrorCodes[input] || 'Unknown error';
  }
});

'use strict';

angular.module('hackController', [])

/**
 * @ngdoc object
 * @name HackCtrl
 * @requires $scope
 * @requires $rootScope
 * @requires $state
 * @requires sideBarLinks
 * @requires categories
 * @description
 *
 * Controller for the overall hackathon portal page.
 */
.controller('HackCtrl', function ($scope, $rootScope, $state, sideBarLinks, categories) {
  $scope.hackState = {};
  $scope.hackState.sideBarLinks = sideBarLinks;
  $scope.hackState.categories = categories;

  $scope.hackState.handleCategoryTabClick = function (category) {
    $rootScope.selectedCategory = category;

    // Transition to the API documentation route/state
    if ($rootScope.routeState.name !== 'api-documentation') {
      $state.go('api-documentation');
    }
  };
});

'use strict';

/**
 * Defines routes via `$routeProvider`.
 */

angular.module('hackApp')

.config(function ($locationProvider, $stateProvider, $urlRouterProvider, sideBarLinks) {
  // Re-route invalid routes back to home
  $urlRouterProvider.otherwise(sideBarLinks[1].url);

  sideBarLinks.forEach(function (link) {
    if (link.isStateRoute) {
      // Use UI-Router to allow for both URL and state-based routing
      $stateProvider
          .state(link.ref, {
            url: link.url,
            templateUrl: link.templateUrl,
            controller: link.controller
          });
    }
  });
})

.run(function ($rootScope, $log) {
  $rootScope.routeState = {};

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $log.debug('$stateChangeStart', toState.name);

    // Allows us to use a different class for the top-level view element for each route
    $rootScope.routeState = toState;

    if (toState.name === 'api-documentation' && !$rootScope.selectedCategory) {
      $rootScope.selectedCategory = $rootScope.defaultCategory;
    } else {
      $rootScope.selectedCategory = null;
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
});

'use strict';

angular.module('syncPrismDirective', [])

/**
 * @ngdoc directive
 * @name syncPrism
 * @param {string} source
 * @description
 *
 * A directive for re-running Prism parsing for syntax highlighting when content changes.
 */
.directive('syncPrism', [function() {
  return {
    restrict: 'A',
    scope: {
      source: '@'
    },
    link: function(scope, element, attrs) {
      var code = element.find('code')[0];

      scope.$watch('source', function () {
        Prism.highlightElement(code);
      });
    },
    template: '<code ng-bind="source"></code>'
  };
}]);

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
 * @requires androidExampleCommonFilePath
 * @requires iosExampleCommonFilePath
 * @requires webExampleCommonFilePath
 * @description
 *
 * This is the model for all of the hackathon's api.
 */
.factory('HackApi', function ($q, $http, $log, $filter, HackSpecifications, HackExamples,
    categories, androidExampleCommonFilePath, iosExampleCommonFilePath, webExampleCommonFilePath) {
  function filterByCategories() {
    categories.forEach(function (category) {
      HackApi.apiDataByCategory[category.id] = $filter('category')(HackApi.apiData, category.id);
    });
  }

  function extractExamplesText() {
    var newline = '\n',
        startRegex = /^\s*\/\/ ## START /g,
        endRegex = /^\s*\/\/ ## END /g;

    var i, j, iCount, jCount, platforms, platform, specificationId, exampleCompleteText;

    platforms = ['web', 'android', 'ios'];

    for (i = 0, iCount = platforms.length; i < iCount; i += 1) {
      platform = platforms[i];

      for (j = 0, jCount = HackApi.apiData.length; j < jCount; j += 1) {
        specificationId = HackApi.apiData[j].specification.id;
        exampleCompleteText = HackApi.apiData[j].example[platform].file.text;

        HackApi.apiData[j].example[platform].text =
            extractText(exampleCompleteText, specificationId, platform);
      }
    }

    // Append text that is common to all examples for a platform
    // androidExampleCommonFilePath, iosExampleCommonFilePath, webExampleCommonFilePath
//    exampleCompleteText = ; // TODO: fetch this in examples-service
//    extractText();
    // TODO:

    function extractText(exampleCompleteText, specificationId, platform) {
      var lines, startLineIndex, endLineIndex;

      lines = exampleCompleteText.split(newline);

      // Extract the example from the text
      startLineIndex = findFlag(startRegex, specificationId, lines, 0) + 1;
      endLineIndex = findFlag(endRegex, specificationId, lines, startLineIndex);

      // Ensure the start and end flags are present
      if (startLineIndex >= 0 && endLineIndex >= 0) {
        return lines.slice(startLineIndex, endLineIndex).join(newline);
      } else {
        console.warn('Example not found in file: platform=' + platform +
            ', specificationId=' + specificationId);
        return '// Example forthcoming';
      }
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
                example: HackExamples.examplesData[apiKey]
              };
            }

            extractExamplesText();
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
    apiDataByCategory: {}
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
 * @requires $log
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
.factory('HackExamples', function ($q, $http, $log, HackSpecifications, dataPath, apiList,
                                   androidExampleUrl, iosExampleUrl, webExampleUrl) {
  var HackExamples = {
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
        url = platform === 'android' ? androidExampleUrl : platform === 'ios' ? iosExampleUrl :
            webExampleUrl;
        url += HackSpecifications.specificationsData[apiName].codeExamples[platform];

        // Make sure the example object exists
        HackExamples.examplesData[apiName] = HackExamples.examplesData[apiName] ?
            HackExamples.examplesData[apiName] : {};

        HackExamples.examplesData[apiName][platform] = {
          file: {
            url: url,
            text: ''
          },
          text: ''
        };

        if (HackExamples.fileCache[url]) {
          HackExamples.fileCache[url]
              .then(function (value) {
                HackExamples.examplesData[apiName][platform].file.text = value;
              });
          return HackExamples.fileCache[url];
        } else {
          HackExamples.fileCache[url] = $http.get(url)
              .then(function (response) {
                HackExamples.examplesData[apiName][platform].file.text = response.data;
                return response.data;
              })
              .catch(function (error) {
                HackExamples.examplesData[apiName][platform].file.text = '';
                return '';
              });
        }
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
    fileCache: {},
    examplesData: {}
  };

  return HackExamples;
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
  'vin'
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
.factory('TryItData', function (emulatorDomain, routeParams, queryParams) {
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

  originalValues = {
    emulatorDomain: emulatorDomain,
    routeParams: {},
    queryParams: {}
  };

  TryItData = {
    emulatorDomain: originalValues.emulatorDomain,
    routeParams: {},
    queryParams: {},
    reset: reset
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

.constant('apiExampleCardTemplatePath', hack.rootPath + '/dist/templates/components/api-example-card/api-example-card.html')

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
    require: '^apiListItem',
    scope: {
      apiItem: '='
    },
    templateUrl: apiExampleCardTemplatePath,
    link: function (scope, element, attrs, apiListItemCtrl) {
    }
  };
});

'use strict';

angular.module('apiListDirective', [])

.constant('apiListTemplatePath', hack.rootPath + '/dist/templates/components/api-list/api-list.html')

/**
 * @ngdoc directive
 * @name apiList
 * @requires HackApi
 * @requires apiListTemplatePath
 * @description
 *
 * A footer list used for displaying a list of navigation links.
 */
.directive('apiList', function (HackApi, apiListTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      category: '='
    },
    templateUrl: apiListTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiData = [];

      HackApi.getAllApiData()
          .then(function (apiData) {
            scope.apiData = apiData;
          });
    },
    controller: function ($scope) {
      var selectedSpec;

      selectedSpec = null;

      this.setSelectedSpecification = setSelectedSpecification;

      $scope.$watch('category', function () {
        setSelectedSpecification(null);
      });

      function setSelectedSpecification(spec) {
        var oldSelectedSpec = selectedSpec;
        selectedSpec = spec;

        if (oldSelectedSpec && oldSelectedSpec !== selectedSpec) {
          oldSelectedSpec.setIsSelected(false);
        }

        if (selectedSpec) {
          selectedSpec.setIsSelected(true);
        }
      }
    }
  };
});

'use strict';

angular.module('apiListItemDirective', [])

.constant('apiListItemTemplatePath', hack.rootPath + '/dist/templates/components/api-list-item/api-list-item.html')

/**
 * @ngdoc directive
 * @name apiListItem
 * @requires apiListItemTemplatePath
 * @param {Object} apiItem
 * @description
 *
 * A panel used for displaying the specification for a single API call.
 */
.directive('apiListItem', function (apiListItemTemplatePath) {
  return {
    restrict: 'A',
    require: '^apiList',
    scope: {
      apiItem: '=apiListItem'
    },
    templateUrl: apiListItemTemplatePath,
    link: function (scope, element, attrs, apiListCtrl) {
      scope.isSelected = false;
      scope.apiItem.selectedCard = 'specification';
      scope.apiItem.selectedPlatform = 'web';

      scope.handleHeaderClick = function () {
        apiListCtrl.setSelectedSpecification(scope.isSelected ? null : scope);
      };

      scope.setIsSelected = function (isSelected) {
        scope.isSelected = isSelected;
      };
    },
    controller: function () {
    }
  };
});

'use strict';

angular.module('apiSpecificationCardDirective', [])

.constant('apiSpecificationCardTemplatePath', hack.rootPath + '/dist/templates/components/api-specification-card/api-specification-card.html')

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
    require: '^apiListItem',
    scope: {
      apiItem: '='
    },
    templateUrl: apiSpecificationCardTemplatePath,
    link: function (scope, element, attrs, apiListItemCtrl) {
      scope.isArray = function (input) {
        return input instanceof Array;
      };
    }
  };
});

'use strict';

angular.module('apiTryItCardDirective', [])

.constant('apiTryItCardTemplatePath', hack.rootPath + '/dist/templates/components/api-try-it-card/api-try-it-card.html')

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
                                     apiTryItCardTemplatePath, apiKey, authString) {
  return {
    restrict: 'E',
    require: '^apiListItem',
    scope: {
      apiItem: '='
    },
    templateUrl: apiTryItCardTemplatePath,
    link: function (scope, element, attrs, apiListItemCtrl) {
      scope.apiItem.tryIt = {};
      scope.apiItem.tryIt.parameters = {};
      scope.apiItem.tryIt.parameters.route = {};
      scope.apiItem.tryIt.parameters.query = {};
      scope.apiItem.tryIt.parameters.requestBody = '';
      scope.apiItem.tryIt.response = {};

      scope.apiItem.TryItData = TryItData;
      scope.apiItem.tryIt.requestState = 'waiting-to-send';

      scope.$watch('apiItem.tryIt.parameters.route', updateUrl, true);
      scope.$watch('apiItem.tryIt.parameters.query', updateUrl, true);
      scope.$watch('apiItem.TryItData.emulatorDomain', updateUrl, true);
      scope.$watch('apiItem.selectedCard', handleCardChange);

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
            value = scope.apiItem.tryIt.parameters.query[key];
            route += key + '=' + (value || 'true') + '&';
            TryItData.queryParams[key] = value;
          }

          route = route.substring(0, route.length - 1);
        }

        // Handle the route parameters
        for (key in scope.apiItem.specification.parameters.route) {
          value = scope.apiItem.tryIt.parameters.route[key];
          route = route.replace('{' + key + '}', value || '');
          TryItData.routeParams[key] = value;
        }

        scope.apiItem.tryIt.url = TryItData.emulatorDomain + route;
      }

      function handleCardChange() {
        if (scope.apiItem.selectedCard === 'try it') {
          fillWithCommonData();
        }
      }

      function fillWithCommonData() {
        var key;

        // Route params
        for (key in scope.apiItem.specification.parameters.route) {
          scope.apiItem.tryIt.parameters.route[key] = TryItData.routeParams[key];
        }

        // Query params
        for (key in scope.apiItem.specification.parameters.query) {
          scope.apiItem.tryIt.parameters.query[key] = TryItData.queryParams[key];
        }

        // Request body params
        scope.apiItem.tryIt.parameters.requestBody = findRequestBody();

        function findRequestBody() {
          var requestBody = '';

          scope.apiItem.specification.examples.forEach(function (example) {
            if (example.type === 'request' && example.body) {
              requestBody = jsonFilter(example.body);
            }
          });

          return requestBody;
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
        xhr.setRequestHeader('Authorization', authString);
        xhr.setRequestHeader('APIKey', apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(scope.apiItem.tryIt.parameters.requestBody);

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
              responseBody = 'Unable to parse response body as JSON: ' + xhr.response;
              console.warn(responseBody);
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
.controller('SampleAppsCtrl', function () {
});
