angular.module('vehicleAppsApiController', [])

  .controller('VehicleAppsApiCtrl', function ($scope, $rootScope, $location, $anchorScroll, $timeout, $state,
                                              $stateParams, sideMenuGroups, MarkdownData, sideMenuItemClickEvent) {
    $scope.sections = MarkdownData.getCollection('vehicle-apps-api').sections;

    $anchorScroll.yOffset = document.querySelector('short-header').offsetHeight + 20;

    $rootScope.$on(sideMenuItemClickEvent, handleSideBarLinkClick);

    // Scroll the page to the correct anchor position when navigating directly to this route with a specific hash
    $rootScope.$on('$viewContentLoaded', function () {
      $timeout(function () {
        if (!$rootScope.apiDocsState.selectedItem) {
          // Set the initially selected side-menu item
          $rootScope.apiDocsState.selectedItem = getItemFromStateParam();
        }

        handleSideBarLinkClick(null, $rootScope.apiDocsState.selectedItem);
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

    function getItemFromStateParam() {
      var i, count, key, group, item;
      var hash = $stateParams.sectionId;
      var itemRef = $state.current.name + (hash ? '({sectionId:\'' + hash + '\'})' : '');

      for (key in sideMenuGroups) {
        group = sideMenuGroups[key];

        for (i = 0, count = group.sections.length; i < count; i += 1) {
          item = group.sections[i];

          if (item.ref === itemRef) {
            return item;
          }
        }
      }

      return null;
    }
  });
