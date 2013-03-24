'use strict';

describe('Controller: BillDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var BillDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    BillDetailsCtrl = $controller('BillDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
