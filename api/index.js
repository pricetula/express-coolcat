/* eslint-disable function-paren-newline */
const path = require('path');
const mongoose = require('mongoose');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./user/routes');
const appConfig = require('./config');

const app = express(
);

mongoose.connect(
  appConfig.mongoDBconnectionUri,
  appConfig.mongoDBoptions
);

const db = mongoose.connection;

mongoose.Promise = global.Promise;

db.on(
  'error',
  error => winston.error(error)
);

db.once(
  'open',
  () => winston.info(
    '[-------Database Connected-------]'
  )
);

app.use(
  bodyParser.json(
    {
      type: 'application/json'
    }
  )
);

app.use(
  express.static(
    path.join(
      __dirname,
      'public'
    )
  )
);

app.use(
  '/user',
  userRoutes
);

app.get(
  '/',
  function (
    req,
    res
  ) {
    res
      .sendFile(
        path.join(
          __dirname,
          'public/index.html'
        )
      );
  }
);

app.use(
  function (
    req,
    res,
    next
  ) {
    res
      .status(404)
      .sendFile(
        path.join(
          __dirname,
          'public/404.html'
        )
      );
  }
);

module.exports = app;
