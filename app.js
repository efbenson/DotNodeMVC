"use strict";

var sys = require('sys');
var connect = require('connect');
var express = require('express');
var config = require('./config.js');
var path = require('path');
var fs = require('fs');
var routes = require('./routes');


var app = module.exports = express.createServer();

var authenticationService = require('./services/authenticationService.js');

app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.session({
    secret: "ilovelamp"
  }));
  app.use(authenticationService.authCheck);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

//register controllers
var accountController = require("./controllers/accountController.js");

// Routes

//Base URL
app.get('/', function(req, res) {
  if (!req.session.auth){
    res.render('index');
  }


  // if (req.session.auth){
  //   res.render('index', {
  //     "session": req.session,
  //     title: 'Dashboard'
  //   });
  // }else{
  //   res.render('landing',{"session": req.session});
  // }
});

//Account Controller
app.get ('/account/login', accountController.loginGet);
app.post('/account/login', accountController.loginPost);
app.post('/account/create', accountController.createPost);


app.listen(config.web.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);