'use strict';

angular.module('publicApp').factory('lStorage', function (jaydata) {

  Array.prototype.max = function (propertyName) {
    if (this.length === 0) return 0;
    return Math.max.apply(Math, this.map(function (o) {
      return o[propertyName];
    }))
  };

  // var getItem = function(resourceName,id){
  //   var collectionArray = JSON.parse(store.get(resourceName));
  //   return collectionArray.filter(function(e){
  //     return e._id === id;
  //   })
  // };
  var getCollection = function (resourceName) {
      return jaydata.then(function (jaydataContext) {
        return jaydataContext[resourceName].filter(function () {
          return true;
        }).toArray();
      });
    };


  var getLastSync = function (resourceName) {

      return jaydata.then(function (jaydataContext) {
        var promise = jaydataContext[resourceName].filter(function () {
          return true;
        }).toArray();
        return promise.then(function (result) {
          return result.max('sync');
        });

      });
    };

  var addToCollection = function (resourceName, array) {
      var newArray = [];
      var idArray = [];
      array.forEach(function (e) {
        newArray.push(new $org.types[resourceName](e));
        idArray.push(new $org.types[resourceName]({
          _id: e._id
        }));
      });


      return jaydata.then(function (jaydataContext) {
        idArray.forEach(function (e) {
          var a = jaydataContext[resourceName].remove(e);
        });
        jaydataContext.addMany(newArray);
        jaydataContext.saveChanges();
      });

    };


  var emptyCollection = function (resourceName) {
      return jaydata.then(function (jaydataContext) {
        var promise = jaydataContext[resourceName].filter(function () {
          return true;
        }).toArray();

        return promise.then(function (result) {

          result.forEach(function (el) {
            jaydataContext.remove(el);
          });
          jaydataContext.saveChanges();

        });

      });

    };


  return {
    getLocalCollection: getCollection,
    getLastSync: getLastSync,
    addToCollection: addToCollection,
    emptyCollection: emptyCollection
  };

  // var deleteItem = function(collection){
  // };
  // var modifyItem = function(collection){
  // };
});