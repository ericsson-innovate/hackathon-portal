angular.module('homeController', [])

  .controller('HomeCtrl', function ($scope, UiKitApi, uiKitDocUrl) {
    $scope.sampleAppsState = {};
    $scope.sampleAppsState.sectionns = [];
    $scope.sampleAppsState.selectedSection = null;

    $scope.handleSectionClick = handleSectionClick;

    UiKitApi.fetchDocumentation(uiKitDocUrl)
      .then(onMarkdownUpdate)
      .catch(function (error) {
        console.error(error);
      });

    // ---  --- //

    function onMarkdownUpdate() {
      $scope.sampleAppsState.sections = UiKitApi.getSections();// TODO:
      $scope.sampleAppsState.selectedSection =
        $scope.sampleAppsState.sections.length && $scope.sampleAppsState.sections[0] || null;
    }

    function handleSectionClick(section) {
      $scope.sampleAppsState.selectedSection = section;
    }
  });
