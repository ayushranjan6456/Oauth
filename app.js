const express = require('express')
const passport = require('passport')
const app = express()
const GoogleStrategy=require('passport-google-oauth20').Strategy
 
app.get('/', function (req, res) {
  res.send('Hello World')
})

passport.initialize()
 
passport.use(new GoogleStrategy({
    clientID:     '1011574036991-mvs3o6arqub7cd9qcq7b5vfhhre98c4s.apps.googleusercontent.com',
    clientSecret: '6eNIOXLbLxReyrMpft_1owDt',
    callbackURL: "http://localhost:3000/google/callback"
  },
  function(accessToken, refreshToken,profile, cb) {
    // User.findOrCreate({ exampleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb('http://localhost:3000/');
  }
));

app.get('/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000)