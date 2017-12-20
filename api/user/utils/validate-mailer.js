const appConfig = require('../../config');
const mailTranspoter = require('../../utils/mail-transpoter');

module.exports = (
  address,
  subject,
  token
) => mailTranspoter.sendMail(
  {
    to: address,
    subject,
    text: `Click link to activate account ${appConfig.url}/user/verify/${token}`
  },
  (err) => console.log(err)
);
