'use strict';

angular.module('publicApp').factory('gStorage', function (Customer, Bill, lStorage,$rootScope) {
  var resources = {
    customer: Customer,
    bill: Bill
  };

    window.addEventListener('online', function () {



  gStorage.sync('customer', function () {
      alert('mi sono sincronizzato i customer');

      gStorage.sync('bill', function () {
        alert('mi sono sincronizzato le fattue');
      });
    });

  });

  var gStorage = {
    getLastSync: function (resourceName, callback) {
      lStorage.getLastSync(resourceName).then(function (max) {
        callback(max);
      });
    },

    getChanges: function (resourceName, modifiedSince, callback) {
      var customers = resources[resourceName].getChanges({
        modifiedSince: modifiedSince
      }, function (response) {
        if (response.result !== 'ok') {
          callback(response);
        } else {
          alert("bad request");
        }
      }, function (response) {
        alert("check your connection");
      });

    },
    applyChanges: function (response, callback, resourceName) {
      lStorage.addToCollection(resourceName, response).then(function () {
        callback(response);

      });
    },

    sync: function (resourceName, callback) {
      var self = this;
      this.getLastSync(resourceName, function (lastSync) {
        self.getChanges(resourceName, lastSync, function (changes) {
          self.applyChanges(changes, callback, resourceName);
        });
      });
    },
    deleteLocalStorage : function (resourceName) {
      lStorage.emptyCollection(resourceName).then(function () {
        alert('removed ' + resourceName);
      });
    }
  };



  var apis = {
    getCollection: function (resourceName) {
      var array = [];
      if (window.navigator.onLine) {
        gStorage.sync(resourceName, function () {
          var a = 1;
          lStorage.getLocalCollection(resourceName).then(function (data) {
                data.forEach(function(e){
                  array.push(e.toJSON());
                });
                $rootScope.$digest();
          });
        });
      } else {
        lStorage.getLocalCollection(resourceName).then(function (data) {
                data.forEach(function(e){
                  array.push(e);
                });
                $rootScope.$digest();
        });
      }
      return array;
    },
    getItem : function(resourceName,id){
      var item = {};
      if (window.navigator.onLine) {
        gStorage.sync(resourceName, function () {     
          lStorage.getLocalItem(resourceName,id).then(function (data) {
                angular.extend(item,data[0].toJSON());
                $rootScope.$apply();
          }); 
        });
      } else {
        lStorage.getLocalItem(resourceName,id).then(function (data) {
                angular.extend(item,data[0]);
        });
      }
      return item;

    }

  };

  return {
    syncObj: gStorage,
    getCollection: apis.getCollection,
    getItem: apis.getItem
  };

});