'use strict';

angular.module('publicApp', [])
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
      .otherwise({
        redirectTo: '/'
      });
  });
