angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope, $state, $stateParams, MarkdownData) {
    $scope.apiDocsState = {};
    $scope.apiDocsState.selectedCollection = MarkdownData.getCollection($state.current.name);
    $scope.apiDocsState.selectedSection =
      $scope.apiDocsState.selectedCollection.sections[($stateParams.sectionId ? $stateParams.sectionId : 0)];

    $scope.handleSideBarLinkClick = handleSideBarLinkClick;

    // ---  --- //

    function handleSideBarLinkClick(section) {
      console.log('API docs side bar section link clicked', section.title);
      $scope.apiDocsState.selectedSection = section;
    }
  });
