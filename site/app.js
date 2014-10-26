var express = require('express');
var path = require('path');
var storage = require(path.join(__dirname, '../lib/storage'));
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', { title: 'Node FS Dashboard' });
});

app.get('/logs', function(req, res) {
  var _limit = (typeof req.query.limit !== 'undefined') ? req.query.limit : 100;
  
  storage.getAll({ limit: _limit}, function(items){
    res.json(items);
  });
});

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

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
