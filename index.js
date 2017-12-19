/* eslint-disable function-paren-newline */
const winston = require('winston');
const path = require('path');
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

app.use(
  express.static(
    path.join(
      __dirname,
      'public'
    )
  )
);

app.get(
  '/',
  function (
    req,
    res
  ) {
    res
      .sendFile(
        path.join(__dirname + '/public/index.html')
      );
  }
);
//d
app.use(
  function (
    req,
    res,
    next
  ) {
    res
      .status(404)
      .sendFile(
        path.join(__dirname + '/public/404.html')
      );
  }
);

app.listen(
  process.env.PORT || 3030
);

winston.info(
  '🌎 >>> Server started'
);
