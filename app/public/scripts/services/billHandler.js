'use strict';

angular.module('publicApp')
    .factory('Bill', function($resource, $rootScope) {
    var bill = $resource('/bills/:id', {
        id: '@id'
    }, {
        update: {
            method: 'PUT',
        }
    });

    Array.prototype.max = function(propertyName) {
        if (this.length === 0) return 0;
        return Math.max.apply(Math, this.map(function(o) {
            return o[propertyName];
        }));
    };

    var bills = [];

    var queryAll = function(callbackSucc, callbackError) {

        if (bills.length !== 0) {
            callbackSucc(bills);
            return bills;
        } else {
            bills = bill.query({}, function(result) {
                callbackSucc(result);
            }, function(result) {
                callbackError(result);
            });
            return bills;
        }
    };
    var addBill = function(obj, callbackSucc, callbackError) {
        var JSONbill = angular.toJson(obj);
        bill.save([], {
            bill: JSONbill
        }, function(res) {
            bills.push(res);
            callbackSucc(res);
        }, function(res) {
            callbackError(res);
        });

    };


    var setCurrentBillNumber = function(bill) {
        var max = {}, a = {};
        if (bills.length === 0) {
            queryAll(function(res) {
                if (res.length === 0) {
                    bill.number = 1;
                } else {
                    bill.number = bills.max('number') + 1;
                }
            }, function(res) {
                alart ('error')
            });
        } else {
            bill.number = bills.max('number') + 1;
        }
    };

    var deleteBill = function (id, succ, error){
        var index;
        bill.delete({
            id: id
        },function(data){
            console.log(bills);
            bills.remove(id);
            succ(data)
        },
        function(){
            error(data);
        });
    };


    return {
        resource: bill,
        deleteBill: deleteBill,
        queryAll: queryAll,
        setCurrentBillNumber: setCurrentBillNumber,
        addBill: addBill
    };
});