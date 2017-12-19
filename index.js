/* eslint-disable function-paren-newline */
const winston = require('winston');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./api/user/routes');

const app = express(
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

app.listen(
  process.env.PORT || 3030
);

winston.info(
  '🌎 >>> Server started'
);
