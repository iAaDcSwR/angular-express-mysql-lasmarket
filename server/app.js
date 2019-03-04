var express = require('express');
var cors = require('cors')
var path = require('path');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

var corsOptions = {
    credentials: true,
    origin: 'http://localhost:4200'
    //origin: /^(http:\/\/localhost).*/g
    /*,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204*/
}

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(session({
    secret: "hello world",
    resave: false,
    saveUninitialized: true,
    /*cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000, // year
        path: '/',
        domain: 'localhost'
    }*/
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.all('*', function (req, res, next) {
    res.status(404).json({
        sqlMessage: '404 Not Found. Lots o\' love, LASMarket.'
    });
});

module.exports = app;