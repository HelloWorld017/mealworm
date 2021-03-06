var acceptLanguage = require('accept-language');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var favicon = require('serve-favicon');
var FacebookStrategy = require('passport-facebook');
var logger = require('morgan');
var passport = require('passport');
var path = require('path');
var TwitterStrategy = require('passport-twitter');

var _ = require('./errors');
var preventInjection = require('./prevent-injection');
var resolveLanguage = require('./resolve-language');

var index = require('../routes/index');
var meal = require('../routes/meal');
var school = require('../routes/school');
var templates = require('../routes/templates');
var user = require('../routes/user');

acceptLanguage.language(global.config.langs);

passport.use(new TwitterStrategy({
	consumerKey: global.config.auth.twitter.key,
	consumerSecret: global.config.auth.twitter.secret,
	callbackURL: global.config.auth.twitter.callbackURL
}));

passport.use(new FacebookStrategy({
	clientID: global.config.auth.facebook.id,
	clientSecret: global.config.auth.facebook.secret,
	callbackURL: global.config.auth.facebook.callbackURL
}));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(cookieParser());

app.use(preventInjection);
app.use(resolveLanguage);

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use('/', index);
app.use('/meal', meal);
app.use('/school', school);
app.use('/templates', templates);
app.use('/user', user);

app.use((req, res, next) => {
	next(_('not_found', req));
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);

	res.render('error', {
		error: err
	});
});

module.exports = app;
