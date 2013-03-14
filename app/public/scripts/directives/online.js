'use strict';

angular.module('publicApp')
.directive('online', function () {
    return {
        restrict: 'E',
        scope: {},
        template: '<button style="float: left" class="btn btn-{{onlineclass}} online" >{{onlineText}}</button>',
        // template: '<div class="circle" style="color:{{online}}"></div>',
        link: function (scope, element, attrs) {
            var onlineText = 'online', offlineText = 'offline'

            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
                onlineText = 'on';
                offlineText = 'off';
            }
            scope.onlineclass = window.navigator.onLine ? 'success' : 'danger';
            scope.onlineText = window.navigator.onLine ? onlineText : offlineText;

            window.addEventListener('offline', function () {
                scope.$apply(function(){
                    scope.onlineclass = 'danger';
                    scope.onlineText = offlineText;
                });
            });

            window.addEventListener('online', function () {
                scope.$apply(function(){
                    scope.onlineclass = 'success';
                    scope.onlineText = onlineText;
                });    
            });

        }
    };
});