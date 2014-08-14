'use strict';

angular.module('specificationsService', [])

/**
 * @ngdoc service
 * @name HackSpecifications
 * @requires $q
 * @requires $http
 * @requires $log
 * @requires dataPath
 * @requires specificationUrl
 * @description
 *
 * This is the model for all of the hackathon's specifications.
 */
.factory('HackSpecifications', function ($q, $http, $log, dataPath, specificationUrl) {
  var HackSpecifications = {
    /**
     * @returns {Promise}
     */
    fetchAllSpecificationsData: function () {
      return $http.get(specificationUrl)
          .then(function (response) {
            var i, count;

            for (i = 0, count = response.data.length; i < count; i += 1) {
              HackSpecifications.specificationsData[response.data[i].id] = response.data[i];
            }

            HackSpecifications.allDataHasBeenFetched = true;
          });
    },
    /**
     * @returns {Promise}
     */
    getAllSpecificationsData: function () {
      var deferred = $q.defer();

      if (HackSpecifications.allDataHasBeenFetched) {
        deferred.resolve(HackSpecifications.specificationsData);
      } else {
        HackSpecifications.fetchAllSpecificationsData()
            .then(function () {
              deferred.resolve(HackSpecifications.specificationsData);
            });
      }

      return deferred.promise;
    },
    allDataHasBeenFetched: false,
    specificationsData: {}
  };

  return HackSpecifications;
});
