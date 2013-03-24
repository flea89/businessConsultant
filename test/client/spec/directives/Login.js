'use strict';

describe('Directive: Login', function () {
  beforeEach(module('publicApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<-login></-login>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the Login directive');
  }));
});
