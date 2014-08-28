'use strict';

angular.module('examplesService', [])

/**
 * @ngdoc service
 * @name HackExamples
 * @requires $q
 * @requires $http
 * @requires $filter
 * @requires HackSpecifications
 * @requires dataPath
 * @requires apiList
 * @requires androidExampleUrl
 * @requires iosExampleUrl
 * @requires webExampleUrl
 * @description
 *
 * This is the model for all of the hackathon's examples.
 */
.factory('HackExamples', function ($q, $http, $filter, HackSpecifications, dataPath, apiList,
                                   androidExampleUrl, iosExampleUrl, webExampleUrl) {
  var newline = '\n',
      startRegex = /^\s*\/\/ ## START /g,
      endRegex = /^\s*\/\/ ## END /g,
      eitherRegex = /^\s*\/\/ ## /,
      commonSnippetId = 'COMMON',
      filePromises = {},
      HackExamples;

  function extractText(exampleCompleteText, specificationId) {
    var lines, startLineIndex, endLineIndex;

    lines = exampleCompleteText.split(newline);

    // Extract the example from the text
    startLineIndex = findFlag(startRegex, specificationId, lines, 0) + 1;
    endLineIndex = findFlag(endRegex, specificationId, lines, startLineIndex);

    // Ensure the start and end flags are present
    if (startLineIndex >= 0 && endLineIndex >= 0) {
      endLineIndex = removeAnyNestedFlags(lines, startLineIndex, endLineIndex);

      return lines.slice(startLineIndex, endLineIndex).join(newline);
    } else {
      return null;
    }

    function findFlag(regex, specificationId, lines, startLineIndex) {
      var i, count;

      for (i = startLineIndex, count = lines.length; i < count; i += 1) {
        if (regex.exec(lines[i]) &&
            lines[i].indexOf(specificationId, regex.lastIndex) === regex.lastIndex) {
          regex.lastIndex = 0;
          return i;
        }
        regex.lastIndex = 0;
      }

      return -1;
    }

    function removeAnyNestedFlags(lines, startLineIndex, endLineIndex) {
      var i;

      for (i = startLineIndex; i < endLineIndex; i += 1) {
        if (eitherRegex.test(lines[i])) {
          lines.splice(i, 1);
          endLineIndex--;
          i--;
        }
      }

      return endLineIndex;
    }
  }

  function extractExampleText(exampleData, apiName, platform) {
    var snippetText = extractText(exampleData.file.allText, apiName);

    if (!snippetText) {
      console.warn('Example not found in file: platform=' + platform + ', apiName=' + apiName);
      snippetText =  '// Example forthcoming';
    } else {
      snippetText += exampleData.file.commonText;
    }

    exampleData.text = snippetText;
  }

  HackExamples = {
    /**
     * @param {string} groupDirectoryName
     * @param {string} apiName
     * @param {'all'|'web'|'ios'|'android'} platform
     * @returns {Promise}
     */
    fetchExampleData: function (groupDirectoryName, apiName, platform) {
      var url, promises;

      if (platform === 'all') {
        promises = [];

        ['web', 'ios', 'android'].forEach(function (platform) {
          promises.push(HackExamples.fetchExampleData(groupDirectoryName, apiName, platform));
        });

        return $q.all(promises);
      } else {
        // Determine the complete URL for this example
        url = platform === 'android' ? androidExampleUrl : platform === 'ios' ? iosExampleUrl :
            webExampleUrl;
        url += HackSpecifications.specificationsData[apiName].codeExamples[platform];

        // Make sure the example object exists
        HackExamples.examplesData[apiName] = HackExamples.examplesData[apiName] ?
            HackExamples.examplesData[apiName] : {};

        HackExamples.examplesData[apiName][platform] = {
          file: {
            allText: '',
            commonText: ''
          },
          text: ''
        };

        // Check whether we have already made a request for this example's file
        if (!filePromises[url]) {
          // Make the request for this example's file
          filePromises[url] = $http.get(url)
              .then(function (response) {
                var file = {};

                file.allText = $filter('unescapeJsonString')(response.data);

                file.commonText = extractText(file.allText, commonSnippetId, platform);
                file.commonText = file.commonText ? newline + newline + file.commonText : '';

                return file;
              })
              .catch(function (error) {
                var message = 'Problem retrieving example data';

                console.error(message, error);

                return {
                  allText: message,
                  commonText: ''
                };
              });
        }

        // Return the promise for this example data
        return filePromises[url]
            .then(function (file) {
              // Extract this example's text from the file
              HackExamples.examplesData[apiName][platform].file = file;
              extractExampleText(HackExamples.examplesData[apiName][platform], apiName, platform);
              return HackExamples.examplesData[apiName][platform];
            });
      }
    },
    /**
     * @returns {Promise}
     */
    fetchAllExamplesData: function () {
      var apiSectionKey, promises = [];

      for (apiSectionKey in apiList) {
        apiList[apiSectionKey].forEach(function (apiName) {
          promises.push(HackExamples.fetchExampleData(apiSectionKey, apiName, 'all'));
        });
      }

      return $q.all(promises)
          .then(function () {
            HackExamples.allDataHasBeenFetched = true;
          });
    },
    /**
     * @returns {Promise}
     */
    getAllExamplesData: function () {
      var deferred = $q.defer();

      if (HackExamples.allDataHasBeenFetched) {
        deferred.resolve(HackExamples.examplesData);
      } else {
        HackExamples.fetchAllExamplesData()
            .then(function () {
              deferred.resolve(HackExamples.examplesData);
            });
      }

      return deferred.promise;
    },
    allDataHasBeenFetched: false,
    examplesData: {},
    currentPlatform: 'web'
  };

  return HackExamples;
});
