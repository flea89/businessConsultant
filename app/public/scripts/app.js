'use strict';

angular.module('publicApp',['ngResource'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
        templateUrl: 'views/modifyCustomer.html',
        controller: 'ModifyCustomerCtrl'
      })
      .when('/createBill', {
        templateUrl: 'views/createBill.html',
        controller: 'CreateBillCtrl'
      })
      .when('/administrator/:id', {
        templateUrl: 'views/administrator.html',
        controller: 'AdministratorCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
