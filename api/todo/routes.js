const passport = require('passport');
const expressPromiseRouter = require('express-promise-router');
const controller = require('./controller');
require('../user/config/passport-strategy');

const router = expressPromiseRouter();

router
  .route('/')
  .get(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.getTodos
  );

router
  .route('/')
  .post(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.addTodo
  );

router
  .route('/:id')
  .get(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.getTodoId
  );

router
  .route('/:id/priority/:value')
  .put(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.priorityTodoId
  );

router
  .route('/:id/hide')
  .put(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.hideTodoId
  );

router
  .route('/:id/finished')
  .put(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.finishTodoId
  );

router
  .route('/set-incomplete')
  .put(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.incompleteTodos
  );

router
  .route('/:id')
  .delete(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.deleteTodoId
  );

router
  .route('/')
  .delete(
    passport.authenticate(
      // strategy
      'jwt',
      // using tokens no need for sessions
      { session: false }
    ),

    controller.deleteTodos
  );

module.exports = router;
