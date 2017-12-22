/* eslint-env mocha */
const config = require('./index.js');

describe(
  'API config',
  function () {
    it(
      'Config file is correct',
      function () {
        assert.isObject(
          config,
          'The config file is not an object type'
        );

        assert.deepEqual(
          config,
          {
            port: 3031,
            url: 'http://localhost:3031',
            mongoDBconnectionUri: 'mongodb://127.0.0.1:27017',
            mongoDBoptions: {
              useMongoClient: true
            }
          }
        );
      }
    )
  }
);
