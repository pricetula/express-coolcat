require('dotenv/config');

const keys = {
  appMailKey: process.env.COOLCAT_MAIL_APIKEY,
  appMailDomain: process.env.COOLCAT_MAIL_DOMAIN,
  appMailAddress: process.env.COOLCAT_MAIL_EMAIL
};

export default keys;
