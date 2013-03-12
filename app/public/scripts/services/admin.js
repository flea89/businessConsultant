'use strict';

angular.module('publicApp')
.factory('Admin', function ($resource) {
  return $resource('/admin/:id', {id:'@id'},{
    update:{
      method: 'PUT',
      params: {user: '@user'}
    }
  });
});
