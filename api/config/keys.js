require('dotenv/config');

const keys = {
  appKey: process.env.COOLCAT_APP_KEY,
  appMailEmail: process.env.COOLCAT_EMAIL,
  appMailPassword: process.env.COOLCAT_PASSWORD,
  appMongoUser: process.env.MONGO_DB_USER,
  appMongoPassword: process.env.MONGO_DB_PASS
};

module.exports = keys;
