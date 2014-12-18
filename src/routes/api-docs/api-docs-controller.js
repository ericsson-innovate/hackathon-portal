angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope, $state, $stateParams, $location, $anchorScroll, MarkdownData) {
    $scope.apiDocsState = {};
    $scope.apiDocsState.selectedCollection = MarkdownData.getCollection($state.current.name);
    $scope.apiDocsState.selectedSection =
      $scope.apiDocsState.selectedCollection.sections[($stateParams.sectionId ? $stateParams.sectionId : 0)];

    $anchorScroll.yOffset = document.querySelector('short-header').offsetHeight + 20;

    $scope.handleSideBarLinkClick = handleSideBarLinkClick;

    // ---  --- //

    function handleSideBarLinkClick(section) {
      console.log('API docs side bar section link clicked', section.title);

      $scope.apiDocsState.selectedSection = section;

      if ($location.hash() !== section.id) {
        $location.hash(section.id);
      } else {
        $anchorScroll();
      }
    }
  });
