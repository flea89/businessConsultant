'use strict';

angular.module('publicApp').controller('CreateBillCtrl', function ($scope, Admin, Customer, Bill) {
    $scope.bill = {
        customer: {},
        admin: {},
        type: 'professional'
    };
    $scope.tasks = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    $scope.limiter = 5;
    $scope.date = new Date();


    $scope.bill.admin = Admin.get({
        id: '5136191f2d2296145b85123a'
    });
    $scope.customers = Customer.query();


    $scope.setCustomer = function (customerId) {
        $scope.bill.customer = $scope.customers.filter(function (el) {
            return el._id === customerId;
        })[0];

    };

    $scope.toogleLimit = function () {

        $scope.limiter = $scope.limiter + 5;
    };


    $scope.calculateTotal = function () {
        var ritenuta , totBill,finalPrice;
        var tot = $scope.tasks.reduce(function (sum, task) {
            return sum + Number(task.quantity * task.cost);
        }, 0);

        if ( $scope.bill.type === 'private'){
            finalPrice = tot + 1.81;

            return {
                totBill: tot,
                finalPrice: finalPrice,
                ritenuta: 0
            }

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

    $scope.save = function () {
        $scope.bill.tasks = $scope.tasks.filter(function (e) {
            if (e.quantity !== '' && e.cost !== '' && e.taskName !== '') {
                return true;
            }
            return false;
        });
        var JSONbill = angular.toJson($scope.bill);
        Bill.save([], {
            bill: JSONbill
        }, function (a) {

        });
    };

});