/* eslint-disable function-paren-newline */
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');

const app = express(
);

app.use(
  bodyParser.json(
    {
      type: 'application/json'
    }
  )
);

app.get(
  '/',
  function (
    req,
    res
  ) {
    res.status(
      200
    ).send(
      'Cool Cat'
      );
  }
);

app.listen(
  process.env.PORT || 3030
);

winston.info(
  '🌎 >>> Server started'
);
