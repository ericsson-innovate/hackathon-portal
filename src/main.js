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

  // Filters

  'categoryFilter',
  'errorDescriptionFilter',
  'orderApiCallsFilter',
  'sectionTitleToStateIdFilter',
  'unescapeJsonStringFilter',

  // Components

  'apiListItemDirective',
  'apiSectionBlockDirective',
  'apiSpecificationCardDirective',
  'apiExampleCardDirective',
  'apiTryItCardDirective',
  'apiListDirective',
  'dynamicMarkdownListDirective',
  'dynamicMarkdownListItemDirective',
  'homePageSectionDirective',
  'markdownBlockDirective',
  'shortHeaderDirective',
  'sideMenuDirective',
  'tallHeaderDirective',
  'countdownTimerDirective',

  // Data services

  'apiService',
  'examplesService',
  'specificationsService',
  'tryItService',
  'markdownDataService',

  // Routes

  'apiDocsController',
  'headUnitAppsController',
  'twoVideosController',
  'countdownController',

  'vehicleAppsApiController',

  'carAppFrameworkController',
  'sampleCarAppController',
  'uiComponentsController',

  'apiDocumentationController',
  'gettingStartedController',
  'sampleAppsController'
])

  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '//www.youtube.com/embed/**'
    ]);
  })

.run(function ($rootScope, $http, webAppsApiCategories, sampleAppData, HackApi) {
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
