 'use strict';
var bill = require ('../models/billModel.js');



var item = {
	get : function(req,res){
		bill.connect();
		bill.getItem(req.params.item, function (result){
			res.json(result);
		});
	},
	post : function(req,res){
		res.send('postitem');
	},
	put : function(req,res){
		res.send('putitem');
	},
	delete : function(req,res){
		res.send('deletitem');
	}
};

var collection = {
	get : function(req,res){
			bill.connect();
			bill.getCollection(function (result){
				res.json(result);
			});
		},
	post : function(req,res){
		res.send('postcol');
	},
	put : function(req,res){
		res.send('putcol');
	},
	delete : function(req,res){
		res.send('deletecol');
	}
};

exports.item = item;
exports.collection = collection;