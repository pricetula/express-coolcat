const randomstring = require('randomstring');
const UserModel = require('../model');
const tokenGenerator = require('../utils/tokenGenerator');
const mailer = require('../utils/validate-mailer');

const controller = {
  logout: (req, res, next) => {
    req.logout();

    res.json({
      message: 'User logged out'
    });
  },

  admin: (req, res, next) => {
    res.json({
      user: req.user,
      message: 'Access to admin',
      error: false
    });
  },

  verify: (req, res, next) => {
    UserModel.findOneAndUpdate(
      {
        token: req.params.token
      },
      {
        $set: {
          token: '',
          'status.emailVerified': true
        }
      },
      {
        new: true
      },
      (err, user) => {
        if (err) {
          next(err);
        } else {
          if (user) {
            res
              .json(
                {
                  user,
                  message: 'Email verified',
                  error: false
                }
              );
          } else {
            res
              // unauthorized
              .status(401)
              .json(
                {
                  message: 'User not found',
                  error: true
                }
              );
          }
        }
      }
    );
  },

  signin: (req, res, next) => {
    res.json({
      user: req.user,
      token: tokenGenerator(req.user.id),
      message: 'Access to admin'
    });
  },

  signup: (req, res, next) => {
    UserModel.findOne(
      {
        email: req.validUser.email
      },
      (err, user) => {
        if (err) {
          next(err);
        } else {
          if (user) {
            res
              .status(401)
              .json(
                {
                  message: 'User Exists',
                  error: true
                }
              );
          } else {
            const userToken = randomstring.generate(10);

            const newUser = new UserModel(
              {
                email: req.validUser.email,
                password: req.validUser.password,
                details: {
                  name: {
                    first: req.validUser.firstName,
                    last: req.validUser.lastName
                  }
                },
                token: userToken
              }
            );

            newUser
              .save()
              .then(
                () => {
                  const token = tokenGenerator(newUser.id);

                  if (process.env.NODE_ENV !== 'test') {
                    mailer(
                      `${req.validUser.firstName} <${req.validUser.email}>`,
                      'Cool Cat Email Validation',
                      userToken
                    );
                  }

                  res
                    // resource created
                    .status(201)
                    .json(
                      {
                        token,
                        message: 'User Created',
                        error: false
                      }
                    );
                }
              )
              .catch(console.log);
          }
        }
      }
    );
  }
};

module.exports = controller;
