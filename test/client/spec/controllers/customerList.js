'use strict';

describe('Controller: CustomerListCtrl', function () {

    //load the controller's module
    beforeEach(module('publicApp'));

    var CustomerListCtrl,
    scope, httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_) {
        scope = {};
        httpBackend = _$httpBackend_;
        httpBackend.expectGET('/users').respond(200, [{
            type: 'private',
        }, {
            type: 'private'
        }, {
            type: 'private'
        }, {
            type: 'private'
        }, {
            type: 'private'
        }, {
            type: 'professional'
        }, {
            type: 'professional'
        }, {
            type: 'professional'
        }, {
            type: 'professional'
        },{
            type: 'dummy'
        },{
            type: 'dummy'
        },{
            type: 'dummy'
        }, ]);
        CustomerListCtrl = $controller('CustomerListCtrl', {
            $scope: scope
        });
    }));

    it('should attach a list of things to the scope', function () {
        expect(scope.customers).toBeDefined();

        expect(scope.query).toBeDefined();
        expect(scope.query).toEqual({
            type: 'all'
        });

        expect(scope.getCustomers).toBeDefined();
        expect(scope.linkModify).toBeDefined();
        expect(scope.deleteCustomer).toBeDefined();
    });

    describe('$scope.getCustomer function', function () {
        beforeEach(function () {
            httpBackend.flush();
        });
        it('should return a list of customers', function () {
            var customers = scope.getCustomers();
            expect(customers).toBeDefined();
            expect(Array.isArray(customers)).toBe(true);
            expect(customers).toBe(scope.customers);
        });

        it('should filter private customers', function () {
            scope.query.type = 'private';
            var customers = scope.getCustomers();
            expect(Array.isArray(customers)).toBe(true);
            expect(customers.length).toBe(5);
        });

        it('should filter professional customers', function () {
            scope.query.type = 'professional';
            var customers = scope.getCustomers();
            expect(Array.isArray(customers)).toBe(true);
            expect(customers.length).toBe(4);
        });


        it('should filter customers with wrong type', function () {
            scope.query.type = 'dummy';
            var customers = scope.getCustomers();
            expect(Array.isArray(customers)).toBe(true);
            expect(customers).toBe(scope.customers);
        });
    });


});
