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
            mongoDBconnectionUri: 'mongodb://coolcattest:test123@ds137826.mlab.com:37826/coolcattest',
            mongoDBoptions: {
              useMongoClient: true
            }
          }
        );
      }
    )
  }
);
