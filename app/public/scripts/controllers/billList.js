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

    $scope.deleteBill = function(id){
        var progressBar = $('.progress');
        progressBar.removeClass('hidden');
        Bill.deleteBill(id,
         function (a) {
            if (a.result === 'ok') {
                progressBar.removeClass('progress-info');
                progressBar.removeClass('active');
                progressBar.addClass('progress-success');
                $scope.bills = Bill.resource.query();
            } else {
                progressBar.addClass('danger-success');
                alert('error!!');
            }

            setTimeout(function () {
                progressBar.removeClass('progress-success');
                progressBar.removeClass('danger-success');
                progressBar.addClass('hidden');
                progressBar.addClass('progress-info');
                progressBar.addClass('active');
            }, 2000);
        });

    };
});