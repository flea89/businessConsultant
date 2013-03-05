'use strict';

describe('Filter: upper', function () {

  // load the filter's module
  beforeEach(module('puppaApp'));

  // initialize a new instance of the filter before each test
  var upper;
  beforeEach(inject(function ($filter) {
    upper = $filter('upper');
  }));

  it('should return the input prefixed with "upper filter:"', function () {
    var text = 'angularjs';
    expect(upper(text)).toBe('upper filter: ' + text);
  });

});
