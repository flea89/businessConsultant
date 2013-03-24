'use strict';

angular.module('publicApp', ['ngResource', 'ngCookies'])
    .config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/main.html'
    })
        .when('/addCustomer', {
        templateUrl: 'views/addCustomer.html',
        controller: 'AddCustomerCtrl'
    })
        .when('/customerList', {
        templateUrl: 'views/customerList.html',
        controller: 'CustomerListCtrl'
    })
        .when('/modifyCustomer/:id', {
        templateUrl: 'views/addCustomer.html',
        controller: 'ModifyCustomerCtrl'
    })
        .when('/createBill/:id', {
        templateUrl: 'views/createBill.html',
        controller: 'CreateBillCtrl'
    })
        .when('/createBill', {
        templateUrl: 'views/createBill.html',
        controller: 'CreateBillCtrl'
    })
        .when('/administrator/:id', {
        templateUrl: 'views/administrator.html',
        controller: 'AdministratorCtrl'
    })
        .when('/customerDetail/:id', {
        templateUrl: 'views/customerDetail.html',
        controller: 'CustomerDetailCtrl'
    })
        .when('/billDetails/:id', {
        templateUrl: 'views/billDetails.html',
        controller: 'BillDetailsCtrl'
    })
        .when('/billList', {
        templateUrl: 'views/billList.html',
        controller: 'BillListCtrl'
    })
        .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    })
        .otherwise({
        redirectTo: '/'
    });
}).run(function($rootScope, $cookies, $http) {

    $http({
        method: 'GET',
        url: '/user',
    }).success(function(data) {

        if (data.access !== 'denied') {
            $rootScope.user = data;
        }

    });


    



});