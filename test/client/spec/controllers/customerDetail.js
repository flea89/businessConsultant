'use strict';

describe('Controller: CustomerDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var CustomerDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    CustomerDetailCtrl = $controller('CustomerDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
