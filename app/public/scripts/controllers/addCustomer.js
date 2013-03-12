'use strict';

angular.module('publicApp').controller('AddCustomerCtrl', function ($scope,$rootScope,Customer) {
	$scope.success ;
	$scope.user = {type :'private'};
	$scope.addCustomer = function () {
		$rootScope.pBarStatus='progress-info';
		$rootScope.pBarActive='active';

		$rootScope.pBarVisibility = '';
		var JSONuser = JSON.stringify($scope.user);
		$scope.success = Customer.save([], {user: JSONuser},function(a){

			if ( a.result === 'ok'){
				$rootScope.pBarActive='';
				$rootScope.pBarStatus='progress-success';
			}
			else{
				$rootScope.pBarActive='';
				$rootScope.pBarStatus='progress-danger';
				alert('error!!');
			}

			setTimeout(function(){
				$rootScope.pBarVisibility ='hidden';
				$rootScope.$apply();
			},2000);

		});
		// $http.post('http://localhost:3000/users',{user: JSON.stringify($scope.user)}).success(function (data) {
		
		// 	$scope.success = data;
		// });
	};
});