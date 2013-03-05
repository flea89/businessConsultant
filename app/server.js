/**
 * Module dependencies.
 */

'use strict';
var express = require('express'),
  http = require('http'),
  path = require('path');
var app = express();
var expressmap = require('express-routes-map');

console.log('Server in fase di config');
app.configure(function () {
  // app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);

});

app.configure('development', function () {
  app.use(express.errorHandler());
});

expressmap(app).defineRoutes('/bills', require('./routes/bills'))
  .defineRoutes('/users',require('./routes/users'))
  .map();

var server = http.createServer(app);
// app.listen(3000);

exports = module.exports = server;

exports.use = function () {
  app.use.apply(app, arguments);
};