'use strict';

angular.module('publicApp')
  .controller('TestDbCtrl', function ($scope,gStorage) {
    $scope.sync = function(){
        gStorage.syncObj.sync('customer' , function(){
            alert ('mi sono sincronizzato');
            gStorage.syncObj.sync('bill',function(){
            alert ('mi sono sincronizzato le fattue');
      });
        });

    };

    $scope.remove = function(){

        gStorage.deleteLocalStorage($scope.resource);
    };
    

  });
