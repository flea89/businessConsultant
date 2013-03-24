'use strict';

angular.module('publicApp')
    .directive('bsNavbar', ['$location', '$rootScope', function($location, $rootScope) {
    return {
        restrict: 'A',
        link: function postLink($scope, element, attrs, controller) {

            // Watch for the $location


            $scope.$watch(function() {
                return $location.path();
            }, function(newValue, oldValue) {

                element.find('li[data-match-route]').each(function(k, li) {
                    var $li = angular.element(li),
                        // data('match-rout') does not work with dynamic attributes
                        pattern = $li.attr('data-match-route'),
                        regexp = new RegExp('^' + pattern + '$', ['i']);

                    if (regexp.test(newValue)) {
                        $li.addClass('selected');
                    } else {
                        $li.removeClass('selected');
                    }
                });
            });

            $rootScope.$watch('user', function(newValue, oldValue) {
                element.find('li[data-match-route]').each(function(k, li) {
                    var $li = angular.element(li);
                    var pattern = $li.attr('data-match-route');
                    if ($rootScope.user === undefined && pattern !== '/login' && pattern !== '/') {
                        $li.css({
                            visibility: 'hidden',
                        });
                    } else {
                        $li.css({
                            visibility: '',
                        });
                    }
                });

            });
        }
    };
}]);