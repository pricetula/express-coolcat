require('dotenv/config');

const keys = {
  appMailApiKey: process.env.MAILGUN_API_KEY,
  appMailPubKey: process.env.MAILGUN_PUBLIC_KEY,
  appMailDomain: process.env.MAILGUN_DOMAIN,
  appMailSmtpEmail: process.env.MAILGUN_SMTP_LOGIN,
  appMailSmtpPassword: process.env.MAILGUN_SMTP_PASSWORD,
  appMailSmtpPort: process.env.MAILGUN_SMTP_PORT,
  appMailSmtpServer: process.env.MAILGUN_SMTP_SERVER,
  appKey: process.env.COOLCAT_APP_KEY
};

module.exports = keys;
