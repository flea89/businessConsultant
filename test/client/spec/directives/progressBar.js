'use strict';

describe('Directive: progressBar', function () {
  beforeEach(module('publicApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<progress-bar></progress-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the progressBar directive');
  }));
});
