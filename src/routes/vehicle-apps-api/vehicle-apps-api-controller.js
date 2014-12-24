angular.module('vehicleAppsApiController', [])

  .controller('VehicleAppsApiCtrl', function ($scope, $rootScope, $stateParams, $location, $anchorScroll,
                                              MarkdownData, sideMenuItemClickEvent) {
    $scope.sections = MarkdownData.getCollection('vehicle-apps-api').sections;

    $anchorScroll.yOffset = document.querySelector('short-header').offsetHeight + 20;

    $rootScope.$on(sideMenuItemClickEvent, handleSideBarLinkClick);

    $location.hash($stateParams.sectionId);// TODO: this should be performed differently; it needs to actually set the selectedSection property on the parent scope as well, so that the side-bar item will be highlighted

    // ---  --- //

    function handleSideBarLinkClick(event, item) {
      if ($location.hash() !== item.id) {
        $location.hash(item.id);
      } else {
        $anchorScroll();
      }
    }
  });
