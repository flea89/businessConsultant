'use strict';

describe('Controller: ModifyCustomerCtrl', function () {

    // load the controller's module
    beforeEach(module('publicApp'));

    var ModifyCustomerCtrl,
    scope, httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, _$httpBackend_) {
        scope = {};
        httpBackend = _$httpBackend_;
        httpBackend.expectGET('/users/12345').respond({
            id: '12345',
            type: 'private'
        });
        ModifyCustomerCtrl = $controller('ModifyCustomerCtrl', {
            $scope: scope,
            $routeParams: {
                id: '12345'
            },
        });
    }));

    it('should attach a single user to the scope', function () {
        httpBackend.flush();
        expect(scope.user).toBeDefined();
        expect(Array.isArray(scope.user)).toBe(false);
    });
});
