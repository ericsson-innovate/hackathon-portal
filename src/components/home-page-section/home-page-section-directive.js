angular.module('homePageSectionDirective', [])

.constant('homePageSectionTemplatePath', hack.rootPath + '/dist/templates/components/home-page-section/home-page-section.html')

.directive('homePageSection', function (homePageSectionTemplatePath) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@',
      sideBarLinks: '='
    },
    templateUrl: homePageSectionTemplatePath,
    link: function (scope, element, attrs) {
    }
  };
});
