'use strict';

angular.module('publicApp')
    .controller('CustomerListCtrl', function ($scope, $location, Customer, $route) {
    var allCustomers;
    $scope.customers = Customer.query();
    $scope.query = {
        type: 'all'
    };
    $scope.getCustomers = function () {
    	var customersType = $scope.query.type;

        var selectPrivate = function (el) {
            if (!el.hasOwnProperty('type')) {
                return;
            }
            return el.type === 'private';
        };
        var selectProfessional = function (el) {
            if (!el.hasOwnProperty('type')) {
                return false;
            }
            return el.type === 'professional';
        };

        if (customersType === 'all' || (customersType !== 'private' && customersType !== 'professional') ) {
            return $scope.customers;
        }

        return customersType === 'private' ? $scope.customers.filter(selectPrivate) : $scope.customers.filter(selectProfessional);

    };

    $scope.linkModify = function (id) {
        $location.path('modifyCustomer/' + id);
    };
    $scope.createBill = function (id) {
        $location.path('createBill/' + id);
    };

    $scope.deleteCustomer = function (id) {
        var progressBar = $('.progress');
        progressBar.removeClass('hidden');
        Customer.delete({
            id: id
        }, function (a) {
            if (a.result === 'ok') {
                progressBar.removeClass('progress-info');
                progressBar.removeClass('active');
                progressBar.addClass('progress-success');
                $scope.customers = Customer.query();
            } else {
                progressBar.addClass('danger-success');
                alert('error!!');
            }

            setTimeout(function () {
                progressBar.removeClass('progress-success');
                progressBar.removeClass('danger-success');
                progressBar.addClass('hidden');
                progressBar.addClass('progress-info');
                progressBar.addClass('active');
            }, 2000);
        });
        
    };
});
