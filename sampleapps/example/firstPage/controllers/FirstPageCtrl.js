'use strict';

angular.module('app')
  .controller('FirstPageCtrl', ["$scope", function ($scope) {
      $scope.isDecOnline = $rootScope.decInstance.isOnline;

      //SUBSCRIBE SET & GET IDENTIFICATION
      //var idSubscribeHandle = drive.vehicleinfo.identification.subscribe(function (res) {
      //    console.log(res);
      //});

      //var idSettings = { "vin": "B5244S6 S60", "wmi": "K&N drop-in filter", "vehicleType": "Car", "brand": "Volvo", "model": "S60", "year": 2014 };
      //drive.vehicleinfo.identification.set(idSettings).then(function () { }, function () { });
      //drive.vehicleinfo.identification.get().then(function () { }, function () { });
  }]);