const expressPromiseRouter = require('express-promise-router');
const controller = require('./controller');

const router = expressPromiseRouter();

router
  .route('/greeting')
  .get(
    controller.hello
  );

module.exports = router;
