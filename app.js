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
let reseed = false;
if (reseed) {
  recreateDB();
}

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user){
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function(err){
        return done(err)
      })
    })
 )

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

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/animals', animalsRouter);
app.use('/grid', gridRouter);
app.use('/pick', pickRouter);
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


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
