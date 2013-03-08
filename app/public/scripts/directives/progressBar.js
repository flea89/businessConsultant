'use strict';

angular.module('publicApp')
  .directive('progressbar', function () {
    return {
        restrict: 'E',
        scope: {
            show: '=',
            status: '=',
            active: '='
        },
		template: '<div class="progress progress-striped {{active}} fixedprogress {{status}} {{show}} ">' +
				'<div class="bar" style="width: 100%;"></div>' +
				'</div>',

        link: function postLink(scope, element, attrs) {
        }
    };
  });
