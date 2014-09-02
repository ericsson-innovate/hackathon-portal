'use strict';

/**
 * Defines routes via `$routeProvider`.
 */

angular.module('hackApp')

.config(function ($locationProvider, $stateProvider, $urlRouterProvider, sideBarLinks, categories) {
  // Re-route invalid routes back to home
  $urlRouterProvider.otherwise(sideBarLinks[1].url);

  var apiLink;

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

    if ("api-documentation" == link.ref)
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

        $stateProvider.state(routeName,                       { url: routeURL,          templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        $stateProvider.state(routeName + '.specification',    { url: '/specification',  templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        $stateProvider.state(routeName + '.example',          { url: '/example',        templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        $stateProvider.state(routeName + '.example.android',  { url: '/android',        templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        $stateProvider.state(routeName + '.example.ios',      { url: '/ios',            templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        $stateProvider.state(routeName + '.example.web',      { url: '/web',            templateUrl: apiLink.templateUrl, controller: apiLink.controller });
        $stateProvider.state(routeName + '.try',              { url: '/try',            templateUrl: apiLink.templateUrl, controller: apiLink.controller });
      });
    });
  }
})

.run(function ($rootScope, $log) {
  $rootScope.routeState = {};

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $log.debug('$stateChangeStart', toState.name);

    // Allows us to use a different class for the top-level view element for each route
    $rootScope.routeState = toState;

    var isApiDoc = toState.name.indexOf('api-documentation') == 0;

    if (isApiDoc) {
      var entities = toState.name.split('.');

      if (entities.length > 0) {
        $rootScope.selectedCategory = entities[1];
        $rootScope.selectedApiCategory = entities[1];
        $rootScope.selectedApi = entities[2];
        $rootScope.selectedApiTab = entities[3];
        $rootScope.selectedApiExample = entities[4];
      } else {
        if (!$rootScope.selectedCategory) {
          $rootScope.selectedCategory = $rootScope.defaultCategory;
        }
      }

      console.log($rootScope.selectedApiCategory, $rootScope.selectedApi, $rootScope.selectedApiTab, $rootScope.selectedApiExample);
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
