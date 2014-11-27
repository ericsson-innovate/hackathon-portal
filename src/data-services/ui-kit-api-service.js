'use strict';

/**
 * @typedef {Object} Section
 * @property {Number} index
 * @property {String} title
 * @property {String} convertedMarkdown
 */

angular.module('uiKitApiService', [])

    .factory('UiKitApi', function ($q, $http, uiKitDocUrl) {
      // TODO: do we need to support different code blocks having different languages?
      var codeBlockRegex = /<pre>\s*<code>((?:.|\n)*?)<\/code>\s*<\/pre>/gi;
      var codeBlockReplacement = '<div hljs source="\'$1\'" class="language-javascript"></div>';

      var sectionHeaderRegex = /<h1(?:.*?)>\s*(.*?)\s*<\/h1>/gi;

      var startAndEndQuotRegex = /(?:^"|"$)/g;

      var converter = new Showdown.converter({extensions: ['table']});

      var sections = [];

      var UiKitApi = {
        fetchDocumentation: fetchDocumentation,
        getSections: function () {
          return sections;
        }
      };

      return UiKitApi;

      // ---  --- //

      /**
       * @returns {Promise}
       */
      function fetchDocumentation() {
        return $http.get(uiKitDocUrl)
            .then(function (response) {
              sections = parseDocumentationIntoSections(response.data);
            });
      }

      /**
       * @param {String} documentationText
       * @returns {Array.<Section>}
       */
      function parseDocumentationIntoSections(documentationText) {
        documentationText = documentationText.replace(startAndEndQuotRegex, '');
        documentationText = documentationText.replace(/\\n/g, '\n');// TODO: unescape other possible characters
        var convertedMarkdown = parseMarkdown(documentationText);
        var sections = extractSections(convertedMarkdown);
        parseSectionsForSyntaxHighlighting(sections);
        return sections;
      }

      /**
       * @param {String} rawMarkdown
       * @returns {String}
       */
      function parseMarkdown(rawMarkdown) {
        return converter.makeHtml(rawMarkdown);
      }

      /**
       * @param {String} convertedMarkdown
       * @returns {Array.<Section>}
       */
      function extractSections(convertedMarkdown) {
        var sections = [];
        var index = 0;
        var previousContentIndex = 0;

        var result;

        sectionHeaderRegex.lastIndex = 0;

        // Add a section for the content before the first header
        addSection('Introduction', null);

        result = sectionHeaderRegex.exec(convertedMarkdown);

        // Iterate over the h1 elements within the overall converted markdown text
        while (result !== null) {
          debugger;
          // Set the markdown content of the previous section (now that we know where that section ends)
          sections[index - 1].convertedMarkdown = convertedMarkdown.substring(previousContentIndex, result.index);

          // Add a new section for the header we just found
          addSection(result[1], null);

          // Save the starting index of the content for this new section
          previousContentIndex = result.index + result[0].length;

          result = sectionHeaderRegex.exec(convertedMarkdown);
        }

        debugger;

        // Set the markdown content of the previous section (now that we know where that section ends)
        sections[index - 1].convertedMarkdown = convertedMarkdown.substring(previousContentIndex);

        // If there was no content before the first header, then we should remove the preliminary section we created
        // earlier
        if (!sections[0].convertedMarkdown) {
          sections.shift();
        }

        return sections;

        // ---  --- //

        function addSection(title, convertedMarkdown) {
          sections[index] = {
            index: index,
            title: title,
            convertedMarkdown: convertedMarkdown
          };

          index++;
        }
      }

      /**
       * @param {Array.<Section>} sections
       */
      function parseSectionsForSyntaxHighlighting(sections) {
        sections.forEach(function(section) {
          section.convertedMarkdown = parseHtmlForSyntaxHighlighting(section.convertedMarkdown);
        });
      }

      /**
       * @param {String} htmlText
       * @returns {String}
       */
      function parseHtmlForSyntaxHighlighting(htmlText) {
        return htmlText.replace(codeBlockRegex, codeBlockReplacement);
      }
    });
