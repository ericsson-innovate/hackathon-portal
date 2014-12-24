angular.module('dynamicMarkdownListItemDirective', [])

.constant('dynamicMarkdownListItemTemplatePath', document.baseURI + '/dist/templates/components/dynamic-markdown-list/dynamic-markdown-list-item/dynamic-markdown-list-item.html')

.directive('dynamicMarkdownListItem', function (MarkdownData, dynamicMarkdownListItemTemplatePath) {
  return {
    restrict: 'A',
    scope: {
      markdownListState: '=',
      section: '='
    },
    templateUrl: dynamicMarkdownListItemTemplatePath,
    link: function (scope, element, attrs) {
      scope.handleLabelClick = handleLabelClick;

      // ---  --- //

      function handleLabelClick() {
        console.log('Dynamic Markdown list section label clicked', scope.label);

        scope.markdownListState.selectedSection = scope.section;
      }
    }
  };
});
