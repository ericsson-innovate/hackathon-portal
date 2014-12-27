'use strict';

angular.module('app')
.controller('ThirdPageCtrl', ['$scope', 'decDataFactory', 'decListener', function($scope,decDataFactory,decListener) {

  $scope.navInfo = {};   
  $scope.formData = {};
  $scope.formDataUpdated = {};

  $scope.update = function(navInfo) {
    console.log("Updating Navigation Info...");
    decDataFactory.postNavInfo(navInfo);
  };

  $scope.init = function() {
    decListener.initListener();
    $scope.navInfo = decDataFactory.getNavInfo();
    $scope.formData.nav = $scope.navInfo;
    console.log("Initializing third page controller with " + $scope.navInfo);
  }

  $scope.saveFormData = function (customForm) {
    jQuery.each($scope.navInfo, function(key, value) {
      console.log(key, value);
      $scope.navInfo[key] = customForm[key];
    });

    console.log("New Nav Info", $scope.navInfo);
    decDataFactory.postNavInfo($scope.navInfo);
  }
  
  $scope.init();

}]);