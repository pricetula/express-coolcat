const mailgun = require('mailgun-js');
const {
  appMailKey,
  appMailDomain,
  appMailAddress
} = require('../config/keys');

module.exports = function (
  {
    address,
    subject,
    message
  }
) {
  const email = {
    from: `Coolcat Dev <${appMailAddress}>`,
    to: address,
    subject,
    text: message
  };

  mailgun(
    {
      apiKey: appMailKey,
      domain: appMailDomain
    }
  )
    .messages()
    .send(
      email,

      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
}
