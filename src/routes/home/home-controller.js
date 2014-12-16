angular.module('homeController', [])

  .controller('HomeCtrl', function ($scope, homeGettingStartedSectionSideBarLinks, homeSampleAppsSectionSideBarLinks,
                                    homeUiKitSectionSideBarLinks, homeDriveApiSectionSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.homeGettingStartedSectionSideBarLinks = homeGettingStartedSectionSideBarLinks;
    $scope.homeState.homeSampleAppsSectionSideBarLinks = homeSampleAppsSectionSideBarLinks;
    $scope.homeState.homeUiKitSectionSideBarLinks = homeUiKitSectionSideBarLinks;
    $scope.homeState.homeDriveApiSectionSideBarLinks = homeDriveApiSectionSideBarLinks;
  });
