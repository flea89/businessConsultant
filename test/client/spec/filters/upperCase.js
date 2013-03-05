'use strict';

describe('Filter: upperCase', function () {

  // load the filter's module
  beforeEach(module('puppaApp'));

  // initialize a new instance of the filter before each test
  var upperCase;
  beforeEach(inject(function ($filter) {
    upperCase = $filter('upperCase');
  }));

  it('should return the input prefixed with "upperCase filter:"', function () {
    var text = 'angularjs';
    expect(upperCase(text)).toBe('upperCase filter: ' + text);
  });

});
