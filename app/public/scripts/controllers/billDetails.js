'use strict';

angular.module('publicApp')
    .controller('BillDetailsCtrl', function($scope, Bill, $routeParams,$location) {

    $scope.tasks = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

    $scope.bill = Bill.resource.get({
        id: $routeParams.id
    }, function(bill) {
        console.log(bill);
        bill.tasks.forEach(function(el, i) {
            angular.extend($scope.tasks[i], el);
        });
    });

    $scope.calculateTotal = function() {
        var ritenuta, totBill, finalPrice;
        var tot = $scope.tasks.reduce(function(sum, task) {
            return sum + Number(task.quantity * task.cost);
        }, 0);

        if ($scope.bill.type === 'private') {
            finalPrice = tot + 1.81;

            return {
                totBill: tot,
                finalPrice: finalPrice,
                ritenuta: 0
            };

        }

        ritenuta = tot * 0.2;
        totBill = tot - ritenuta;
        finalPrice = totBill + 1.81;
        $scope.bill.tot = totBill;
        $scope.bill.finalPrice = finalPrice;
        $scope.bill.ritenuta = ritenuta;


        return {
            totBill: totBill,
            finalPrice: finalPrice,
            ritenuta: ritenuta
        };
    };

    $scope.modify = function() {
        $scope.bill.tasks = $scope.tasks.filter(function(e) {
            if (e.quantity !== '' && e.cost !== '' && e.taskName !== '') {
                return true;
            }
            return false;
        });
        var JSONObj = angular.toJson($scope.bill);
        Bill.updateBill($scope.bill, function() {
            $location.path('/billList');
        }, function() {

        });
    };

});