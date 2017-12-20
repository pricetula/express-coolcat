const appConfig = require('../../config');
const mailer = require('../../utils/mailer');

module.exports = (
  address,
  subject,
  token
) => mailer(
  {
    address,
    subject,
    message: `Click link to activate account ${appConfig.url}/user/verify/${token}`
  }
);
