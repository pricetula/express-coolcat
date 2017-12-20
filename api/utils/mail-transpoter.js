const nodemailer = require('nodemailer');
const {
  appMailSmtpServer,
  appMailSmtpPort,
  appMailSmtpPassword,
  appMailSmtpEmail
} = require('../config/keys');

module.exports = nodemailer.createTransport(
  {
    host: appMailSmtpServer,
    port: appMailSmtpPort,
    secure: false,
    auth: {
      user: appMailSmtpEmail,
      pass: appMailSmtpPassword
    },
    logger: false,
    debug: false // include SMTP traffic in the logs
  }
);
