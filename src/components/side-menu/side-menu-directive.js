angular.module('sideMenuDirective', [])

.constant('sideMenuTemplatePath', document.baseURI + '/dist/templates/components/side-menu/side-menu.html')

.directive('sideMenu', function ($rootScope, sideMenuGroups, sideMenuItemClickEvent, sideMenuTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      selectedItem: '='
    },
    templateUrl: sideMenuTemplatePath,
    link: function (scope, element, attrs) {
      scope.sideMenuGroups = sideMenuGroups;

      scope.handleItemClick = handleItemClick;

      // ---  --- //

      function handleItemClick(item) {
        console.log('Side menu item clicked', item.label);

        scope.selectedItem = item;

        $rootScope.$broadcast(sideMenuItemClickEvent, item);
      }
    }
  };
});
