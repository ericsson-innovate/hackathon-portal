angular.module('markdownDataService', [])

  .factory('MarkdownData', function ($q, $http, $filter, $rootScope, dataCollections, sideMenuGroups, dataLoadedEvent) {
    /**
     * @typedef {Object} Section
     * @property {Number} index
     * @property {String} id
     * @property {String} label
     * @property {String} convertedMarkdown
     */

    var sectionHeaderRegex = /<h2(?:.*?)>\s*(.*?)\s*<\/h2>/gi;

    var startAndEndQuotRegex = /(?:^"|"$)/g;

    var dataPromise = null;

    var converter = new Showdown.converter({extensions: ['table']});

    var MarkdownData = {
      fetchDocumentation: fetchAllDocumentation,
      getCollection: getCollection
    };

    return MarkdownData;

    // ---  --- //

    /**
     * @returns {Promise}
     */
    function fetchAllDocumentation() {
      if (dataPromise) {
        return dataPromise;
      } else {
        var promises = dataCollections.map(function (collection) {
          return $http.get(collection.url)
            .then(function (response) {
              switch (collection.type) {
                case 'markdown-api':
                  collection.sections = parseDocumentationIntoSections(response.data);
                  break;
                case 'json-api':
                  // TODO: integrate this into the old JSON parsing logic?
                  break;
                case 'markdown-setup':
                  collection.sections = parseDocumentationIntoSections(response.data);
                  break;
                default:
                  throw new Error('Invalid data collection type: ' + collection.type);
              }

              // Add Markdown sections to the side menu for the Vehicle Apps API group
              if (collection.id === 'vehicle-apps-api') {
                collection.sections.forEach(function (section) {
                  sideMenuGroups['vehicle-apps-api'].sections.push({
                    isStateRoute: true,
                    ref: 'api-docs.vehicle-apps-api({sectionId:\'' + section.id + '\'})',
                    label: section.label
                  });
                });
              }
            });
        });

        dataPromise = $q.all(promises)
          .then(function () {
            $rootScope.$broadcast(dataLoadedEvent, dataCollections);
            return dataCollections;
          });

        return dataPromise;
      }
    }

    function getCollection(id) {
      var i, count;

      for (i = 0, count = dataCollections.length; i < count; i += 1) {
        if (dataCollections[i].id === id) {
          return dataCollections[i];
        }
      }

      return null;
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

      function addSection(label, convertedMarkdown) {
        var id = $filter('sectionTitleToStateId')(label);

        sections[index] = {
          index: index,
          id: id,
          label: label,
          convertedMarkdown: convertedMarkdown
        };

        index++;
      }
    }
  });
