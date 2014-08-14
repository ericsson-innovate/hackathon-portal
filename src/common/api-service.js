'use strict';

angular.module('hackApiService', [])

// TODO: change the data services to instead:
// - get the example data from files according to where they are defined in the specifications
//   - I will need to manually cache the content of files that have already been fetched, so that I can pull other examples from them when there are multiple examples in one file
//   - similarly, I will need to manually cache the example text that has been retrieved, so that I do not have to re-parse files

/**
 * @ngdoc service
 * @name HackSpecifications
 * @requires $q
 * @requires $http
 * @requires $log
 * @requires $filter
 * @requires HackSpecifications
 * @requires HackExamples
 * @requires categories
 * @requires androidExampleCommonFilePath
 * @requires iosExampleCommonFilePath
 * @requires webExampleCommonFilePath
 * @description
 *
 * This is the model for all of the hackathon's api.
 */
.factory('HackApi', function ($q, $http, $log, $filter, HackSpecifications, HackExamples,
    categories, androidExampleCommonFilePath, iosExampleCommonFilePath, webExampleCommonFilePath) {
  function filterByCategories() {
    categories.forEach(function (category) {
      HackApi.apiDataByCategory[category.id] = $filter('category')(HackApi.apiData, category.id);
    });
  }

  function extractExamplesText() {
    var newline = '\n',
        startRegex = /^\s*\/\/ ## START /g,
        endRegex = /^\s*\/\/ ## END /g;

    var i, j, iCount, jCount, platforms, platform, specificationId, exampleCompleteText;

    platforms = ['web', 'android', 'ios'];

    for (i = 0, iCount = platforms.length; i < iCount; i += 1) {
      platform = platforms[i];

      for (j = 0, jCount = HackApi.apiData.length; j < jCount; j += 1) {
        specificationId = HackApi.apiData[j].specification.id;
        exampleCompleteText = HackApi.apiData[j].example[platform].file.text;

        HackApi.apiData[j].example[platform].text =
            extractText(exampleCompleteText, specificationId, platform);
      }
    }

    // Append text that is common to all examples for a platform
    // androidExampleCommonFilePath, iosExampleCommonFilePath, webExampleCommonFilePath
//    exampleCompleteText = ; // TODO: fetch this in examples-service
//    extractText();
    // TODO:

    function extractText(exampleCompleteText, specificationId, platform) {
      var lines, startLineIndex, endLineIndex;

      lines = exampleCompleteText.split(newline);

      // Extract the example from the text
      startLineIndex = findFlag(startRegex, specificationId, lines, 0) + 1;
      endLineIndex = findFlag(endRegex, specificationId, lines, startLineIndex);

      // Ensure the start and end flags are present
      if (startLineIndex >= 0 && endLineIndex >= 0) {
        return lines.slice(startLineIndex, endLineIndex).join(newline);
      } else {
        console.warn('Example not found in file: platform=' + platform +
            ', specificationId=' + specificationId);
        return '// Example forthcoming';
      }
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
  }

  var HackApi = {
    /**
     * @returns {Promise}
     */
    fetchAllApiData: function () {
      return HackSpecifications.getAllSpecificationsData()
          .then(HackExamples.getAllExamplesData)
          .then(function () {
            var apiKey, i;

            i = 0;
            for (apiKey in HackSpecifications.specificationsData) {
              HackApi.apiData[i++] = {
                key: apiKey,
                specification: HackSpecifications.specificationsData[apiKey],
                example: HackExamples.examplesData[apiKey]
              };
            }

            extractExamplesText();
            filterByCategories();
          });
    },
    /**
     * @returns {Promise}
     */
    getAllApiData: function () {
      var deferred = $q.defer();

      if (HackApi.apiData.length > 0) {
        deferred.resolve(HackApi.apiData);
      } else {
        HackApi.fetchAllApiData()
            .then(function () {
              deferred.resolve(HackApi.apiData);
            });
      }

      return deferred.promise;
    },
    apiData: [],
    apiDataByCategory: {}
  };

  return HackApi;
});
