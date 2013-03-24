'use strict';

describe('Directive: navbarselection', function () {
  beforeEach(module('publicApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<navbarselection></navbarselection>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the navbarselection directive');
  }));
});
