/* eslint-env mocha */
const faker = require('faker');
const {
  pick
} = require('lodash/object');
const app = require('../api');
const UserModel = require('./model');

describe(
  'API:Route:User',
  function () {
    const testUser = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password()
    };

    const testUser2 = {
      email: 'xxxxx@aaaa.cc',
      firstName: 'aaaaaa',
      lastName: 'ddddddd',
      password: 'ffffff'
    };

    let token = false;

    before(
      function (done) {
        const existingUser = new UserModel(
          {
            email: testUser2.email,
            password: testUser2.password,
            details: {
              name: {
                first: testUser2.firstName,
                last: testUser2.lastName
              }
            },
            token: 'ddddd'
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
      'Prevent Unauthorized Access',
      function (done) {
        chai
          .request(app)
          .get('/user/')
          .end(
            (err, res) => {
              // NOTE chai-http fails with error if unauthorised access
              assert.strictEqual(
                res.status,
                401,
                'Response Status not 401'
              );

              if (err) {
                // handle error caught
              }

              return done();
            }
          );
      }
    );

    it(
      'Prevent Signin of Unregistered User',
      function (done) {
        chai
          .request(app)
          .post('/user/signin')
          .set('content-type', 'application/json')
          .send({
            email: faker.internet.email(),
            password: faker.internet.password()
          })
          .end(
            (err, res) => {
              // NOTE chai-http fails with error if unauthorised access
              assert.strictEqual(
                res.status,
                401,
                'Response Status not 401'
              );

              if (err) {
                // handle error caught
              }

              return done();
            }
          );
      }
    );

    it(
      'Prevent Signup if missing either password, email or names',
      function (done) {
        chai
          .request(app)
          .post('/user/signup')
          .set('content-type', 'application/json')
          .send(
            pick(
              testUser,
              [
                'email',
                'password'
              ]
            )
          )
          .end(
            (err, res) => {
              assert.strictEqual(
                res.status,
                400,
                'Response Status not 400'
              );

              if (err) {
                // handle error caught
              }

              return done();
            }
          );
      }
    );

    it(
      'Prevent Signup if first name missing',
      function (done) {
        chai
          .request(app)
          .post('/user/signup')
          .set('content-type', 'application/json')
          .send(
            {
              ...testUser,
              firstName: ''
            }
          )
          .end(
            (err, res) => {
              // NOTE chai-http fails with error if unauthorised access
              assert.strictEqual(
                res.status,
                400,
                'Response Status not 400'
              );

              assert.strictEqual(
                JSON.parse(res.error.text).message,
                'First name is short or missing',
                'Wrong error for missing name'
              );

              if (err) {}

              return done();
            }
          );
      }
    );

    it(
      'Prevent Signup if first name is short',
      function (done) {
        chai
          .request(app)
          .post('/user/signup')
          .set('content-type', 'application/json')
          .send(
            {
              ...testUser,
              firstName: 'a'
            }
          )
          .end(
            (err, res) => {
              // NOTE chai-http fails with error if unauthorised access
              assert.strictEqual(
                res.status,
                400,
                'Response Status not 400'
              );

              assert.strictEqual(
                JSON.parse(res.error.text).message,
                'First name is short or missing',
                'Wrong error for missing name'
              );

              if (err) { }

              return done();
            }
          );
      }
    );

    it(
      'Signup ok',
      function (done) {
        chai
          .request(app)
          .post('/user/signup')
          .set('content-type', 'application/json')
          .send(
            testUser
          )
          .end(
            (err, res) => {
              // NOTE chai-http fails with error if unauthorised access
              assert.strictEqual(
                res.status,
                201,
                'Response Status not 201'
              );

              assert.containsAllKeys(
                res.body,
                [
                  'token',
                  'message',
                  'error'
                ],
                'Response Status not properties missing'
              );

              assert.isFalse(
                res.body.error,
                'Response error not false'
              );

              assert.strictEqual(
                res.body.message,
                'User Created',
                'Response message incorrect'
              );

              assert.isString(
                res.body.token,
                'Response token not a string type'
              );

              token = res.body.token;

              chai
                .request(app)
                .get('/user/')
                .set('Authorization', token)
                .end(
                  (err, res) => {
                    // NOTE chai-http fails with error if unauthorised access
                    assert.strictEqual(
                      res.status,
                      200,
                      'Response Status not 200'
                    );

                    if (err) {
                      // handle error caught
                    }
                  }
                );

              if (err) {
                // handle error caught
              }

              return done();
            }
          );
      }
    );

    it(
      'Prevent Signup if user exists',
      function (done) {
        chai
          .request(app)
          .post('/user/signup')
          .set('content-type', 'application/json')
          .set('accept', 'application/json')
          .send(
            testUser2
          )
          .end(
            (err, res) => {
              assert.strictEqual(
                res.status,
                401,
                'Response Status not 401'
              );

              assert.containsAllKeys(
                res.body,
                [
                  'message',
                  'error'
                ],
                'Response Status not properties missing'
              );

              assert.isTrue(
                res.body.error,
                'Response error not true'
              );

              assert.strictEqual(
                res.body.message,
                'User Exists',
                'Response message incorrect'
              );

              if (err) {
                // handle error caught
              }

              return done();
            }
          );
      }
    );
  }
);
