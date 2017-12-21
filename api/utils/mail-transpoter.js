const nodemailer = require('nodemailer');
const {
  appMailEmail,
  appMailPassword
} = require('../config/keys');

module.exports = nodemailer.createTransport(
  {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: appMailEmail,
      pass: appMailPassword
    },
    logger: false,
    debug: false // include SMTP traffic in the logs
  }
);
