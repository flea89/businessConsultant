 'use strict';
var bills = require('../models/model.js')('bills');


var item = {
	get : function(req,res){
			bills.connect();
			bills.getItem(req.params.item, function (result){
				res.json(result);
		});
	},
	put : function(req,res){
		bills.connect();
		bills.updateItem(req.params.item, req.body.bill,function(result){
			res.json(result);
		});
	},
	delete : function(req,res){
			bills.connect();
			bills.removeItem(req.params.item,function(result){
				res.json(result);
			});
		}
};

var collection = {
	get : function(req,res){
		bills.connect();
		bills.getCollection(req.query['bill'] ,function(result){
			res.json(result);
		});
	},
	post : function(req,res){
		bills.connect();
		console.log(req.body['bill']);
		bills.create(req.body['bill'],function(result){
			res.json(result);
		});
	},
	delete : function(req,res){
		bills.connect();
		bills.removeCollection(function(result){
			res.json(result);
		});
	}
};

exports.item = item;
exports.collection = collection;