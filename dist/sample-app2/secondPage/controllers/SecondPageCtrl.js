'use strict';

angular.module('app')
.controller('SecondPageCtrl', ['$scope', 'decDataFactory', 'decListener', function($scope,decDataFactory,decListener) {

  $scope.vehicleInfo = {};
  $scope.formData = {};
  $scope.formDataUpdated = {};

  $scope.init = function() {
    decListener.initListener();
    $scope.vehicleInfo = decDataFactory.getVehicleInfo();
    $scope.formData.car = $scope.vehicleInfo;
    console.log("Initializing second page controller with " + $scope.vehicleInfo);
  }

  $scope.saveFormData = function (customForm) {
    jQuery.each($scope.vehicleInfo, function(key, value) {
      console.log(key, value);
      $scope.vehicleInfo[key] = customForm[key];
    });

    console.log("New Vehicle Info", $scope.vehicleInfo);
    decDataFactory.postVehicleInfo($scope.vehicleInfo);
  }

  $scope.init();

}]);