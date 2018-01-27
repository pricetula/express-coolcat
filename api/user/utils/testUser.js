const moment = require('moment');

module.exports = {
  _id: 'test_user_id',
  id: 'test_user_id',
  email: 'user@test.mail',
  details: {
    name: {
      first: 'test_name_1',
      last: 'test_name_2'
    }
  },
  token: 'test_token',
  status: {
    active: true,
    emailVerified: true
  },
  role: {
    type: 'admin',
    privilege: 2
  },
  createdAt: moment([2010, 1, 14, 15, 25, 50, 125]).toDate(),
  password: 'test_user_password'
};
