const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  Strategy,
  ExtractJwt
} = require('passport-jwt');
const UserModel = require('../model');
const appKey = require('../../config/keys').appKey;

// FOR JWT REQUESTS authenticate requests
passport.use(
  new Strategy(
    {
      // get the jwt token from authorization token of url
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: appKey
    },

    (payload, done) => {
      UserModel.findById(
        payload.sub,
        (error, user) => {
          if (error) {
            return done(error);
          } else {
            if (!user) {
              return done(null, false);
            } else {
              // if user is found the done() func will set user to req.user
              return done(null, user);
            }
          }
        }
      );
    }
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

    function (email, password, done) {
      // user id was stored on sub while signup
      UserModel.findOne(
        { email },
        async (error, user) => {
          if (error) {
            return done(error);
          } else {
            if (!user) {
              return done(null, false);
            } else {
              // We use custom method defined in user schema. It already has the hashed this.password from db
              const isPasswordCorrect = await user.checkPassword(password);

              if (!isPasswordCorrect) {
                return done(null, false);
              } else {
                // Store the user object to next req.user
                return done(null, user)
              }
            }
          }
        }
      );
    }
  )
);