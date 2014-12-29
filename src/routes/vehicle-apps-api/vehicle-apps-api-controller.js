angular.module('vehicleAppsApiController', [])

  .controller('VehicleAppsApiCtrl', function ($scope, $rootScope, $stateParams, $location, $anchorScroll, $timeout,
                                              MarkdownData, sideMenuItemClickEvent) {
    $scope.sections = MarkdownData.getCollection('vehicle-apps-api').sections;

    $anchorScroll.yOffset = document.querySelector('short-header').offsetHeight + 20;

    $rootScope.$on(sideMenuItemClickEvent, handleSideBarLinkClick);

    // Scroll the page to the correct anchor position when navigating directly to this route with a specific hash
    $rootScope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        handleSideBarLinkClick(null, $scope.apiDocsState.selectedItem);
      }, 300);
    });

    // ---  --- //

    function handleSideBarLinkClick(event, item) {
      if ($location.hash() !== item.id) {
        $location.hash(item.id);
      } else {
        $anchorScroll();
      }
    }
  });
