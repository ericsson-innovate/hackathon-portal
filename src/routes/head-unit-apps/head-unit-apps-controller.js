angular.module('headUnitAppsController', [])

  .controller('HeadUnitAppsCtrl', function ($scope, homeSectionsSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.homeSectionsSideBarLinks = homeSectionsSideBarLinks;
  });
