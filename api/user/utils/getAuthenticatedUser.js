const {
  CastError
} = require('mongoose');
const UserModel = require('../model');
const ExpressError = require('../../utils/ExpressError');
const testUser = require('./testUser');

const getAuthenticatedUser = (
  payload,
  done
) => UserModel.findById(
  payload.sub,
  (error, user) => {
    if (error) {
      if (error instanceof CastError) {
        return done(
          new ExpressError(
            'User Does Not Exist',
            401
          )
        );
      }

      return done(error);
    } else {
      if (!user) {
        return done(
          new ExpressError(
            'User Does Not Exist',
            401
          )
        );
      } else {
        // if user is found the done() func will set user to req.user
        return done(null, user);
      }
    }
  }
);

module.exports = {
  getAuthenticatedUser,

  mockedGetAuthenticatedUser: (payload, done) => {
    if (testUser.id === payload.sub) {
      return done(null, testUser);
    }

    getAuthenticatedUser(payload, done);
  },

  signinUser: function (email, password, done) {
    // user id was stored on sub while signup
    UserModel.findOne(
      { email },
      async (error, user) => {
        if (error) {
          return done(error);
        } else {
          if (!user) {
            return done(
              new ExpressError(
                'User Does Not Exist',
                401
              )
            );
          }

          // We use custom method defined in user schema. It already has the hashed this.password from db
          const isPasswordCorrect = await user.checkPassword(password);

          if (!isPasswordCorrect) {
            return done(
              new ExpressError(
                'Incorrect Password or Email combination',
                401
              )
            );
          } else {
            // Store the user object to next req.user
            return done(null, user)
          }
        }
      }
    );
  }
};
