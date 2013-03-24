'use strict';

angular.module('publicApp')
    .controller('BillListCtrl', function($scope, Bill, $location, $rootScope) {
    $scope.bills = (function() {
        var bills = [];
        $rootScope.pBarStatus = 'progress-info';
        $rootScope.pBarActive = 'active';
        $rootScope.pBarVisibility = '';

        Bill.queryAll(function(res) {
            $rootScope.pBarVisibility = 'hidden';
            res.forEach(function(e){
                bills.push(e);
            });

        }, function() {

        });
        return bills;
    }());

    $scope.detail = function(id) {
        $location.path('billDetails/' + id);
    };
});