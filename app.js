var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;
var app = express();
var dbUrl = 'mongodb://localhost/movie';

mongoose.connect(dbUrl);

app.set('views', './app/views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: './public/upload/'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'movie',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: true,
    saveUninitialized: false
}));

if ('development' === app.get('env')) {
    app.set('showStatckError', true);
    app.use(morgan(':method :url :status'));
    app.locals.pretty = true;
    //mongoose.set('debug', true);
}

require('./config/routes')(app);

app.listen(port);
console.log('movie site started on port ' + port);

app.locals.moment = require('moment');
