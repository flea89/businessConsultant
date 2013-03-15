'use strict';

describe('Service: persistJS', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var persistJS;
  beforeEach(inject(function (_persistJS_) {
    persistJS = _persistJS_;
  }));

  it('should do something', function () {
    expect(!!persistJS).toBe(true);
  });

});
