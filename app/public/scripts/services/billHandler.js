'use strict';

angular.module('publicApp')
 .factory('Bill', function ($resource) {
  return $resource('/bills/:id', {id:'@id'},{
    update:{
      method: 'PUT',
      params: {bill: '@bill'}
    },
    getChanges:{
            method: 'GET',
            params: { modifiedSince: '@modifiedSince'},
            isArray: true
        }
  });
});
