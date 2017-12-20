const passport = require('passport');
const expressPromiseRouter = require('express-promise-router');
const controller = require('./controller');
const {
  signinValidation,
  signupValidation
} = require('./utils/validation');
require('./config/passport-strategy');

const router = expressPromiseRouter();

router
  .route('/signup')
  .post(
    signupValidation,
    controller.signup
  );

router
  .route('/signin')
  .post(
    signinValidation,

    passport.authenticate(
      // strategy
      'local',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.signin
  );

router
  .route('/admin')
  .get(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.admin
  );

router
  .get(
    '/verify/:token',
    controller.verify
  );

router
  .route('/logout')
  .get(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.logout
  );
module.exports = router;
