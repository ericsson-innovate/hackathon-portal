/**
 * @typedef {Object} Section
 * @property {Number} index
 * @property {String} title
 * @property {String} convertedMarkdown
 */

angular.module('markdownDataService', [])

  .factory('MarkdownData', function ($q, $http) {
    var sectionHeaderRegex = /<h2(?:.*?)>\s*(.*?)\s*<\/h2>/gi;

    var startAndEndQuotRegex = /(?:^"|"$)/g;

    var converter = new Showdown.converter({extensions: ['table']});

    var sections = {};

    var MarkdownData = {
      fetchDocumentation: fetchDocumentation,
      getSections: getSections
    };

    return MarkdownData;

    // ---  --- //

    /**
     * @returns {Promise}
     */
    function fetchDocumentation(url) {
      return $http.get(url)
        .then(function (response) {
          sections[url] = parseDocumentationIntoSections(response.data);
        });
    }

    function getSections(url) {
      return sections[url];
    }

    /**
     * @param {String} documentationText
     * @returns {Array.<Section>}
     */
    function parseDocumentationIntoSections(documentationText) {
      documentationText = documentationText.replace(startAndEndQuotRegex, '');
      documentationText = documentationText.replace(/\\n/g, '\n');// TODO: unescape other possible characters
      var convertedMarkdown = parseMarkdown(documentationText);
      return extractSections(convertedMarkdown);
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
        // Set the markdown content of the previous section (now that we know where that section ends)
        sections[index - 1].convertedMarkdown = convertedMarkdown.substring(previousContentIndex, result.index);

        // Add a new section for the header we just found
        addSection(result[1], null);

        // Save the starting index of the content for this new section
        previousContentIndex = result.index + result[0].length;

        result = sectionHeaderRegex.exec(convertedMarkdown);
      }

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
  });
