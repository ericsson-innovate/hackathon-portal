'use strict';

angular.module('app')
    .controller('FirstPageCtrl', ["$scope", function ($scope) {
        //TODO: add $rootScope watcher for every variable set in dec.js

        $rootScope.$watch('decInstance.isOnline', function(value){
            $scope.isDecOnline = value;
        });

        var deregisterIdentificationWatch = $rootScope.$watch('identification', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the identification namespace: ', value);
            $scope.identification = $rootScope.identification;
        });

        var deregisterPoisWatch = $rootScope.$watch('pois', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the pois namespace: ', value);
        });

        var deregisterFuelWatch = $rootScope.$watch('fuel', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the fuel namespace: ', value);
            $scope.fuel = $rootScope.fuel;

        });

        var deregisterTireWatch = $rootScope.$watch('tire', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;

            console.info('Change detected on the tire namespace: ', value);
            $scope.tire = $rootScope.tire;

        });

        var deregisterDiagnosticWatch = $rootScope.$watch('diagnostic', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the diagnostic namespace: ', value);
            $scope.diagnostic = $rootScope.diagnostic;

        });

        var deregisterIgnitionWatch = $rootScope.$watch('ignition', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the ignition namespace: ', value);
            $scope.ignition = $rootScope.ignition;

        });

        var deregisterParkingBreakWatch = $rootScope.$watch('parkingBreak', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the parking break namespace: ', value);
            $scope.parkingBreak = $rootScope.parkingBreak;

        });

        var deregisterLightStatusWatch = $rootScope.$watch('lightStatus', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the lightStatus namespace: ', value);
            $scope.lightStatus = $rootScope.lightStatus;

        });

        var deregisterClimateControlWatch = $rootScope.$watch('climateControl', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the climate control namespace: ', value);
            $scope.climateControl = $rootScope.climateControl;

        });

        var deregisterDoorWatch = $rootScope.$watch('door', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the door namespace: ', value);
            $scope.door = $rootScope.door;

        });

        var deregisterSideWindowWatch = $rootScope.$watch('sideWindow', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the sideWindow namespace: ', value);
            $scope.sideWindow = $rootScope.sideWindow;

        });

        $scope.ignition = {
            "vehiclePowerMode": false
        };
        $scope.parkingBreak = {
            "status":"inactive"
        };
        $scope.diagnostic = {
            "engine": "OK",
            "antilockBrakingSystem": "OK",
            "airBags":"OK",
            "troubleCodes": "AC101"
        };

        $scope.fuel = {
            "level": 100
        }
        $scope.identification = {
            "vin": "112233",
            "model": "S60",
            "brand": "Volvo"
        };

        $scope.door = {
            "zones":[
                {"status":"ajar","lock":"true","zone":"driver"},
                {"status":"ajar","lock":"true","zone":"passenger"},
                {"status":"ajar","lock":"true","zone":"rear+left"},
                {"status":"ajar","lock":"false","zone":"rear+right"},
                {"status":"ajar","lock":"true","zone":"trunk"},
                {"status":"ajar","lock":"true","zone":"fuel"}
            ]
        };

        $scope.sideWindow = {
            "zones":[
                {"openness":0,"lock":true,"zone":"front+left"},
                {"openness":0,"lock":true,"zone":"front+right"},
                {"openness":0,"lock":true,"zone":"rear+left"},
                {"openness":0,"lock":true,"zone":"rear+right"}
            ]
        };

        $scope.tire = {
            "zones":[
                {"pressure":29,"zone":"front+left"},
                {"pressure":29,"zone":"front+right"},
                {"pressure":27,"zone":"rear+left"},
                {"pressure":29,"zone":"rear+right"}
            ]
        };

        $scope.climateControl = {
            "temperature":{
                "interiorTemperature":23
            },
            "zones":[
                {"airflowDirection":"frontpanel","zone":"front"},
                {"fanSpeedLevel":0,"zone":"front"},
                {"airRecirculation":false,"zone":"front"},
                {"airConditioning":true,"zone":"front"},
                {"heater":false,"zone":"front"},
                {"seatHeater":0,"zone":"front"},
                {"seatCooler":0,"zone":"front"}
            ]
        }

        $scope.lightStatus = {
            "brake":true,
            "fog":true,
            "hazard":true,
            "headlights":true,
            "leftTurn":true,
            "parking":true,
            "rightTurn":true
        };

        $scope.poiChange = function () {
            console.log("sample-app: Showing storage");
            var datastruct = "";
            var e = "",
                o = 0;
            for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
                e = localStorage.key(o);
                var n = /\d/g;
                n.test(e)||(datastruct += e + " : " + localStorage.getItem(e) + "\n");
            }
            //alert(datastruct);
            console.log("This is Stoffe's local storage", datastruct);

            $scope.door = {
                "zones":[
                    {"status":"ajar","lock":"true","zone":"driver"},
                    {"status":"ajar","lock":"false","zone":"passenger"},
                    {"status":"ajar","lock":"false","zone":"rear+left"},
                    {"status":"ajar","lock":"false","zone":"rear+right"},
                    {"status":"ajar","lock":"false","zone":"trunk"},
                    {"status":"ajar","lock":"false","zone":"fuel"}
                ]
            };
        };

        $scope.$on('$destroy', function () {
            //stop watching when scope is destroyed
            if (deregisterPoisWatch) deregisterPoisWatch();
            if (deregisterFuelWatch) deregisterFuelWatch();
            if (deregisterTireWatch) deregisterTireWatch();
            if (deregisterDiagnosticWatch) deregisterDiagnosticWatch();
            if (deregisterIgnitionWatch) deregisterIgnitionWatch();
            if (deregisterParkingBreakWatch) deregisterParkingBreakWatch();
            if (deregisterLightStatusWatch) deregisterLightStatusWatch();
            if (deregisterClimateControlWatch) deregisterClimateControlWatch();
            if (deregisterSideWindowWatch) deregisterSideWindowWatch();
            if (deregisterIdentificationWatch) deregisterIdentificationWatch();
        });
    }]);