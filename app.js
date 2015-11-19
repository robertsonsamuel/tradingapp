'use strict';

var PORT = process.env.PORT || 3000;

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var expressSession = require('express-session');
var User = require('./models/userModel');

var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/trading');

app.set('view engine', 'jade');

// GENERAL MIDDLEWARE
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));


// MIDDLEWARE LOGIN
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

passport.use( new Strategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err) return done(err);
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'Incorrect username.'));                 
        }

        if (user.password!== password){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Incorrect Password'));
        }

        return done(null, user);
      }
    );
}));





// USER SERIAL
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// ROUTES
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));
app.use('/members', require('./routes/members'));
app.use('/profile', require('./routes/profile'));
// 404 HANDLER
app.use(function(req, res){
  res.status(404).render('404')
})

app.listen(PORT, function(){
  console.log('Listening on port ', PORT);
});
