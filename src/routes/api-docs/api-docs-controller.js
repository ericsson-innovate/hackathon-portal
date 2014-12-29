angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope, $rootScope, $state, $location, sideMenuGroups) {
    $rootScope.apiDocsState = {};

    // Set the initially selected side-menu item
    $rootScope.apiDocsState.selectedItem = getItemFromRoute();

    // ---  --- //

    function getItemFromRoute() {
      var i, count, key, group, item;
      var hash = $location.hash();
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
