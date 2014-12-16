angular.module('sectionTitleToStateIdFilter', [])

.filter('sectionTitleToStateId', function () {
  return function (input) {
    return input.toLowerCase().replace(' ', '-').replace(/\W/, '');
  }
});
