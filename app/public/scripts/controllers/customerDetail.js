'use strict';

angular.module('publicApp')
    .controller('CustomerDetailCtrl', function($scope, Customer, $routeParams, $location, Bill) {
    $scope.customer = Customer.get({
        id: $routeParams.id
    }, function() {
        $scope.customer.bills = Bill.resource.query({
            bill: JSON.stringify({
                'customer._id': $scope.customer._id
            })
        }, function(results) {
            console.log(results);
        }, function() {
            console.log("fail");
        });

    });

    

    $scope.linkModify = function() {
        $location.path('modifyCustomer/' + $scope.customer._id);
    };

    $scope.detail = function(id){
        $location.path('billDetails/' + id);
    };
});