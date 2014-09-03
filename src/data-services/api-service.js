'use strict';

angular.module('apiService', [])

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
 * @description
 *
 * This is the model for all of the hackathon's api.
 */
.factory('HackApi', function ($q, $http, $log, $filter, HackSpecifications, HackExamples,
                              categories) {
  function filterByCategories() {
    categories.forEach(function (category) {
      HackApi.apiDataByCategory[category.id] = $filter('category')(HackApi.apiData, category.id);
    });
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
                example: HackExamples.examplesData[apiKey],
                ref: apiKey.replace(/\./g, "_")
              };
            }

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
    apiDataByCategory: {},
    currentCard: 'specification'
  };

  return HackApi;
});
