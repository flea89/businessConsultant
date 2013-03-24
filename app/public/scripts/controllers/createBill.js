'use strict';

angular.module('publicApp').controller('CreateBillCtrl', function($scope, Admin, Customer, Bill, $routeParams, $route,$rootScope) {
    $scope.bill = {
        customer: {},
        admin: {},
        date: new Date(),
        type: 'professional',
    };
    Bill.setCurrentBillNumber($scope.bill);

    $scope.tasks = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    $scope.limiter = 5;
    $scope.date = new Date();

    $scope.bill.admin = Admin.get({
        id: '5136191f2d2296145b85123a'
    });
    $scope.customers = Customer.query(function(result) {
        Bill.setCurrentBillNumber($scope.bill);
        $scope.bill.customer = result.filter(function(el) {
            return el._id === $routeParams.id;
        })[0];
    });


    $scope.setCustomer = function(customerId) {
        $scope.bill.customer = $scope.customers.filter(function(el) {
            return el._id === customerId;
        })[0];
    };

    $scope.toogleLimit = function() {

        $scope.limiter = $scope.limiter + 5;
    };


    $scope.calculateTotal = function() {
        var ritenuta, totBill, finalPrice, qnt, cost;
        var tot = $scope.tasks.reduce(function(sum, task) {
            if (Number(task.quantity) === Number(task.quantity)) qnt = task.quantity === '' ? 1 : task.quantity;
            else qnt = 1;

            if (Number(task.quantity) === Number(task.quantity)) cost = task.cost;
            else cost = 0;


            return sum + Number(qnt * cost);
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

    $scope.save = function() {
        if ($scope.bill.customer === {} || $scope.bill.customer === undefined){
            alert("Devi inserire un cliente");
            return;
        }

        $rootScope.pBarStatus = 'progress-info';
        $rootScope.pBarActive = 'active';
        $rootScope.pBarVisibility = '';

        $scope.bill.tasks = $scope.tasks.filter(function(e) {
            if (e.quantity !== '' && e.cost !== '' && e.taskName !== '') {
                return true;
            }
            return false;
        });

        Bill.addBill($scope.bill, function(a) {

            if (a.result === 'no') {
                $rootScope.pBarActive = '';
                $rootScope.pBarStatus = 'progress-danger';
                alert('error!!');
            } else {
                $rootScope.pBarActive = '';
                $rootScope.pBarStatus = 'progress-success';
                $route.reload();
            }

            setTimeout(function() {
                $rootScope.pBarVisibility = 'hidden';
                $rootScope.$apply();
            }, 2000);

            $route.reload();

        }, function() {

        });
    };

});