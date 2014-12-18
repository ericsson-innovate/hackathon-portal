angular.module('homeController', [])

  .controller('HomeCtrl', function ($scope, homeSectionsSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.homeSectionsSideBarLinks = homeSectionsSideBarLinks;
  });
