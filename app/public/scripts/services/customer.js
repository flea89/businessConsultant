'use strict';

angular.module('publicApp').
factory('Customer', function ($resource) {
	return $resource('/users/:id', {id:'@id'},{
		update:{
			method: 'PUT',
			params: {user: '@user'}
		}
	});
});