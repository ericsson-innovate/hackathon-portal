'use strict';

angular.module('apiTryItCardDirective', [])

.constant('apiTryItCardTemplatePath', hack.rootPath + '/dist/templates/components/api-try-it-card/api-try-it-card.html')

/**
 * @ngdoc directive
 * @name apiTryItCard
 * @requires TryItData
 * @requires jsonFilter
 * @requires errorDescriptionFilter
 * @requires emulatorDomain
 * @requires apiTryItCardTemplatePath
 * @requires apiKey
 * @requires authString
 * @param {Object} apiItem
 * @description
 *
 * A panel that contains input areas that enable the user to try out making a single API call.
 */
.directive('apiTryItCard', function (TryItData, jsonFilter, errorDescriptionFilter,
                                     apiTryItCardTemplatePath) {
  return {
    restrict: 'E',
    scope: {
      apiItem: '='
    },
    templateUrl: apiTryItCardTemplatePath,
    link: function (scope, element, attrs) {
      scope.apiItem.tryIt = {};
      scope.apiItem.tryIt.requestBody = '';
      scope.apiItem.tryIt.response = {};

      scope.apiItem.TryItData = TryItData;
      scope.apiItem.tryIt.requestState = 'waiting-to-send';

      scope.$watch('apiItem.TryItData.queryParams', updateUrl, true);
      scope.$watch('apiItem.TryItData.routeParams', updateUrl, true);
      scope.$watch('apiItem.TryItData.emulatorDomain', updateUrl, true);
      scope.$watch('apiItem.TryItData.username', TryItData.updateAuthString, true);
      scope.$watch('apiItem.TryItData.password', TryItData.updateAuthString, true);
      scope.$watch('apiItem.HackApi.currentCard', handleCardChange);

      function updateUrl() {
        var route, i, count, key, value, index;

        route = scope.apiItem.specification.resourceTable['Route'];

        // Handle any query string parameters
        index = route.indexOf('?');
        if (index >= 0) {
          // Strip the query string from the specification route
          route = route.substring(0, index + 1);

          for (i = 0, count = scope.apiItem.specification.parameters.query.length;
               i < count; i += 1) {
            key = scope.apiItem.specification.parameters.query[i];
            value = TryItData.queryParams[key];
            route += key + '=' + (value || 'true') + '&';
          }

          route = route.substring(0, route.length - 1);
        }

        // Handle the route parameters
        for (key in scope.apiItem.specification.parameters.route) {
          value = TryItData.routeParams[key];
          route = route.replace('{' + key + '}', value || '');
        }

        scope.apiItem.tryIt.url = TryItData.emulatorDomain + route;
      }

      function handleCardChange() {
        if (scope.apiItem.HackApi.currentCard === 'try it') {
          fillWithCommonData();
        }
      }

      function fillWithCommonData() {
        // Request body params
        scope.apiItem.tryIt.requestBody = findRequestBody();

        function findRequestBody() {
          var requestBody = '';

          scope.apiItem.specification.examples.forEach(function (example) {
            if (example.type === 'request' && example.body) {
              requestBody = jsonFilter(example.body);
              requestBody = replaceVin(requestBody);
            }
          });

          return requestBody;
        }

        function replaceVin(requestBody) {
          if (TryItData.routeParams['vin']) {
            return requestBody.replace('"vin": "~vin~"', '"vin": "' + TryItData.routeParams['vin'] +'"');
          } else {
            return requestBody;
          }
        }
      }

      scope.reset = function () {
        TryItData.reset();
        fillWithCommonData();
      };

      scope.handleSendRequestClick = function () {
        var xhr, verb;

        verb = scope.apiItem.specification.resourceTable['HTTP Verb'][0];

        xhr = new XMLHttpRequest();

        xhr.addEventListener('load', onLoad, false);
        xhr.addEventListener('error', onError, false);
        xhr.addEventListener('abort', onAbort, false);

        console.log('Sending request to ' + scope.apiItem.tryIt.url);

        xhr.open(verb, scope.apiItem.tryIt.url, true);
        xhr.setRequestHeader('Authorization', TryItData.authString);
        xhr.setRequestHeader('APIKey', TryItData.apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.send(scope.apiItem.tryIt.requestBody);

        scope.apiItem.tryIt.requestState = 'waiting-for-response';
        scope.apiItem.tryIt.response.error = false;
        scope.apiItem.tryIt.response.status = 0;
        scope.apiItem.tryIt.response.body = {};

        function onLoad() {
          console.log('Response status=' + xhr.status + ' (' + xhr.statusText + ')');
          console.log('Response body=' + xhr.response);

          scope.$apply(function () {
            var customStatusText, responseBody;

            customStatusText = errorDescriptionFilter(xhr.status);

            scope.apiItem.tryIt.requestState = 'received-response';
            scope.apiItem.tryIt.response.error =
                parseInt(xhr.status / 100) !== 2 && customStatusText;
            scope.apiItem.tryIt.response.status = xhr.status + ' (' + customStatusText + ')';

            try {
              responseBody = JSON.parse(xhr.response);
              scope.apiItem.tryIt.response.body = responseBody;
              scope.apiItem.tryIt.response.bodyParseError = null;
            } catch (error) {
              responseBody = xhr.response;
              console.warn('Unable to parse response body as JSON: ' + responseBody);
              scope.apiItem.tryIt.response.body = null;
              scope.apiItem.tryIt.response.bodyParseError = responseBody;
            }
          });
        }

        function onError() {
          var message = 'An error occurred while transferring the data';
          console.error(message);

          scope.$apply(function () {
            scope.apiItem.tryIt.requestState = 'error-with-request';
            scope.apiItem.tryIt.response.error = message;
          });
        }

        function onAbort() {
          var message = 'The transfer has been cancelled by the user';
          console.error(message);

          scope.$apply(function () {
            scope.apiItem.tryIt.requestState = 'error-with-request';
            scope.apiItem.tryIt.response.error = message;
          });
        }
      };
    }
  };
});
