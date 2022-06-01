var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/Users');
var express = require('express');
const credentials = require('.//../credential');
const { response } = require('../app');
var router = express.Router();
passport.use(new GoogleStrategy({
    clientID: credentials.clientID,
    clientSecret: credentials.clientSecret,
    // callbackURL: "https://sinhvientdt.herokuapp.com/auth/google/callback"
    callbackURL: "http://localhost:3000/auth/google/callback"

  },    

  function(accessToken, refreshToken, profile, done) {   

    const authId = 'google:' + profile.id;
    if(profile.emails[0].value.indexOf("@student.tdtu.edu.vn")>0) {
    User.findOne({ 'authId': authId })
      .then(user => {
        if(user) return done(null, user,accessToken,refreshToken);
        new User({
          authId: authId,
          name: profile.displayName,
          email: profile.emails[0].value,
          created: new Date(),
          picture: profile.photos[0].value,
          role: 'student',
        }).save()
        .then(user => done(null, user))
        .catch(err => done(err, null));
      })
      .catch(err => {
        if(err) return done(err, null);
      });
    }else if(profile.emails[0].value.indexOf("@tdtu.edu.vn")>0){
      User.findOne({ 'authId': authId })
      .then(user => {
        if(user) return done(null, user);        
        new User({
          authId: authId,
          name: profile.displayName,
          email: profile.emails[0].value,
          created: new Date(),
          picture: profile.picture,
          role: 'teacher',
          password: "123456",
          
        }).save()
        .then(user => done(null, user))
        .catch(err => done(err, null));
      })
      .catch(err => {
        if(err) return done(err, null);
      });
    }else{
     done(null, null)
    }
  }
));
passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, null));
  })
// Redirect the user to Google for authentication.  When complete,
// Google will redirect the user back to the application at
//     /auth/google/callback
router.get('/google',
  passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile', 
        'https://www.googleapis.com/auth/userinfo.email',

    ],
    accessType: 'offline',
   }));
    
// Google will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/google/callback',
  passport.authenticate('google',
  { successRedirect: '/',
    failureRedirect: '/login' }));

module.exports = router;
  