'use strict';

describe('Service: barbero', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var barbero;
  beforeEach(inject(function (_barbero_) {
    barbero = _barbero_;
  }));

  it('should do something', function () {
    expect(!!barbero).toBe(true);
  });

});
