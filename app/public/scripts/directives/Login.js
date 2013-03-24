'use strict';

angular.module('publicApp')
    .directive('login', function($http, $rootScope,$location) {
    return {
        restrict: 'A',
        scope: {

        },
        template: '<a  id="login" class="" data-toggle="popover" data-placement="bottom" >' + '<i class="icon-user "></i> <span class="loginInfo">{{logInfo}}</span></a>',
        link: function postLink(scope, element, attrs) {

            $('body').on('click', '.popover .btn', function(event, element) {
                event.preventDefault();
                if (event.currentTarget.id === 'logoutSubmit') {
                    $http({
                        method: 'GET',
                        url: '/logout',
                    }).success(function(data) {
                        if (data.access === 'denied') {
                            $rootScope.user = undefined;
                            $location.path("/");

                        }
                    });
                    return;
                }
                if (event.currentTarget.id === 'loginSubmit') {
                    $http({
                        method: 'POST',
                        url: '/login',
                        data: {
                            username: $('#user').val(),
                            password: $('#password').val()
                        }
                    }).success(function(data) {
                        if (data.access !== 'denied') {
                            $rootScope.user = data;
                            $('#login').popover('hide');

                        } else {
                            $('#user').val(''),
                            $('#password').val('');
                            $('.popover-title').css({
                                'border-bottom': 'solid 6px',
                                'border-bottom-color': 'red'
                            });
                        }
                    });
                }

            });

            $rootScope.$watch('user', function(newValue, oldValue) {
                scope.logInfo = $rootScope.user ? 'Hi, ' + $rootScope.user.username : 'Login';

                if ($rootScope.user) {
                    $('#login').popover('destroy')
                    $('#login').popover({
                        html: true,
                        title: 'logout',
                        content: '<form id="loginPop"><p>GoodBye<br><input id="logoutSubmit" class="btn" type="submit" value="logout"></form>'
                    });
                } else {
                    $('#login').popover('destroy')
                    $('#login').popover({
                        html: true,
                        title: 'login',
                        content: '<form id="loginPop"><label>User: </label><input type="text" id="user">' + '<label>Password: </label><input type="text" id="password">' + '<input id="loginSubmit" class="btn" type="submit" ></form>'
                    });

                }
            });
        }
    };
});