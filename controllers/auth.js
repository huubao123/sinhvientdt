var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/Users');
var express = require('express');
const credentials = require('.//../credential');
const { response } = require('../app');
var router = express.Router();
var util = require('util');
const jwt = require('jsonwebtoken');
const { nextTick } = require('process');
const generateJwtToken = (user) => {
  const token = jwt.sign(user.toJSON(), credentials.JWT_SECRET, {
    expiresIn: '1d',
  });
  return token;
};

passport.use(new GoogleStrategy({
  authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
  tokenURL: 'https://accounts.google.com/o/oauth2/token',

    clientID: credentials.clientID,
    clientSecret: credentials.clientSecret,
    // callbackURL: "https://sinhvientdt.herokuapp.com/auth/google/callback"
    callbackURL: "http://localhost:3000/auth/google/callback"

  },    

  
  function(accessToken, refreshToken, profile, done) { 
    process.nextTick(function() {
      console.log("Token is ");
      console.log(util.inspect(accessToken, false, null));
      console.log("Refresh is ");
      console.log(util.inspect(refreshToken, false, null));
  });

    const authId = 'google:' + profile.id;
    if(profile.emails[0].value.indexOf("@student.tdtu.edu.vn")>0) {
   User.findOne({ 'authId': authId })
      .then(user => {
        if(user) return done(null,user);
        new User({
          authId: authId,
          name: profile.displayName,
          email: profile.emails[0].value,
          created: new Date(),
          picture: profile.photos[0].value,
          role: 'student',
        }).save()
        .then(user => done(null, user),)
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
  {failureRedirect: '/login' }),
  (req, res) => {    
    const token = generateJwtToken(req.user);
    res.cookie('jwt', token);
    res.header('field', token)

    res.redirect('/');

  });

module.exports = router;
  