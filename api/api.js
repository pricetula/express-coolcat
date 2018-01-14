const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./user/routes');
const todoRoutes = require('./todo/routes');
const appConfig = require('./config');

const app = express(
);

app.use(
  cors(
  )
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
  () => {
    if (process.env.NODE_ENV !== 'test') {
      winston.info(
        '[-------Database Connected-------]'
      )
    }
  }
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

app.use(
  '/todos',
  todoRoutes
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
    err,
    req,
    res,
    next
  ) {
    if (!err) {
      next();
    }

    res.status(
      err.status
        ? err.status
        : 500
    ).send(
      err.body || err
    )
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
