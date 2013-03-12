'use strict';

describe('Service: billHandler', function () {

  // load the service's module
  beforeEach(module('publicApp'));

  // instantiate service
  var billHandler;
  beforeEach(inject(function (_billHandler_) {
    billHandler = _billHandler_;
  }));

  it('should do something', function () {
    expect(!!billHandler).toBe(true);
  });

});
