'use strict';

describe('Controller: AddCustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('puppaApp'));

  var AddCustomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    AddCustomerCtrl = $controller('AddCustomerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
