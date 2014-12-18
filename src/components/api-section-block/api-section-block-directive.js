angular.module('apiSectionBlockDirective', [])

.constant('apiSectionBlockTemplatePath', document.baseURI + '/dist/templates/components/api-section-block/api-section-block.html')

.directive('apiSectionBlock', function (apiSectionBlockTemplatePath) {
  return {
    restrict: 'E',

    scope: {
      section: '='
    },

    templateUrl: apiSectionBlockTemplatePath,

    link: function (scope, element, attrs) {
      element.attr('id', scope.section.id);
    }
  };
});
