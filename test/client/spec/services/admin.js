'use strict';

describe('Service: admin', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var admin;
  beforeEach(inject(function (_admin_) {
    admin = _admin_;
  }));

  it('should do something', function () {
    expect(!!admin).toBe(true);
  });

});
