'use strict';

angular.module('apiTryItCardDirective', [])

.constant('apiTryItCardTemplatePath', hack.rootPath + '/dist/templates/components/api-try-it-card/api-try-it-card.html')

/**
 * @ngdoc directive
 * @name apiTryItCard
 * @requires jsonFilter
 * @requires errorDescriptionFilter
 * @requires emulatorUrl
 * @requires apiTryItCardTemplatePath
 * @requires apiKey
 * @requires authString
 * @param {Object} apiItem
 * @description
 *
 * A panel that contains input areas that enable the user to try out making a single API call.
 */
.directive('apiTryItCard', function (jsonFilter, errorDescriptionFilter, emulatorUrl,
                                     apiTryItCardTemplatePath, apiKey, authString) {
  return {
    restrict: 'E',
    require: '^apiListItem',
    scope: {
      apiItem: '='
    },
    templateUrl: apiTryItCardTemplatePath,
    link: function (scope, element, attrs, apiListItemCtrl) {
      scope.apiItem.tryIt = {};
      scope.apiItem.tryIt.parameters = {};
      scope.apiItem.tryIt.parameters.route = {};
      scope.apiItem.tryIt.parameters.query = {};
      scope.apiItem.tryIt.parameters.requestBody = '';
      scope.apiItem.tryIt.response = {};

      scope.apiItem.tryIt.requestState = 'waiting-to-send';

      scope.$watch('apiItem.tryIt.parameters.route', updateUrl, true);
      scope.$watch('apiItem.tryIt.parameters.query', updateUrl, true);

      function updateUrl() {
        var route, i, count, key, index;

        route = scope.apiItem.specification.resourceTable['Route'];

        // Handle any query string parameters
        index = route.indexOf('?');
        if (index >= 0) {
          // Strip the query string from the specification route
          route = route.substring(0, index + 1);

          for (i = 0, count = scope.apiItem.specification.parameters.query.length;
               i < count; i += 1) {
            key = scope.apiItem.specification.parameters.query[i];
            route += key + '=' + (scope.apiItem.tryIt.parameters.query[key] || 'true') + '&';
          }

          route = route.substring(0, route.length - 1);
        }

        // Handle the route parameters
        for (key in scope.apiItem.specification.parameters.route) {
          route = route.replace('{' + key + '}', scope.apiItem.tryIt.parameters.route[key] || '');
        }

        scope.apiItem.tryIt.url = emulatorUrl + route;
      }

      scope.reset = function () {
        var key;

        for (key in scope.apiItem.specification.parameters.route) {
          scope.apiItem.tryIt.parameters.route[key] = generateRandomId();
        }

        for (key in scope.apiItem.specification.parameters.query) {
          scope.apiItem.tryIt.parameters.query[key] = generateRandomBoolean();
        }

        scope.apiItem.tryIt.parameters.requestBody = findRequestBody();

        function generateRandomId() {
          return '' + parseInt(Math.random() * 10000000000);
        }

        function generateRandomBoolean() {
          return '' + (Math.random() < 0.5);
        }

        function findRequestBody() {
          var requestBody = '';

          scope.apiItem.specification.examples.forEach(function (example) {
            if (example.type === 'request' && example.body) {
              requestBody = jsonFilter(example.body);
            }
          });

          return requestBody;
        }
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
        xhr.setRequestHeader('Authorization', authString);
        xhr.setRequestHeader('APIKey', apiKey);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(scope.apiItem.tryIt.parameters.requestBody);

        scope.apiItem.tryIt.requestState = 'waiting-for-response';
        scope.apiItem.tryIt.response.error = false;
        scope.apiItem.tryIt.response.status = 0;
        scope.apiItem.tryIt.response.body = {};

        function onLoad() {
          console.log('Response status=' + xhr.status + ' (' + xhr.statusText + ')');
          console.log('Response body=' + xhr.response);

          scope.$apply(function () {
            var customStatusText = errorDescriptionFilter(xhr.status);
            scope.apiItem.tryIt.requestState = 'received-response';
            scope.apiItem.tryIt.response.error =
                parseInt(xhr.status / 100) !== 2 && customStatusText;
            scope.apiItem.tryIt.response.status = xhr.status + ' (' + customStatusText + ')';
            scope.apiItem.tryIt.response.body = JSON.parse(xhr.response);
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
