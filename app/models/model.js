'use strict';

function validate_id(id, func) {
	return !(id !== null && (id.length != 12 && id.length != 24));
}

module.exports = function(collection) {
	var Db, Server, db;
	var BSON = require('mongodb').BSONPure;

	var connect = function() {
		Db = require('mongodb').Db;
		Server = require('mongodb').Server;
		db = new Db('businessconsultant', new Server('127.0.0.1', 27017, {
			auto_reconnect: true,
			poolSize: 4
		}), {
			w: 0,
			native_parser: false
		});
	};

	var getItem = function(id, func) {
		db.open(function(err, db) {
			db.collection(collection, function(err, collection) {
				if (validate_id(id)) {
					var oId = new BSON.ObjectID(id);
				} else {
					func({
						result: 'Id malformed'
					});
					return;
				}
				console.log(id);
				var cursor = collection.find({
					'_id': oId
				});
				cursor.nextObject(function(err, results) {
					console.log(results);
					func(results);
					db.close(true, function() {
						console.log('closing');
					});
				});
			});
		});
	};

	var getCollection = function(JSONobj, func) {
		var data = '';
		db.open(function(err, db) {
			db.collection(collection, function(err, collection) {
				if (JSONobj) {
					data += JSONobj;
					console.log(data);
					try {
						data = JSON.parse(data);
					} catch (e) {
						console.log(e);
						func({
							result: 'malformedJSON'
						});
					}
					console.log(data);
				} else {
					data = {};
				}

				// var queryObj = JSON.parse(JSONobj);
				collection.find(data).toArray(function(err, results) {
					func(results);
					db.close(true, function() {
						console.log('closing');
					});
				});
			});
		});
	};


	var create = function(JSONobj, func) {
		var data = '';
		db.open(function(err, db) {
			db.collection(collection, function(err, collection) {

				if (JSONobj) {
					data += JSONobj;
					try {
						data = JSON.parse(data)
					} catch (e) {
						console.log(e);
						func({
							result: 'malformedJSON'
						});

						return;
					}
				} else {
					func({
						result: 'emptyObj'
					});
					return;
				}
				collection.insert(data, function(err, result) {
					err === null ? func(result[0]) : func({
						result: 'no'
					});
				});

			});
		});
	};

	var removeItem = function(id, func) {
		db.open(function(err, db) {
			db.collection(collection, function(err, collection) {
				console.log(id);
				if (validate_id(id)) {
					var oId = new BSON.ObjectID(id);
				} else {
					func({
						result: 'Id malformed'
					});
					return;
				}
				collection.remove({
					_id: oId
				}, {
					w: 1
				}, function(err, result) {
					err === null ? func({
						result: 'ok'
					}) : func({
						result: 'no'
					});
				});

			});
		});
	};
	var removeCollection = function(func) {
		db.open(function(err, db) {
			db.collection(collection, function(err, collection) {
				collection.remove({}, {
					w: 1
				}, function(err, result) {
					err === null ? func({
						result: 'ok'
					}) : func({
						result: 'no'
					});
				});

			});
		});
	};

	var updateItem = function(id, JSONobj, func) {
		var data = '';
		console.log(JSONobj);
		db.open(function(err, db) {
			db.collection(collection, function(err, collection) {
				var oId = new BSON.ObjectID(id);

				if (JSONobj) {
					data += JSONobj;
					try {
						data = JSON.parse(data);
						delete data._id;
					} catch (e) {
						console.log(e);
						func({
							result: 'malformedJSON'
						});
					}
				} else {
					func({
						result: 'emptyObj'
					});
					return;
				}
				collection.update({
					_id: oId
				}, {
					$set: data
				}, {
					safe: true
				}, function(err, result) {
					err === null ? func({result: 'ok'}) : func({
						result: 'no'
					});
					if (err !== null) {
						console.log(err);
					}
				});
			});
		});
	};

	return {
		connect: connect,
		getItem: getItem,
		getCollection: getCollection,
		create: create,
		removeItem: removeItem,
		removeCollection: removeCollection,
		updateItem: updateItem
	};


};