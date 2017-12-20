require('dotenv/config');

const keys = {
  appMailKey: process.env.COOLCAT_MAIL_APIKEY,
  appMailDomain: process.env.COOLCAT_MAIL_DOMAIN,
  appMailAddress: process.env.COOLCAT_MAIL_EMAIL,
  appKey: process.env.COOLCAT_APP_KEY
};

module.exports = keys;
