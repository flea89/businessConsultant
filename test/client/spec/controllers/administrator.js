'use strict';

describe('Controller: AdministratorCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var AdministratorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    AdministratorCtrl = $controller('AdministratorCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
