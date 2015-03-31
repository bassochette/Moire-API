/**
 * Module dependencies.
 */
var express       = require('express');
var http          = require('http');
var https         = require('https');
var path          = require('path');
var url           = require('url');
var Bootloader    = require('./bootloader');

//var passport      = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
//var Membership    = require('./middleware/membership');

var app = express();
//var membership = new Membership(passport, LocalStrategy);

/**
 * main application configuration.
 */
app.configure(function(){
    app.set('port', process.env.PORT || 3000);

    require('express-helpers')(app);

    app.use(function (req, res, next) {
        res.locals.req = req;
        next();
    });
    
    app.use(function(req, res, next){
        res.locals.path = url.parse(req.url).pathname;
        next();
    });

    app.use(express.logger('dev'));
    app.use(express.bodyParser({uploadDir:'./tmpUpload'}));
    // app.use(express.methodOverride());
    // app.use(express.session({ secret: 'napoleon' }));
    app.use(express.errorHandler());

    // GNU Terry Pratchett
    app.use(function(req, res, next){
        res.set('X-Clacks-Overhead', 'GNU Terry Pratchett');
        next();
    });

    app.use(function(req, res, next){
        res.set('Access-Control-Allow-Origin', 'http://museion.dev:8888');
        next();
    });

    //app.use(require('./middleware/deviceHandler'));
    //app.use(passport.initialize());
    //app.use(passport.session());
    app.use(app.router);
});

/**
 * boot application with all modules.
 */
var bootloader = new Bootloader(app);

/**
* ERROR MANAGEMENT
* -------------------------------------------------------------------------------------------------
* error management - instead of using standard express / connect error management, we are going
* to show a custom 404 / 500 error using ejs and the middleware errorHandler (see ./middleware/errorHandler.js)
**/
var errorOptions = { dumpExceptions: true, showStack: true }
app.configure('development', function () { });
app.configure('production', function () {
    errorOptions = {};
});
app.use(require('./middleware/errorHandler')(errorOptions));


/**
 * Run server.
 */
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("\n Moire Api listening on port " + app.get('port'));
});