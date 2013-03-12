'use strict';

describe('Service: customer', function () {

    // load the service's module
    beforeEach(module('publicApp'));

    // instantiate service
    var customer;
    beforeEach(inject(function (Customer) {
        customer = Customer;
    }));

    it('should be a resource object', function () {
        expect(customer.get).toBeDefined();
        expect(customer.save).toBeDefined();
        expect(customer.query).toBeDefined();
        expect(customer.remove).toBeDefined();
        expect(customer.update).toBeDefined();
    });

});
