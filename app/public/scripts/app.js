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

    Array.prototype.remove = function(objId){
        var that = this;
        this.map(function(el,index){
            if (el._id === objId){
                that.splice(index);
            }
        });
    };

    Array.prototype.modifyElementById = function(obj){
        var that = this;
        this.map(function(el,index){
            if ( el._id === obj._id){
                that[index] = obj;
            }
        });
    };


    Array.prototype.max = function(propertyName) {
        if (this.length === 0) return 0;
        return Math.max.apply(Math, this.map(function(o) {
            return o[propertyName];
        }));
    };

    $http({
        method: 'GET',
        url: '/user',
    }).success(function(data) {

        if (data.access !== 'denied') {
            $rootScope.user = data;
        }

    });


    



});