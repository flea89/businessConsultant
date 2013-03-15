'use strict';

describe('Controller: TestDbCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var TestDbCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    TestDbCtrl = $controller('TestDbCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
