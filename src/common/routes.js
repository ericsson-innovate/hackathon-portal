'use strict';

/**
 * Defines routes via `$routeProvider`.
 */

angular.module('hackApp')

  .config(function ($locationProvider, $stateProvider, $urlRouterProvider, topLevelRoutes, sideBarLinks, categories) {
    // Re-route invalid routes back to home
    $urlRouterProvider.otherwise(topLevelRoutes[1].url + sideBarLinks[1].url);// TODO: change this to re-route to topLevelRoutes[0].url

    var apiLink;

    topLevelRoutes.forEach(function (route) {
      $stateProvider
        .state(route.ref, {
          url: route.url,
          abstract: route.isAbstract,
          templateUrl: route.templateUrl,
          controller: route.controller,
          resolve: {
            'collections': function (MarkdownData) {
              return MarkdownData.fetchDocumentation();
            }
          }
        });
    });

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

      if ("drive-api.api-documentation" == link.ref)
        apiLink = link;
    });

    if (apiLink) {
      categories.forEach(function (category) {
        var routeName = apiLink.ref + '.' + category.id;
        var routeURL = '/' + category.id;

        $stateProvider.state(routeName, { url: routeURL, templateUrl: apiLink.templateUrl, controller: apiLink.controller });

        category['specs'].forEach(function (api) {
          var apiName = api.replace(/\./g, '_');
          var routeName = apiLink.ref + '.' + category.id + '.' + apiName;
          var routeURL = '/' + apiName;

          $stateProvider.state(routeName, { url: routeURL, templateUrl: apiLink.templateUrl, controller: apiLink.controller });

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

      isApiDoc = toState.name.indexOf('drive-api.api-documentation') === 0;

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
