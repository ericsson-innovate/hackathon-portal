/**
 * Defines routes via `$routeProvider`.
 */

angular.module('hackApp')

.config(function($locationProvider, $stateProvider, $urlRouterProvider, topLevelRoutes, sideMenuGroups, webAppsApiCategories, showCountdownPage, developerPreview) {

    var isPreviewOpen = false;
    var currentTime = (new Date()).getTime();
    var startTime = (new Date(developerPreview.startDate)).getTime();
    var endTime = (new Date(developerPreview.endDate)).getTime();

    if(currentTime >= startTime  && currentTime <= endTime) isPreviewOpen = true;
    

    if (isPreviewOpen === true || showCountdownPage === false) {
        // Re-route invalid routes back to home
        $urlRouterProvider.otherwise(topLevelRoutes[0].url);

        addWebAppsApiCategoriesToSideMenuGroups();

        registerTopLevelRoutes();
        registerApiDocsRoutes();
    } 

    else {
        var route = topLevelRoutes[3];

        $stateProvider
            .state({
                name: route.ref,
                url: route.url,
                abstract: route.isAbstract,
                templateUrl: route.templateUrl,
                controller: route.controller,
                resolve: {
                    'collections': function(MarkdownData) {
                        return MarkdownData.fetchDocumentation();
                    }
                },
                params: route.defaultParams
            });

          $urlRouterProvider.otherwise(route.url);
    }


    function registerTopLevelRoutes() {
        topLevelRoutes.forEach(function(route) {
            $stateProvider
                .state({
                    name: route.ref,
                    url: route.url,
                    abstract: route.isAbstract,
                    templateUrl: route.templateUrl,
                    controller: route.controller,
                    resolve: {
                        'collections': function(MarkdownData) {
                            return MarkdownData.fetchDocumentation();
                        }
                    },
                    params: route.defaultParams
                });
        });
    }

    function registerApiDocsRoutes() {
        // The group parent routes
        Object.keys(sideMenuGroups).forEach(function(groupId) {
            var group = sideMenuGroups[groupId];
            var stateConfig = {
                name: group.ref,
                url: group.url,
                abstract: group.isAbstract,
                params: group.defaultParams
            };

            if (!group.isAbstract) {
                stateConfig.templateUrl = group.templateUrl;
                stateConfig.controller = group.controller;
            } else {
                stateConfig.template = '<ui-view/>';
            }

            $stateProvider.state(stateConfig);
        });

        // Vehicle UI API group items
        sideMenuGroups['vehicle-ui-api'].sections.forEach(function(item) {
            console.debug('IN vehicle-ui-api: ', item);
            $stateProvider
                .state({
                    name: item.ref,
                    url: item.url,
                    templateUrl: item.templateUrl,
                    controller: item.controller
                });
        });

        // Web Apps API group items
        sideMenuGroups['web-apps-api'].sections.forEach(function(item) {
            console.debug('IN web-apps-api: ', item);
            $stateProvider
                .state({
                    name: item.ref,
                    url: item.url,
                    templateUrl: item.templateUrl,
                    controller: item.controller
                });
        });
    }

    function addWebAppsApiCategoriesToSideMenuGroups() {
        webAppsApiCategories.forEach(function(category) {
            sideMenuGroups['web-apps-api'].sections.push({
                isStateRoute: true,
                ref: 'api-docs.web-apps-api.' + category.id,
                label: category.name,
                url: '/' + category.id,
                templateUrl: document.baseURI + '/dist/templates/routes/web-apps-api/api-documentation/api-documentation.html',
                controller: 'ApiDocumentationCtrl'
            });
        });
    }
})

.run(function($rootScope, $log) {
    $rootScope.routeState = {};

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $log.debug('$stateChangeStart', toState.name);

        // Allows us to use a different CSS class for the top-level view element for each route
        $rootScope.routeState = toState;
    });

    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
        $log.debug('$stateNotFound', unfoundState.name);
    });

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            $log.debug('$stateChangeSuccess', toState.name);
        });

    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
            $log.debug('$stateChangeError', toState.name, error);
        });

    $rootScope.$on('$viewContentLoaded', function(event) {
        console.log('$viewContentLoaded');
    });
});