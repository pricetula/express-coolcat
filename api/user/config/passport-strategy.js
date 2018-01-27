const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  Strategy,
  ExtractJwt
} = require('passport-jwt');
const appKey = require('../../config/keys').appKey;
const {
  mockedGetAuthenticatedUser,
  getAuthenticatedUser,
  signinUser
} = require('../utils/getAuthenticatedUser');

// FOR REQUESTS authentication
passport.use(
  new Strategy(
    {
      // get the jwt token from authorization token of url
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: appKey
    },

    process.env.NODE_ENV === 'test' ? mockedGetAuthenticatedUser : getAuthenticatedUser
  )
);

// FOR LOCAL used in signing in user
passport.use(
  new LocalStrategy(
    {
      // Local strategy uses username by default instead of email hence we force it by replacing username with
      // email as field to refrence
      usernameField: 'email',
      secretOrKey: appKey
    },

    signinUser
  )
);
