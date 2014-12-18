angular.module('hackController', [])

  .constant('car1Url', document.baseURI + '/dist/images/car-1.png')
  .constant('car2Url', document.baseURI + '/dist/images/car-2.png')

  .controller('HackCtrl', function ($scope) {
    $scope.hackState = {};
  });
