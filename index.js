/* eslint-disable function-paren-newline */
const winston = require('winston');
const app = require('./api');
const config = require('./api/config');

app.listen(
  config.port
);

winston.info(
  `🌎 >>> Server started on ${config.url}`
);
