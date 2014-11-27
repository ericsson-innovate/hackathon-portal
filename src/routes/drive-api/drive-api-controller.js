angular.module('driveApiController', [])
    // TODO: rename this route; rename other routes; add other routes
    .controller('DriveApiCtrl', function ($scope, UiKitApi) {
      $scope.sampleAppsState = {};
      $scope.sampleAppsState.sectionns = [];
      $scope.sampleAppsState.selectedSection = null;

      $scope.handleSectionClick = handleSectionClick;

      UiKitApi.fetchDocumentation()
          .then(onMarkdownUpdate)
          .catch(function (error) {
            console.error(error);
          });

      // ---  --- //

      function onMarkdownUpdate() {
        $scope.sampleAppsState.sections = UiKitApi.getSections();
        $scope.sampleAppsState.selectedSection =
            $scope.sampleAppsState.sections.length && $scope.sampleAppsState.sections[0] || null;
      }

      function handleSectionClick(section) {
        $scope.sampleAppsState.selectedSection = section;
      }
    });
