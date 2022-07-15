var passport = require('passport');
var User = require('../../models/Users');
var passportLocal = require('passport-local')
var credentials = require('../../credential')
// const randToken = require('rand-token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
passport.use(
    new JWTStrategy.Strategy(
      {
        jwtFromRequest: (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies.jwt;
          }
          return token;
        },
        secretOrKey: credentials.JWT_SECRET,
      },
      (jwtPayload, done) => {
        if (!jwtPayload) {
          return done('No token found...');
        }
        return done(null, jwtPayload);
      }
    )
  );
  