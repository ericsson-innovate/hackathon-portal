angular.module('dynamicMarkdownListDirective', [])

.constant('dynamicMarkdownListTemplatePath', document.baseURI + '/dist/templates/components/dynamic-markdown-list/dynamic-markdown-list.html')

.directive('dynamicMarkdownList', function (MarkdownData, dynamicMarkdownListTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      id: '@'
    },
    templateUrl: dynamicMarkdownListTemplatePath,
    link: function (scope, element, attrs) {
      scope.markdownListState = {};
      scope.markdownListState.sections = [];
      scope.markdownListState.selectedSection = null;

      MarkdownData.fetchDocumentation(scope.url)
        .then(onMarkdownUpdate)
        .catch(function (error) {
          console.error(error);
        });

      // ---  --- //

      function onMarkdownUpdate() {
        scope.markdownListState.sections = MarkdownData.getCollection(scope.id).sections;
        scope.markdownListState.selectedSection = scope.markdownListState.sections.length && scope.markdownListState.sections[0] || null;
      }
    }
  };
});
