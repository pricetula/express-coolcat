const jwt = require('jsonwebtoken');
const appKey = require('../../config/keys').appKey;

const tokenGenerator = (
  userId
) => jwt.sign(
  {
    // Issuer
    iss: 'rest-coolcat-app',
    // User id used for refrence
    sub: userId,
    // Issued at date
    iat: new Date().getTime(),
    // Expiration of jwt token after one day or future date
    exp: new Date().setDate(
      new Date().getDate() + 1
    )
  },
  appKey
);

module.exports = tokenGenerator;
