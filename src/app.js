let express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
let httplogger = require('morgan');
const logger = require('./util/logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

var index = require('./routes/v1/index');
var products = require('./routes/v1/products');

var app = express();

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(httplogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set up client app server path
app.use(express.static(path.join(__dirname, 'public')));

// Set up v1 API routes
app.use('/v1/index', index);
app.use('/v1/products', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  logger.error(err.message,{error: err});

    if (req.app.get('env') === 'development') {
        res.status(err.status || 500)
            .send(err.status + ' - ' + err.message);
    }
    else {
        res.sendStatus(err.status || 500)
    }

});

module.exports = app;
