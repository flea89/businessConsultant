'use strict';

angular.module('publicApp')
  .controller('CustomerDetailCtrl', function ($scope,Customer,$routeParams,$location) {

    $scope.customer = Customer.get({id: $routeParams.id});

    $scope.linkModify = function () {
        $location.path('modifyCustomer/' + $scope.customer._id);
    };
  });
