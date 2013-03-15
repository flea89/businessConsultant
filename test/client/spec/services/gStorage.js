'use strict';

describe('Service: gStorage', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var gStorage;
  beforeEach(inject(function (_gStorage_) {
    gStorage = _gStorage_;
  }));

  it('should do something', function () {
    expect(!!gStorage).toBe(true);
  });

});
