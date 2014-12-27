'use strict';

angular.module('app')
  .controller('FirstPageCtrl', ['$scope','decDataFactory', 'decListener', function($scope, decDataFactory, decListener) {
  
        $scope.init = function() {
            decListener.initListener();
            //$scope.count = 5;
            $scope.subscribedVehicleInfo = !(decListener.handleVI == null);
            $scope.subscribedNavigation = !(decListener.handleNav == null);
            $scope.subscribedNotifications = !(decListener.handleNotif == null);
        }

        $scope.onChangeVI = function() {
            if ($scope.subscribedVehicleInfo) {
                $scope.handleVI = decListener.subscribeVI()
            }
            else {
                decListener.unsubscribeVI();
            }
            console.log("sample-app: Handle: " + decListener.handleVI);
        }

       $scope.onChangeNotif = function() {
            if ($scope.subscribedNotifications) {
                $scope.handleNotif = decListener.subscribeNotif()
            }
            else {
                decListener.unsubscribeNotif();
            }
            console.log("sample-app: Handle: " + decListener.handleNotif);
        }

        $scope.onChangeNav = function() {
            if ($scope.subscribedNavigation) {
                $scope.handleNav = decListener.subscribeNav()
            }
            else {
                decListener.unsubscribeNav();
            }
            console.log("sample-app: Handle: " + decListener.handleNav);
        }

      $scope.init();
    
  }]);


