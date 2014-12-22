angular.module('markdownBlockDirective', [])

    .directive('markdownBlock', function ($compile, $timeout) {
      var codeBlockRegex = /<pre>\s*<code(?: class="(.*?)")?>((?:.|\n)*?)<\/code>\s*<\/pre>/gi;

      return {
        restrict: 'E',
        scope: {
          convertedMarkdown: '@'
        },
        link: function (scope, element, attrs) {
          scope.$watch('convertedMarkdown', onConvertedMarkdownChange);

          // ---  --- //

          function onConvertedMarkdownChange() {
            scope.syntaxHighlightedMarkdown = parseHtmlForSyntaxHighlighting(scope.convertedMarkdown);

            // Add the markdown content to the DOM
            element.html(scope.syntaxHighlightedMarkdown);

            compileCodeBlocks();
          }

          function compileCodeBlocks() {
            // TODO: instead of using the above regex and then searching for [hljs] elements, search for the raw pre elements; then check for a child code element; then use element.html and element.replaceWith to add and compile the hljs element

            var matches = element[0].querySelectorAll('[hljs]');

            var i, count;

            for (i = 0, count = matches.length; i < count; i += 1) {
              var hljsElement = angular.element(matches[i]);
              var codeBlockElement = $compile(hljsElement)(scope);
              hljsElement.replaceWith(codeBlockElement);
            }
          }

          /**
           * @param {String} htmlText
           * @returns {String}
           */
          function parseHtmlForSyntaxHighlighting(htmlText) {
            return htmlText.replace(codeBlockRegex, replacer);

            // ---  --- //

            function replacer(match, $1, $2) {
              return '<div hljs source="\'' + htmlEncode($2) + '\'" class="language-' + $1 + '"></div>';
            }

            function htmlEncode(s) {
              return s
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;');
            }
          }
        }
      };
    });
