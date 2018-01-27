/* eslint-env mocha */
const faker = require('faker');
const UserModel = require('../model');
const {
  getAuthenticatedUser,
  signinUser
} = require('../utils/getAuthenticatedUser');

describe(
  'API:User:Util:getAuthenticatedUser:with an existing user',
  function () {
    const password = faker.internet.password();

    before(
      function (done) {
        const existingUser = new UserModel(
          {
            password,
            email: faker.internet.email(),
            details: {
              name: {
                first: faker.name.firstName(),
                last: faker.name.lastName()
              }
            },
            token: faker.random.alphaNumeric()
          }
        );

        existingUser
          .save()
          .then(() => done())
          .catch(done)
      }
    )

    after(
      function (done) {
        UserModel.collection.drop();

        done();
      }
    )

    it(
      'getAuthenticatedUser db user',
      function (done) {
        assert.isFunction(getAuthenticatedUser);

        UserModel.findOne(
          {},
          (err, user) => {
            if (err) { }

            getAuthenticatedUser(
              {
                sub: user._id
              },
              (error, usert) => {
                if (error) {
                  return done(error);
                }

                assert.strictEqual(
                  user.id,
                  usert.id
                );

                return done();
              }
            );
          }
        );
      }
    );

    it(
      'getAuthenticatedUser:fail: wrong id',
      function (done) {
        UserModel.findOne(
          {},
          (err, user) => {
            if (err) { }

            getAuthenticatedUser(
              {
                sub: `${user._id}modified`
              },
              (error, usert) => {
                if (error) {
                  assert.strictEqual(
                    error.message,
                    'User Does Not Exist'
                  );
                  assert.strictEqual(
                    error.status,
                    401
                  );
                  return done();
                }

                return done(new Error('Authenticated user incorrectly'));
              }
            );
          }
        );
      }
    );

    it(
      'signinUser db user',
      function (done) {
        assert.isFunction(signinUser);

        UserModel.findOne(
          {},
          (err, user) => {
            if (err) { }

            signinUser(
              user.email,
              password,
              (error, usert) => {
                if (error) {
                  return done(error);
                }

                assert.strictEqual(
                  user.id,
                  usert.id
                );

                return done();
              }
            );
          }
        );
      }
    );

    it(
      'signinUser:fail:wrong email',
      function (done) {
        assert.isFunction(signinUser);

        UserModel.findOne(
          {},
          (err, user) => {
            if (err) { }

            signinUser(
              `modified${user.email}`,
              password,
              (error, usert) => {
                if (error) {
                  assert.strictEqual(
                    error.message,
                    'User Does Not Exist'
                  );
                  assert.strictEqual(
                    error.status,
                    401
                  );
                  return done();
                }

                return done(new Error('Signed In user incorrectly'));
              }
            );
          }
        );
      }
    );

    it(
      'signinUser:fail:wrong password',
      function (done) {
        assert.isFunction(signinUser);

        UserModel.findOne(
          {},
          (err, user) => {
            if (err) { }

            signinUser(
              user.email,
              `${password}modified`,
              (error, usert) => {
                if (error) {
                  assert.strictEqual(
                    error.message,
                    'Incorrect Password or Email combination'
                  );
                  assert.strictEqual(
                    error.status,
                    401
                  );
                  return done();
                }

                return done(new Error('Signed In user incorrectly'));
              }
            );
          }
        );
      }
    );
  }
);
