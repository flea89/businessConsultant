'use strict';

angular.module('publicApp')
  .controller('ModifyCustomerCtrl', function ($scope,$routeParams,Customer,gStorage) {
 //    $http.get('http://localhost:3000/users/' + $routeParams.id).success(function (data) {
	// $scope.user = data;
	// });+
  $scope.user = gStorage.getItem('customer',$routeParams.id);
  setTimeout(function(){
    console.log($scope.user);
  },1000);

    $scope.modifyCustomer = function(){
        var JSONuser = JSON.stringify($scope.user);
        $('.progress').removeClass('hidden');
        Customer.update ({
          id: $routeParams.id,
          user: JSONuser
        },
        function(){
          $('.progress').addClass('hidden');
        });

			// $http.put('http://localhost:3000/users/'+$routeParams.id,{user: JSON.stringify($scope.user)}).success(function (data) {
			// $('.progress').addClass('hidden');
			// $scope.success = data;
			// });
	};


  });
