"use strict";

var app = angular.module('app', [
    'ngRoute',
    'connectedCarSDK'
]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/firstPage', {
            templateUrl: 'firstPage/views/firstPage.html',
            controller: 'FirstPageCtrl',
            settings: {
                viewName: 'First Page',
            }
        })
        .when('/secondPage', {
            templateUrl: 'secondPage/views/secondPage.html',
            controller: 'SecondPageCtrl',
            settings: {
                viewName: 'Second Page',
            }
        })
        .otherwise({
            redirectTo: '/firstPage'
        });
});

// AT&T DRIVE DEC INIT
function initDec() {
    $rootScope.decInstance = {};
    window.DecInstanceConstructor = function (inputParam) {
        var input = inputParam;
        var isOnline = input && input.successCode == '0';

        function getSuccessObject() {
            return isOnline ? input : null;
        }

        function getErrorObject() {
            return !isOnline ? input : null;
        }

        function status() {
            var returnObj = {};

            returnObj.status = isOnline ? 'success' : 'error';
            returnObj.message = isOnline ? input.successMessage : input.errorMessage;
            returnObj.code = isOnline ? input.successCode : input.errorCode;

            return returnObj;
        }

        return {
            isOnline: isOnline,
            status: status,
            getSuccessObject: getSuccessObject,
            getErrorObject: getErrorObject
        };
    };

    function decCallback(decResponse) {
        $rootScope.decInstance = new DecInstanceConstructor(decResponse);
    };

    try {
        // DO NOT REMOVE THE BELLOW COMMENT - used for grunt build process
        init(decCallback, ["appmanager", "commerce", "connectivity", "identity", "media", "navigation", "notification", "policy", "sa", "search", "settings", "sms", "va", "vehicleinfo"], 'myFirstApp');
    } catch (e) {
        $rootScope.decInstance = new DecInstanceConstructor({
            "errorCode": e.code,
            "errorMessage": e.message,
            "thrownError": e
        });
    }
}

app.run(function ($rootScope) {
    window.$rootScope = $rootScope;
    initDec();

    $rootScope.appName = 'myFirstApp';
    $rootScope.showDrawer = true;

    $rootScope.$on('$routeChangeSuccess',
        function (event, next, current) {
            $rootScope.showDrawer = false;

            $rootScope.$broadcast('changeDrawer', [false]);

            if (next && next.$$route && next.$$route.settings) {
                $rootScope.viewName = next.$$route.settings.viewName;
            }
        });

    $rootScope.appLinks = [
        { text: 'First Page', desc: 'First page description', href: '#/firstPage', selected: true },
        { text: 'Second Page', desc: 'Second page description', href: '#/secondPage', selected: false }
    ];
});
