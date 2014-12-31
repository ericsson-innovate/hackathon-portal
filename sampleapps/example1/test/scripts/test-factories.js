app.factory('decFactory', function ($rootScope) {

    var vehicleInfoInit = {
        "identification": {
            "vin":"112233",
            "vehicleType":"Car",
            "model":"S60",
            "brand":"Volvo",
            "wmi":"3 doors",
            "year":2000
        },
        "fuel": {
            "level":5
        },
        "climateControl": {
            "airConditioning": false,
            "airflowDirection": "frontpanel",
            "fanSpeedLevel":5,
            "targetTemperature":23,
            "heater": false,
            "seatHeater":0,
            "seatCooler":0,
            "steeringWheelHeater":0
        },
        "sideWindow": {
            lock: false,
            openess: 0
        }
    }
    var navInfoInit = {
        position: {
            "latitude": 1.1,
            "longitude": 2.2,
            "altitude": "3",
            "heading": "4.4",
            "precision": "",
            "velocity": "5"
        }
    };

    var factory = {};

    factory.init = function () {

        this.rootScope = $rootScope;
        this.testmode = false;

        // Initializing data
        console.log("test-sample-app: Initializing DecFactory...");
        this.rootScope.vehicleInfo = vehicleInfoInit;
        this.rootScope.position = navInfoInit.position;
        this.rootScope.notification = "";

        console.log("test-sample-app: Initializing listeners");
        //localStorage.clear();

        // Intialialize state
        this.listenerInitialized = false;

        init(new function() {},["vehicleinfo","navigation","notification"],"myApp");

        // Initialising handles
        this.handleVI = null;
        this.handleNotif = null;
        this.handleNav = null;

    }

    factory.init();

    factory.getVehicleInfo = function () {
        return this.rootScope.vehicleInfo;
    };

    factory.postVehicleInfo = function (vehicleInfo){
        console.log("test-sample-app: Posting to Vehicle Info to factory...");
        this.rootScope.vehicleInfo = vehicleInfo;
        if (!this.testmode)
            drive.vehicleinfo.identification.set(this.rootScope.vehicleInfo).then(logResult, logError);
    };

    factory.getPosition = function () {
        return this.rootScope.position;
    };

    factory.postNavInfo = function (position){
        console.log("test-sample-app: Posting to Navigation Info to factory...");
        this.rootScope.position = position;
        if (!this.testmode)
            drive.navigation.position.set(this.rootScope.position).then(logResult, logError);

    };

    factory.postNotification = function (notification){
        drive.notification.message.set(notification);
       // drive.vehicleinfo.identification.get("ost").then(logResult, logError);
    };

    factory.showStorageData = function(content){
        console.log("test-sample-app: Showing storage");
        var datastruct = "";
        //showLocalStorage();
        //
        var e = "",
            o = 0;
        for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
            e = localStorage.key(o);
            var n = /\d/g;
            n.test(e)||(datastruct += e + " : " + localStorage.getItem(e) + "\r");

        }
        alert(datastruct);
    }

    factory.showStorageSubscriptions = function(content){
        console.log("test-sample-app: Showing storage subscriptions");
        var datastruct = "";
        //showLocalStorage();
        //
        var e = "",
            o = 0;
        for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
            e = localStorage.key(o);
            var n = /\d/g;
            n.test(e)&&(datastruct += e + " : " + localStorage.getItem(e) + "\r");

        }

        alert(datastruct);
    }

    factory.clearStorage = function(content){
        console.log("test-sample-app: Clearing storage");
        localStorage.clear();
    }

    factory.initListener = function () {
        if (this.listenerInitialized || this.testmode)
            console.log("test-sample-app: Listener initialized. Doing nothing.");
        else {
            console.log("test-sample-app: Listener not initialized. Doing nothing as this is test function.");
            //localStorage.clear();
            init(new this.decCallback(),["vehicleinfo","navigation","notification"],"myApp");
        }
    }


    function logResult(value){
        console.log("sample-app: Values updated. Get function retrieved: " + value);
        if (!value.match("success"))
            alert("Values updated. Get function retrieved " + value);

    };

    function logError(value){
        console.log("sample-app: Failure setter: " + value);
    };


    factory.decCallback = function () {
        console.log("test-sample-app: Generic Info Updated");
    };

    factory.decCallbackVI = function () {
        console.log("test-sample-app: Promise fulfilled. Vehicle Info update recieved.");
        alert("Vehicle Info Updated");
        drive.vehicleinfo.identification.get("ost").then(logResult, logError);
    };

    factory.decCallbackNav = function () {
        console.log("test-sample-app: Promise fulfilled. Position update recieved.");
        alert("Position Updated");
    };

    factory.decCallbackNotif = function () {
        console.log("test-sample-app: Promise fulfilled. Notification recieved");
        alert("Notification Stoffe Ostman Recieved");
    };

    factory.subscribeVI = function () {
        this.initListener();
        console.log("test-sample-app: Subscribing to Vehicle Information...");
        if (this.testmode)
            this.handleVI =  this.rootScope.$watchCollection('vehicleInfo', this.decCallbackVI);
        else
            this.handleVI = drive.vehicleinfo.identification.subscribe(this.decCallbackVI);

    }

    factory.unsubscribeVI = function () {
        console.log("test-sample-app: Unsubscribing to Vehicle Information... ");
        if (this.testmode)
          this.handleVI();
        else
            drive.vehicleinfo.identification.unsubscribe(this.handleVI);
        this.handleVI = null;
    }


    factory.subscribeNav = function () {
        this.initListener();
        console.log("test-sample-app: Subscribing to Navigation...");
        if (this.testmode)
           this.handleNav =  this.rootScope.$watchCollection('navInfo', this.decCallbackNav);
        else
            this.handleNav = drive.navigation.position.subscribe(this.decCallbackNav);
    }

    factory.unsubscribeNav = function () {
        console.log("test-sample-app: Unsubscribing to Navigation...");
        if (this.testmode)
            this.handleNav();
        else
            drive.navigation.position.unsubscribe(this.handleNav);

        this.handleNav = null;
    }


    factory.subscribeNotif = function () {
        this.initListener();
        console.log("test-sample-app: Subscribing to Notifications...");
        if (this.testmode)
            this.handleNotif = this.rootScope.$watchCollection('notification', this.decCallbackNotif);
        else
            this.handleNotif = drive.notification.subscribe(this.decCallbackNotif);

    }

    factory.unsubscribeNotif = function () {
        console.log("test-sample-app: Unsubscribing to Notifications...");
        if (this.testmode)
            this.handleNotif();
        else
            drive.notification.unsubscribe(this.handleNotif);

        this.handleNotif = null;
    }

    factory.simulate = function() {
        console.log("sample-app: Simulating updates");

        //setTimeout(function(){
        //    $scope.vehicleInfo.identification.brand = "Saab";
        //    $scope.$apply();
        //}, 600);
        //setTimeout(function(){
        //    $scope.vehicleInfo.identification.vehicleType = "Truck";
        //    $scope.$apply();
        //}, 1000);
        //setTimeout(function(){
        //    $scope.vehicleInfo.identification.model = "Z70";
        //    $scope.$apply();
        //}, 1900);
        //setTimeout(function(){
        //    $scope.vehicleInfo.identification.year = 2009;
        //    $scope.$apply();
        //}, 2100);
        //setTimeout(function(){
        //    $scope.vehicleInfo.identification.wmi = "7 doors";
        //    $scope.$apply();
        //}, 2500);

        setInterval(function(){
            this.rootScope.position.latitude += 0.02;
            this.rootScope.position.longitude += 0.02;
            this.rootScope.$apply();
        }, 500,100);

        setTimeout(function(){
            this.rootScope.vehicleInfo.climateControl.airConditioning = true;
            this.rootScope.$apply();
        }, 600);
        setTimeout(function(){
            this.rootScope.vehicleInfo.climateControl.targetTemperature = 25;
            this.rootScope.$apply();
        }, 1000);
        setTimeout(function(){
            this.rootScope.vehicleInfo.fuel.level = 9;
            this.rootScope.$apply();
        }, 1050);
        setTimeout(function(){
            this.rootScope.vehicleInfo.climateControl.airflowDirection = "floorduct";
            this.rootScope.$apply();
        }, 1900);
        setTimeout(function(){
            this.rootScope.vehicleInfo.climateControl.steeringWheelHeater = 10;
            this.rootScope.$apply();
        }, 2100);
        setTimeout(function(){
            this.rootScope.vehicleInfo.climateControl.fanSpeedLevel = 10;
            this.rootScope.$apply();
        }, 2500);

    }

    return factory;

})
