const joi = require('joi');

module.exports = {
  signinValidation: (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required()
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
      firstName: joi.string().alphanum().min(2).max(30).required(),
      lastName: joi.string().alphanum().min(2).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().required()
    });

    const validatedUser = joi.validate(
      req.body,
      schema
    );

    if (validatedUser.error) {
      res.status(400).json(
        process.env.NODE_ENV === 'production'
          ? validatedUser.error.details[0].message
          : validatedUser.error
      );
    } else {
      if (req.validUser) { req.validUser = {}; }

      req['validUser'] = validatedUser.value;

      next();
    }
  }
};
