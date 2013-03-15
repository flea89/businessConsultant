'use strict';

angular.module('publicApp')
  .factory('jaydata', function ($q,$rootScope ) {
    var deferred = $q.defer();

    $data.Entity.extend('$org.types.customer', {
        _id: { type: 'string',key: true, required: true },
        name: { type: 'string' },
        surname: { type: 'string' },
        type: { type: 'string' },
        title: { type: 'string' },
        cf: { type: 'string' },
        pi: { type: 'string' },
        mail: { type: 'string' },
        telephone: { type: 'string' },
        sync: { type: 'int' },
        address: { type: "Array",elementType: '$org.types.address' }
    });

    $data.Entity.extend('$org.types.address', {
        streetType: { type: 'string' },
        streetName: { type: 'string' },
        cap: { type: 'string' },
        streetNumber: { type: 'string' },
        city: { type: 'string' },
        provincia: { type: 'string' },
    });

    $data.Entity.extend('$org.types.admin', {
        _id: { type: 'string',key: true, required: true },
        name: { type: 'string' },
        surname: { type: 'string' },
        cf: { type: 'string' },
        pi: { type: 'string' },
        sync: { type: 'int' },
        address: { type: "Array", elementType: '$org.types.address' }
    });

    $data.Entity.extend('$org.types.task', {
        Id: { type: 'int', key: true, computed: true },
        quantity: { type: 'string' },
        taskName: { type: 'string' },
        cost: { type: 'string' },
    });




    $data.Entity.extend('$org.types.bill', {
        _id: { type: 'string',key: true, required: true },
        type: { type: 'string' },
        customer: { type: "Array", elementType: '$org.types.customer' },
        admin: { type: "Array", elementType: '$org.types.admin' },
        tasks:{type: 'Array', elementType: "$org.types.task" },
        finalPrice: { type: 'string' },
        ritenuta: { type: 'string' },
        tot: { type: 'string' },
        sync: { type: 'string'}
    });





    $data.EntityContext.extend("$org.types.OrgContext", {
        customer: { type: $data.EntitySet, elementType: $org.types.customer },
        bill: { type: $data.EntitySet, elementType: $org.types.bill },

    });

    $org.context = $org.context = new $org.types.OrgContext({ name: "webSql", databaseName: "Business" });

    
    $org.context.onReady(function(){
        deferred.resolve($org.context);
        $rootScope.$digest();

    });

    return deferred.promise;
  });
