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
        })
        .when('/thirdPage', {
          templateUrl: 'thirdPage/views/thirdPage.html',
          controller: 'ThirdPageCtrl',
          settings: {
            viewName: 'Navigation View',
          }
        })
        .otherwise({
          redirectTo: '/firstPage'
        });
});

// AT&T DRIVE DEC INIT
function decCallback() {
};

app.run(function ($rootScope) {

    // DO NOT REMOVE THE BELLOW COMMENT - used for grunt build process
    init(new decCallback(), ["appmanager","commerce","connectivity","identity","media","navigation","notification","policy","sa","search","settings","sms","va","vehicleinfo"], '/Users/damirmustafic/Sites/SDK/myapp');

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
    { text: 'Alerts', desc: 'The alert settings panel', href: '#/firstPage', selected: true },
    { text: 'Vehicle Information', desc: 'View and set vehicle information', href: '#/secondPage', selected: false },
    { text: 'Navigation Page', desc: 'View and set navigation', href: '#/thirdPage', selected: false }
    ];
});

// MATS's FACTORIES

app.factory('decDataFactory', function () {
  var vehicleInfoInit = {
    "vin":"1122",
    "vehicleType":"Car",
    "model":"S60",
    // "brand":"Volvo",
    // "wmi":"Cheese",
    "year":2004
  }

  var navInfoInit = {
    "latitude":0.0,
    "longitude":1.0,
    "altitude":"10",
    "heading":"0.0",
    "precision":"",
    "velocity":"0"
  };

  var factory = {};

  factory.init = function () {
    console.log("sample-app: Initializing DecDataFactory...");
    this.vehicleInfo = vehicleInfoInit;
    this.navInfo = navInfoInit;
  }

  factory.init();

  factory.getVehicleInfo = function () {
    return this.vehicleInfo;
  };

  factory.postVehicleInfo = function (vehicleInfo){
    console.log("sample-app: Posting to Vehicle Info to factory...");
    this.vehicleInfo = vehicleInfo;
    this.postVehicleInfoToDec(vehicleInfo);
  };

  factory.getNavInfo = function () {
    return this.navInfo;
  };

  factory.postNavInfo = function (navInfo){
    console.log("sample-app: Posting to Navigation Info to factory...");
    this.navInfo = navInfo;
    this.postNavInfoToDec(navInfo);
  };

  factory.postVehicleInfoToDec = function (vehicleInfo){
    console.log("sample-app: Posting to Vehicle Info to DEC...");
    console.log("sample-app: Using collection: " + vehicleInfo);
    drive.vehicleinfo.identification.set(vehicleInfo).then(logResult, logError);

  };

  factory.postNavInfoToDec = function (navInfo){
    console.log("sample-app: Posting to Navigation Info to DEC...");
    console.log("sample-app: Using collection: " + navInfo);
    drive.navigation.position.set(navInfo).then(logResult, logError);

  };

  function logResult(value){
    console.log("sample-app: Success setter: " + value);

  };

  function logError(value){
    console.log("sample-app: Failure setter: " + value);
  };

  return factory;
});

app.factory('decListener', function () {

  var factory = {};

  factory.initListener = function () {
    if (this.listenerInitialized)
      console.log("sample-app: Listener initialized. Doing nothing.");
      else {
        console.log("sample-app: Listener not initialized. Doing it.");
        init(new this.decCallback(),["vehicleinfo","navigation"],"myApp");
      }
    }

    factory.init = function (){
      console.log("sample-app: Initializing DEC listener");
      localStorage.clear();

      // Initialising handles
      this.handleVI = null;
      this.handleNotif = null;
      this.handleNav = null;

      // Intialialize state
      this.listenerInitialized = false;
    };

    factory.init();

    factory.decCallback = function () {
      console.log("sample-app: Generic Info Updated");
      //alert("Generic Info Updated");
    };

    factory.alerter = function () {

      alert("Cheese: ");
    }

    factory.alerterError = function () {

      alert("Freese: ");
    }

    factory.decCallbackVI = function () {
      console.log("sample-app: Vehicle Info Updated");
      alert("Vehicle Info Updated");
      try {
        drive.vehicleinfo.identification.get().then(this.alerter, this.alertError);
        console.log("sample-app: Get VI Successful");
      }
      catch(err) {
        console.log("sample-app: Get VI failed with exception " + err);

      }

    };

    factory.decCallbackNav = function () {
      console.log("sample-app: Position Updated");
      alert("Position Updated");

      try {
        drive.navigation.position.get().then(this.alerter, this.alertError);
        console.log("sample-app: Get Position Successful");
      }
      catch(err) {
        console.log("sample-app: Get Position failed with exception " + err);

      }
    };

    factory.decCallbackNotif = function () {
      console.log("sample-app: Notification recieved");
      alert("Notification Recieved");

      try {
        drive.notification.get().then(this.alerter, this.alertError);
        console.log("sample-app: Get Notification Successful");
      }
      catch(err) {
        console.log("sample-app: Get Notification failed with exception " + err);

      }
    };

    factory.subscribeVI = function () {
      this.initListener();
      console.log("sample-app: Subscribing to Vehicle Information...");
      this.handleVI = drive.vehicleinfo.identification.subscribe(this.decCallbackVI);
    }

    factory.unsubscribeVI = function () {
      console.log("sample-app: Unsubscribing to Vehicle Information... ");
      drive.vehicleinfo.identification.unsubscribe(this.handleVI);
      this.handleVI = null;
    }


    factory.subscribeNav = function () {
      this.initListener();
      console.log("sample-app: Subscribing to Navigation...");
      this.handleNav = drive.navigation.position.subscribe(this.decCallbackNav);

    }

    factory.unsubscribeNav = function () {
      console.log("sample-app: Unsubscribing to Navigation...");
      drive.navigation.position.unsubscribe(this.handleNav);
      this.handleNav = null;
    }


    factory.subscribeNotif = function () {
      this.initListener();
      console.log("sample-app: Subscribing to Notifications...");
      this.handleNotif = drive.notification.subscribe(this.decCallbackNotif);
    }

    factory.unsubscribeNotif = function () {
      console.log("sample-app: Unsubscribing to Notifications...");
      drive.notification.unsubscribe(this.handleNotif);
      this.handleNotif = null;
    }

    return factory;

  });
