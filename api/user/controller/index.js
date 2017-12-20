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
      message: 'Access to admin'
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

  signup: async (req, res, next) => {
    const foundUser = await UserModel.findOne({
      email: req.validUser.email
    });

    if (foundUser) {
      res
        // unauthorized
        .status(401)
        .json(
          {
            message: 'User exists',
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

      await newUser.save();

      const token = tokenGenerator(newUser.id);

      if (process.env.NODE_ENV !== 'test') {
        mailer(
          req.validUser.email,
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
            message: 'user created',
            error: false
          }
        );
    }
  }
};

module.exports = controller;
