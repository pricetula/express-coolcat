let port = process.env.PORT || 3030;
let url;
let mongoDBconnectionUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://coolcat:funguamlab1@ds129146.mlab.com:29146/coolcat';

if (process.env.NODE_ENV === 'test') {
  port = 3031;
  mongoDBconnectionUri = 'mongodb://coolcattest:test123@ds137826.mlab.com:37826/coolcattest';
}

if (process.env.NODE_ENV === 'production') {
  url = 'https://express-coolcat.herokuapp.com';
} else {
  url = `http://localhost:${port}`;
}

module.exports = {
  port,

  url,

  mongoDBconnectionUri,

  // development only
  mongoDBoptions: {
    useMongoClient: true
  }
};
