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
			db.collection('bills', function(err, collection) {
				var o_id = new BSON.ObjectID(id);
				collection.find({'_id': id}).toArray(function(err, results) {
					func(results);
					db.close(true, function(){
						console.log('closing');
					});			
				});
			});
		});
	};

	exports.getCollection = function(func){
		db.open(function(err, db){
			db.collection('bills', function(err, collection) {
				collection.find({}).toArray(function(err, results) {
					func(results);
					db.close(true, function(){
						console.log('closing');
					});			
				});
			});
		});
	};

	exports.create = function () {
		db.open(function(err,db){
			db.collection('users', function(err,collection){
			});
		});
	};





}());