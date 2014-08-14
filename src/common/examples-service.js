'use strict';

angular.module('hackExamplesService', [])

/**
 * @ngdoc service
 * @name HackExamples
 * @requires $q
 * @requires $http
 * @requires $log
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
.factory('HackExamples', function ($q, $http, $log, HackSpecifications, dataPath, apiList,
                                   androidExampleUrl, iosExampleUrl, webExampleUrl) {
  var HackExamples = {
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
        url = platform === 'android' ? androidExampleUrl : platform === 'ios' ? iosExampleUrl :
            webExampleUrl;
        url += HackSpecifications.specificationsData[apiName].codeExamples[platform];

        // Make sure the example object exists
        HackExamples.examplesData[apiName] = HackExamples.examplesData[apiName] ?
            HackExamples.examplesData[apiName] : {};

        HackExamples.examplesData[apiName][platform] = {
          file: {
            url: url,
            text: ''
          },
          text: ''
        };

        if (HackExamples.fileCache[url]) {
          HackExamples.examplesData[apiName][platform].file.text = HackExamples.fileCache[url];
        } else {
          return $http.get(url)
              .then(function (response) {
                HackExamples.fileCache[url] = response.data;
                HackExamples.examplesData[apiName][platform].file.text = response.data;
              });
        }
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
    fileCache: {},
    examplesData: {}
  };

  return HackExamples;
});
