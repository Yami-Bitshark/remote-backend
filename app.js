"use strict"
var path = require('path');
//var favicon = require('serve-favicon');
var express = require('express');

var bodyParser = require('body-parser');
var fs = require('fs');
//basic security Check
//known vulnerabilities filtre
var helmet = require('helmet');

// app initializer
var init = function(app) {
    app.use(helmet());
    //disable the x-powered header used by default by Express apps
    app.disable('x-powered-by');
    //set up bodyparer
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // main route
    app.use('/', function(){
        var router = express.Router();
        router.get('/', function(req, res){
            res.status(200);
            res.json({
            status : 200,
            message : "Up an running, u can either call /trending or /mostrated. \n you can add ?lang=your fav lang"
        });
    });
        return router;
    }());

    app.use('/', require('./routes/routes.js'));

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.end(err.message);
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.end(err.message);
    });
};
var app = express();
init(app);
let server = http.createServer(app);
    server.listen(env.NODE_PORT || 8080, '::', function() {
        console.log(`Application worker started at Port :${env.NODE_PORT || 4000}`);
    });
