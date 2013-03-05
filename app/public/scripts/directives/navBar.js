'use strict';

angular.module('publicAppApp')
  .directive('navBar', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the navBar directive');
      }
    };
  });
