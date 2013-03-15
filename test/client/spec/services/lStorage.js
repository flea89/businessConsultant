'use strict';

describe('Service: lStorage', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var lStorage;
  beforeEach(inject(function (_lStorage_) {
    lStorage = _lStorage_;
  }));

  it('should do something', function () {
    expect(!!lStorage).toBe(true);
  });

});
