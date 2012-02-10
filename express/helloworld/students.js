/**
 * Students Web Application
 *
 * User: bryanmac
 * Date: 2/9/12
 */

//
// Create express server
//
var express = require('express');
var app = express.createServer();

//
// Configure
//
app.configure(function()
{
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);

    // set, enable, disable
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
});

// $ NODE_ENV=production node helloconfig.js
app.configure('development', function()
{
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function()
{
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
    app.use(express.errorHandler());
});

//
// REST URL Mappings
//
var studentsSvc = require('./service/studentsvc.js');
app.get('/service/students', studentsSvc.queryStudents);
app.get('/service/student/:id', studentsSvc.getStudent);

//
// Start
//
app.listen(3333);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);