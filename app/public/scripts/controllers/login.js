'use strict';

angular.module('publicApp')
    .controller('LoginCtrl', function($scope, $http,$rootScope,$location) {
    $scope.login = function() {
        console.log('prova');
        $http({
            method: 'POST',
            url: '/login',
            data: {
                username: $scope.username,
                password: $scope.password
            }
        }).success(function(data) {
            if (data.access !== 'denied') {
                $rootScope.user = data;
                $location.path('/');
            } else {
                $scope.user = '';
                $scope.password = '';
                $scope.error = 'Incorrect username or password';
            }
        });
    };
});