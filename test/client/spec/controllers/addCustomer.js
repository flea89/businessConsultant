'use strict';

describe('Controller: AddCustomerCtrl', function () {

    // load the controller's module
    beforeEach(module('publicApp'));


    var AddCustomerCtrl,
    scope, rootScope, httpBackend,
    alert;

    // Initialize the controller and a mock scope

    beforeEach(inject(function ($controller, _$httpBackend_, $rootScope) {
        scope = {

        };
        rootScope = $rootScope;
        httpBackend = _$httpBackend_;
        alert = spyOn(window, 'alert');
        AddCustomerCtrl = $controller('AddCustomerCtrl', {
            $scope: scope,
            // $rootScope: $rootScope,
            // Customer: Customer
        });
    }));

    it('should attach an addCustomer function to the scope ', function () {
        expect(scope.addCustomer).toBeDefined();
        expect(typeof scope.addCustomer).toBe('function');
        expect(scope.user).toBeDefined();
    });

    it('should attach a user selector to the scope', function () {
        expect(scope.user).toBeDefined();
        expect(typeof scope.user).toBe('object');
        expect(scope.user).toEqual({type:'private'});
    });

    describe('$scope.addCustomer function', function () {
        it('should set some $rootScope property when result is ok', function () {
            httpBackend.expectPOST('/users').
            respond({
                result: 'ok'
            });

            scope.addCustomer();
            httpBackend.flush();
            expect(rootScope.pBarActive).toBe('');
            expect(rootScope.pBarVisibility).toBe('');
            expect(rootScope.pBarStatus).toBe('progress-success');
        });

        it('should set some $rootScope property when result isn\'t ok', function () {
            httpBackend.expectPOST('/users').
            respond({
                result: 'error'
            });

            scope.addCustomer();
            httpBackend.flush();
            expect(rootScope.pBarActive).toBe('');
            expect(rootScope.pBarStatus).toBe('progress-danger');
            expect(alert).toHaveBeenCalled();
        });

        it('Should set the visibility to hidden after 2secs', function () {
            jasmine.Clock.useMock();
            httpBackend.expectPOST('/users').
            respond({
                result: 'ok'
            });
            scope.addCustomer();
            httpBackend.flush();
            expect(rootScope.pBarVisibility).toBe('');
            jasmine.Clock.tick(2001);
            expect(rootScope.pBarVisibility).toBe('hidden');

        });
    });
});
