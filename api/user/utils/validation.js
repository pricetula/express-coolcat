const joi = require('joi');
const ExpressError = require('../../utils/ExpressError');

module.exports = {
  signinValidation: (req, res, next) => {
    const schema = joi.object().keys({
      email: joi
        .string()
        .email()
        .error(
          new ExpressError(
            'Email Missing',
            400
          )
        )
        .required(),

      password: joi
        .string()
        .error(
          new ExpressError(
            'Password Missing',
            400
          )
        )
        .required()
    });

    const validatedUser = joi.validate(
      req.body,
      schema
    );

    if (validatedUser.error) {
      next(validatedUser.error);
    } else {
      if (req.validUser) { req.validUser = {}; }

      req['validUser'] = validatedUser.value;

      next();
    }
  },

  signupValidation: (req, res, next) => {
    const schema = joi.object().keys({
      firstName: joi
        .string()
        .alphanum()
        .error(
          new ExpressError(
            'First name is short or missing',
            400
          )
        )
        .min(2)
        .max(30)
        .required(),

      lastName: joi
        .string()
        .alphanum()
        .error(
          new ExpressError(
            'Second name is short or missing',
            400
          )
        )
        .min(2)
        .max(30)
        .required(),

      email: joi
        .string()
        .email()
        .error(
          new ExpressError(
            'Email missing',
            400
          )
        )
        .required(),

      password: joi
        .string()
        .error(
          new ExpressError(
            'Password missing',
            400
          )
        )
        .required()
    });

    const validatedUser = joi.validate(
      req.body,
      schema
    );

    if (validatedUser.error) {
      next(validatedUser.error);
    } else {
      // Make sure valid user is empty
      if (req.validUser) { req.validUser = {}; }

      req['validUser'] = validatedUser.value;

      next();
    }
  }
};
