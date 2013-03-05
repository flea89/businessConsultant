'use strict';

describe('Directive: navBar', function () {
  beforeEach(module('publicAppApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<nav-bar></nav-bar>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the navBar directive');
  }));
});
