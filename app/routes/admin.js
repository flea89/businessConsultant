var admin = require('../models/model.js')('admin');

exports.item = {
    get: function  (req, res) {
        admin.connect();
        admin.getItem(req.params.item,function(result){
            res.json(result);
        });
    },
    put : function(req,res){
        admin.connect();
        admin.updateItem(req.params.item,req.body.admin,function(result){
            res.json(result);
        });
    },
};

exports.collection = {

};
