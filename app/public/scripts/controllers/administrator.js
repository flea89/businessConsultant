'use strict';

angular.module('publicApp')
  .controller('AdministratorCtrl', function ($scope,Admin,$routeParams) {
  $scope.admin = Admin.get({id: $routeParams.id});


    $scope.modifyCustomer = function(){
            var JSONadmin = JSON.stringify($scope.admin);
            Admin.update ({
                    id: $routeParams.id,
                    admin: JSONadmin
                });
            };

            // $http.put('http://localhost:3000/users/'+$routeParams.id,{user: JSON.stringify($scope.user)}).success(function (data) {
            //  $('.progress').addClass('hidden');
            //  $scope.success = data;
            // });
  });
