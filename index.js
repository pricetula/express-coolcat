const winston = require('winston');
const app = require('./api');
const config = require('./api/config');

app.listen(
  config.port
);

if (process.env.NODE_ENV !== 'test') {
  winston.info(
    `🌎 >>> Server started on ${config.url}`
  );
}
