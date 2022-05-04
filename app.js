var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { engine } = require('express-handlebars');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./controllers/auth');
var postRouter = require('./routes/post')
var adminRouter = require('./routes/admin');
var session = require('express-session');
var db = require('./db')
var helpers = require('./controllers/helpers');
var app = express();
const passport = require('passport');
// view engine setup
app.engine('hbs', engine({
  helpers : {
    ifCond : helpers.ifCond 
},
layoutsDir: __dirname + '/views/layouts', 
  extname: 'hbs', defaultLayout:'layout',
   runtimeOptions: { allowProtoPropertiesByDefault: true, allowProtoMethodsByDefault: true }
  }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  resave: false,
  saveUninitialized: true,  
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) 
      return next();
  res.redirect('/login');
}
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role == 'admin') 
      return next();
  res.redirect('/login');      
}
app.use('/',indexRouter);
app.use('/post',isLoggedIn,postRouter);
app.use('/user',isLoggedIn, usersRouter); 
app.use('/auth', authRouter);
app.use('/admin', isAdmin,adminRouter);

app.get('/public',isLoggedIn, express.static('public'));
app.get('/favicon.ico', (req, res) => res.status(204).end());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{layout: 'error'});
});

module.exports = app;
