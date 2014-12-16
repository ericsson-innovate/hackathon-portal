angular.module('apiDocsController', [])

  .controller('ApiDocsCtrl', function ($scope, $stateParams, dataCollections) {
    $scope.apiDocsState = {};
    $scope.apiDocsState.dataCollections = dataCollections;
    $scope.apiDocsState.selectedCollection =
      dataCollections[($stateParams.collectionId ? $stateParams.collectionId : 0)];
    $scope.apiDocsState.selectedSection =
      $scope.apiDocsState.selectedCollection[($stateParams.sectionId ? $stateParams.sectionId : 0)];

    $scope.handleSideBarLinkClick = handleSideBarLinkClick;

    // ---  --- //

    function handleSideBarLinkClick(collection, section) {
      console.log('API docs side bar section link clicked', collection.label, section.title);
      $scope.apiDocsState.selectedCollection = collection;
      $scope.apiDocsState.selectedSection = section;
    }
  });
