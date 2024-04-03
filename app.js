require('dotenv').config();
const connectionString = process.env.MONGO_CON;
const mongoose = require('mongoose');
mongoose.connect(connectionString);

var Animal = require("./models/animals");

var db = mongoose.connection;

async function recreateDB() {
  // Delete all existing instances
  await Animal.deleteMany();

  // Create and save instances of Animal
  let instance1 = new Animal({ species: "Elephant", habitat: "Savannah", population: 5000 });
  let instance2 = new Animal({ species: "Lion", habitat: "Grasslands", population: 1000 });
  let instance3 = new Animal({ species: "Tiger", habitat: "Jungle", population: 200 });

  // Save instances and log success
  await instance1.save().then(doc => {
      console.log("Elephant saved");
  }).catch(err => {
      console.error(err);
  });

  await instance2.save().then(doc => {
      console.log("Lion saved");
  }).catch(err => {
      console.error(err);
  });

  await instance3.save().then(doc => {
      console.log("Tiger saved");
  }).catch(err => {
      console.error(err);
  });
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
    console.log("Connection to DB succeeded");
});

// Call the recreateDB function to seed the database
let reseed = true;
if (reseed) {
  recreateDB();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var animalsRouter = require('./routes/animals');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalsRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);


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
