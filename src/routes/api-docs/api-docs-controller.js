angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope, $state, $location, sideMenuGroups) {
    $scope.apiDocsState = {};

    // Set the initially selected side-menu item
    $scope.apiDocsState.selectedItem = getItemFromRoute();

    // ---  --- //

    function getItemFromRoute() {
      var i, count, key, group, item, itemRef;
      var hash = $location.hash();

      itemRef = $state.current.name + (hash ? '({sectionId:\'' + hash + '\'})' : '');

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
