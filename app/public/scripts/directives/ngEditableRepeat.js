'use strict';

angular.module('publicApp')
  .directive('cedit', function () {
    return {
      restrict: 'A',
      scope:{
        variable: '='
      },
      link: function postLink(scope, element, attrs) {

        element.bind('blur keyup change', function() {
          scope.$apply(read);
        });

        function read() {
          scope.variable = element.html();
        }

      }
    };
  });
