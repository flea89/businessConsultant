'use strict';

describe('Directive: ngEditable', function () {
  beforeEach(module('publicApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-editable></ng-editable>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ngEditable directive');
  }));
});
