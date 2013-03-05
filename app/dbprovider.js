var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
module.exports = new Db('businessconsultant', new Server('127.0.0.1', 27017, {w: 1}));