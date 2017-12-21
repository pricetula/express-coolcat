/* eslint-env mocha */
const app = require('../index');

describe(
  'API:Routes:User',
  function () {
    it(
      'Home',
      function (done) {
        chai
          .request(app)
          .get('/')
          // .set('Accept', 'application/json')
          .end(
            (err, res) => {
              if (err) {
                return done();
              } else {
                assert.strictEqual(
                  res.status,
                  404,
                  'Response Status not 404 of created user'
                );

                return done();
              }
            }
          );
      }
    );

    it(
      'Admin',
      function (done) {
        chai
          .request(app)
          .get('/admin')
          // .set('Accept', 'application/json')
          .end(
            (err, res) => {
              if (err) {
                console.log(err)
                return done();
              } else {
                assert.strictEqual(
                  res.status,
                  200,
                  'Response Status not 200 of created user'
                );

                assert.deepEqual(
                  {
                    pp:33
                  },
                  {
                    port: 3031,
                    url: 'http://localhost:3031',
                    mongoDBconnectionUri: 'mongodb://coolcattest:test123@ds137826.mlab.com:37826/coolcattest',
                    mongoDBoptions: {
                      useMongoClient: true
                    }
                  }
                );

                return done();
              }
            }
          );
      }
    );
  }
);
