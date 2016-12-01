var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var vhost = require('vhost');
var index = require('./routes/index');
//var users = require('./index/users');
var admin = require('./routes/admin');
var blog = require('./routes/blog');
var api = require('./routes/api');
var mongoose = require('mongoose');
var sass = require('node-sass-middleware');
var subdomain = require('express-subdomain');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jsonp callback', true);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
}));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('secreeeeet'));
app.use(sass({src: __dirname + '/sass',
		       	dest: __dirname + '/public/stylesheets',
		        prefix:  '/stylesheets',
	       	        debug: true}));
app.use(require('connect-livereload')({port: 4002}));
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(subdomain('blog',blog));
app.use('/', index);
app.use('/api', api);
//app.use('/users', users);
app.use('/admin', admin);
//app.use('/blog',blog);
//app.use(subdomain('www', index));
/// catch 404 and forward to error handler
//app.use(function(req, res, next) {
    //var err = new Error('Not Found');
    //err.status = 404;
    //next(err);
//});
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

mongoose.connect('mongodb://localhost/SiteDB');

//function createVirtualHost(domainName, dirPath){
	//return vhost(domainName, express.static(dirPath));
//}

//var assieHost = createVirtualHost("assie.io","assie");

//app.use(assieHost);


app.listen(3000, function(){
    console.log("Server is listening on port 3000");

});



module.exports = app;
