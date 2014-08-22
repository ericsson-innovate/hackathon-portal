'use strict';

angular.module('sampleAppsController', [])

/**
 * @ngdoc object
 * @name SampleAppsCtrl
 * @description
 *
 * Controller for the Sample Apps page.
 */
.controller('SampleAppsCtrl', function ($scope, sampleAppData) {
  $scope.sampleAppsState = {};
  $scope.sampleAppsState.sampleAppData = sampleAppData;
});
