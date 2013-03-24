'use strict';

describe('Controller: BillListCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var BillListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    BillListCtrl = $controller('BillListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
