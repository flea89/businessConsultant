'use strict';


(function(){
	var Db,Server,db;
	var BSON = require('mongodb').BSONPure;
	exports.connect = function(){
		Db = require('mongodb').Db;
		Server = require('mongodb').Server;
		db = new Db('businessconsultant', new Server('127.0.0.1', 27017,
			{ auto_reconnect: true, poolSize: 4}), {w:0, native_parser: false});
	};

	exports.getItem = function(id, func) {
		db.open(function(err, db){
			db.collection('users', function(err, collection) {
				var oId = new BSON.ObjectID(id);
				console.log(id);
				var cursor = collection.find({'_id': oId});
				cursor.nextObject(function(err, results) {
					console.log(results);
					func(results);
					db.close(true, function(){
						console.log('closing');
					});			
				});
			});
		});
	};

	exports.getCollection = function(JSONobj,func){
		var data = '';
		db.open(function(err, db){
			db.collection('users', function(err, collection) {
				if(JSONobj){
					data += JSONobj;
					console.log(data);
					try{
						data = JSON.parse(data);
					}
					catch( e ) {
						console.log(e);
					}
					console.log(data);
				} else {
					data = {};
				}

				// var queryObj = JSON.parse(JSONobj);
				collection.find(data).toArray(function(err, results) {
					func(results);
					db.close(true, function(){
						console.log('closing');
					});			
				});
			});
		});
	};


exports.create = function (JSONobj , func) {
		var data = '';
		db.open(function(err,db){
			db.collection('users', function(err,collection){

				if (JSONobj){
					data+=JSONobj;
					try{
						data = JSON.parse(data)
					}
					catch(e){
						console.log(e);
					}
				} else {
					func({result: 'emptyObj'});
					return;
				}
				collection.insert(data, function(err,result){
					 err === null ? func({result: 'ok'}) : func({result: 'no'});
				});

			});
		});
	};

	exports.removeItem = function (id , func) {
		db.open(function(err,db){
			db.collection('users', function(err,collection){
				console.log(id);
				var oId = new BSON.ObjectID(id);
				collection.remove({_id: oId}, {w:1}, function(err,result){
					 err === null ? func({result: 'ok'}) : func({result: 'no'});
				});

			});
		});
	};
	exports.removeCollection = function (func) {
		db.open(function(err,db){
			db.collection('users', function(err,collection){
				collection.remove({}, {w:1}, function(err,result){
					 err === null ? func({result: 'ok'}) : func({result: 'no'});
				});

			});
		});
	};

	exports.updateItem = function (id, JSONobj, func) {
		var data ='';
		db.open(function(err,db){
			db.collection('users', function(err,collection){
				var oId = new BSON.ObjectID(id);

				if (JSONobj){
					data+=JSONobj;
					try{
						data = JSON.parse(data)
					}
					catch(e){
						console.log(e);
					}
				} else {
					func({result: 'emptyObj'});
					return;
				}
				collection.update({_id: oId}, {$set: data}, {safe:true}, function(err){
					 err === null ? func({result: 'ok'}) : func({result: 'no'});
				});

			});
		});
	};




}());