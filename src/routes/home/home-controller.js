angular.module('homeController', [])

  .controller('HomeCtrl', function ($scope, uiKitDocUrl, setupDocUrl, homeGettingStartedSectionSideBarLinks,
                                    homeSampleAppsSectionSideBarLinks, homeUiKitSectionSideBarLinks,
                                    homeDriveApiSectionSideBarLinks) {
    $scope.homeState = {};
    $scope.homeState.uiKitDocUrl = uiKitDocUrl;
    $scope.homeState.setupDocUrl = setupDocUrl;
    $scope.homeState.homeGettingStartedSectionSideBarLinks = homeGettingStartedSectionSideBarLinks;
    $scope.homeState.homeSampleAppsSectionSideBarLinks = homeSampleAppsSectionSideBarLinks;
    $scope.homeState.homeUiKitSectionSideBarLinks = homeUiKitSectionSideBarLinks;
    $scope.homeState.homeDriveApiSectionSideBarLinks = homeDriveApiSectionSideBarLinks;
  });
