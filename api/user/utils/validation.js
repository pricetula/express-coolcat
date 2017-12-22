const joi = require('joi');

module.exports = {
  signinValidation: (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().email().error(new Error('Email Missing')).required(),
      password: joi.string().error(new Error('Password Missing')).required()
    });

    const validatedUser = joi.validate(
      req.body,
      schema
    );

    if (validatedUser.error) {
      res.status(400).json(validatedUser.error);
    } else {
      if (req.validUser) { req.validUser = {}; }

      req['validUser'] = validatedUser.value;

      next();
    }
  },

  signupValidation: (req, res, next) => {
    const schema = joi.object().keys({
      firstName: joi.string().alphanum().error(new Error('First name is short or missing')).min(2).max(30).required(),
      lastName: joi.string().alphanum().error(new Error('Second name is short or missing')).min(2).max(30).required(),
      email: joi.string().email().error(new Error('Email missing')).required(),
      password: joi.string().error(new Error('Password missing')).required()
    });

    const validatedUser = joi.validate(
      req.body,
      schema
    );

    if (validatedUser.error) {
      res.status(400).json(validatedUser.error);
    } else {
      // Make sure valid user is empty
      if (req.validUser) { req.validUser = {}; }

      req['validUser'] = validatedUser.value;

      next();
    }
  }
};
