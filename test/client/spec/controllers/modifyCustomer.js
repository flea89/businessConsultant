'use strict';

describe('Controller: ModifyCustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var ModifyCustomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    ModifyCustomerCtrl = $controller('ModifyCustomerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
