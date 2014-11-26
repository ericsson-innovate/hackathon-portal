angular.module('markdownBlockDirective', [])

    .directive('markdownBlock', function ($compile, $timeout) {
      return {
        restrict: 'E',
        scope: {
          convertedMarkdown: '@'
        },
        link: function (scope, element, attrs) {
          scope.$watch('convertedMarkdown', onConvertedMarkdownChange);

          // ---  --- //

          function onConvertedMarkdownChange() {
            // Add the markdown content to the DOM
            element.html(scope.convertedMarkdown);

            compileCodeBlocks();
          }

          function compileCodeBlocks() {
            var matches = element[0].querySelectorAll('[hljs]');

            var i, count;

            for (i = 0, count = matches.length; i < count; i += 1) {
              var hljsElement = angular.element(matches[i]);
              var codeBlockElement = $compile(hljsElement)(scope);
              hljsElement.replaceWith(codeBlockElement);
            }
          }
        }
      };
    });
