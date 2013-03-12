'use strict';

describe('Directive: ngEditableRepeat', function () {
  beforeEach(module('publicApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<ng-editable-repeat></ng-editable-repeat>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the ngEditableRepeat directive');
  }));
});
