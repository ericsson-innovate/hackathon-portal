angular.module('shortHeaderDirective', [])

.constant('shortHeaderTemplatePath', document.baseURI + '/dist/templates/components/short-header/short-header.html')

.directive('shortHeader', function (shortHeaderTemplatePath) {
  return {
    restrict: 'E',

    scope: {
    },

    templateUrl: shortHeaderTemplatePath,

    link: function (scope, element, attrs) {
    }
  };
});
