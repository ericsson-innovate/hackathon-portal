angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope) {
    $scope.apiDocsState = {};
    $scope.apiDocsState.selectedItem = null;
  });
