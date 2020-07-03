let express = require('express');
let bodyparser = require('body-parser');
let path = require('path');

// var cookieParser = require('cookie-parser');
let moment = require('moment')

let router = express.Router();

let unProtectRoutes = require('../routes/unProtectRoutes');
let protectRoutes = require('../routes/protectRoutes');

let app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/api', router);
unProtectRoutes.init(router);
//using middleware to protect the bellow routes
protectRoutes.init(router);

module.exports = app;
