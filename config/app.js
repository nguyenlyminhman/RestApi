var express = require('express');
var bodyparser = require('body-parser');
// var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('../routes/index');
var usersRouter = require('../routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
