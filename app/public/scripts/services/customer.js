'use strict';

angular.module('publicApp').
factory('Customer', function ($resource) {
	// console.log('factory called');
	return $resource('/users/:id', {id:'@id'},{
		update:{
			method: 'PUT',
			isArray: false,
			params: {user: '@user'}
		}
	});
});
