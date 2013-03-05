'use strict';

describe('Controller: ProvacontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('publicApp'));

  var ProvacontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller) {
    scope = {};
    ProvacontrollerCtrl = $controller('ProvacontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
