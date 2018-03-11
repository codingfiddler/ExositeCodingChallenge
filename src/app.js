let express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
let httplogger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var index = require('./routes/index');
var products = require('./routes/products');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httplogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up client app server path
app.use(express.static(path.join(__dirname, 'public')));

// Set up API routes
app.use('/', index);
app.use('/products', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
      .send(err.status + ' - ' + err.message);
});

module.exports = app;
