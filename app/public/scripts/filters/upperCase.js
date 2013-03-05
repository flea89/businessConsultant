'use strict';

angular.module('publicApp')
  .filter('upperCase', function () {
    return function (input) {
      return 'upperCase filter: ' + input;
    };
  });
