var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressJwt = require("express-jwt");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bookRouter = require('./routes/book');
var overviewRouter = require('./routes/overview');
var starRouter = require('./routes/star');
var assetsRouter = require('./routes/assets');
var debetRouter = require('./routes/debet');

var app = express();

//解决跨域问题
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.header('Origin'));
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressJwt({
  secret: "secret"
}).unless({
  path: ["/users/signin", "/users/signup"]
}))

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).send(err);
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/book', bookRouter);
app.use('/overview', overviewRouter);
app.use('/save', starRouter);
app.use('/assets', assetsRouter);
app.use('/debet', debetRouter);

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
  res.render('error');
});

module.exports = app;
