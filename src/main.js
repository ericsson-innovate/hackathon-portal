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

  'animationsDirective',

  'categoryFilter',
  'errorDescriptionFilter',
  'orderApiCallsFilter',
  'unescapeJsonStringFilter',

  'apiListItemDirective',
  'apiSpecificationCardDirective',
  'apiExampleCardDirective',
  'apiTryItCardDirective',
  'apiListDirective',
  'markdownBlockDirective',

  'apiService',
  'examplesService',
  'specificationsService',
  'tryItService',
  'uiKitApiService',

  'apiDocumentationController',
  'driveApiController',
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
