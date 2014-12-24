angular.module('apiDocumentationController', [])

/**
 * @ngdoc object
 * @name ApiDocumentationCtrl
 * @description
 *
 * Controller for the API Documentation page.
 */
  .controller('ApiDocumentationCtrl', function ($scope, $state, $stateParams) {
      $scope.selectedApiCategory = $state.current.name.split('.').pop();
  });
