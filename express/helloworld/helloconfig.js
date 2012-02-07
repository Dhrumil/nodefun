/**
 *
 * Hello World Express App
 *
 * Created : bryan
 * Date    : 2/6/12
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
    // allows for restful verbs
    app.use(express.methodOverride());

    // allows for posting forms
    app.use(express.bodyParser());

    // load router.  app.get will load but this controls explicit order of loading.
    app.use(app.router);

    // set, enable, disable
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.enable('some feature');
    // same as app.set('some feature', true);

    app.disable('some feature');
    // same as app.set('some feature', false);
});

// $ NODE_ENV=production node helloconfig.js
app.configure('development', function()
{
    // static files served out of /public
    // public not in path /public/images/node.png --> http://<server>/images/node.png
    app.use(express.static(__dirname + '/public'));

    // dev shows exceptions stack
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function()
{
    // cache public for a year
    var oneYear = 31557600000;
    app.use(express.static(__dirname + '/public', { maxAge: oneYear }));

    // use error handler without dump & showStack
    app.use(express.errorHandler());
});

//
// Route '/' to anonymous function that returns 'hello world'
//
app.get('/',
        function(req, res)
        {
            res.send('hello config');
        });

//
// Start
//
app.listen(3333);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);