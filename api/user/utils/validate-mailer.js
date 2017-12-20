const appConfig = require('../../config');
const mailTranspoter = require('../../utils/mail-transpoter');

module.exports = (
  address,
  subject,
  token
) => {
  mailTranspoter.sendMail(
    {
      to: address,
      subject,
      html: `
      <div>
        <p style="font-size:1.2em;color:#444;font-weight:bold;">Click button below activate account</p> 
        <br/>
        <a style="background-color: #CE0985;border: none;border-radius: 1em;color: white;padding: 1em;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;font-weight:bold;" href="${appConfig.url}/user/verify/${token}">Activate</a>
      </div>`
    },
    (err) => console.log(err)
  );
}
