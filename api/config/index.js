let port = process.env.PORT || 3030;
let url = 'https://express-coolcat.herokuapp.com';
let mongoDBconnectionUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  `mongodb://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@ds251827.mlab.com:51827/coolcat`;

if (process.env.NODE_ENV === 'development') {
  // 'mongodb://coolcattest:test123@ds137826.mlab.com:37826/coolcattest';
  mongoDBconnectionUri = 'mongodb://127.0.0.1:27017/coolcat';
}

if (process.env.NODE_ENV === 'test') {
  port = 3031;
  // 'mongodb://coolcattest:test123@ds137826.mlab.com:37826/coolcattest';
  mongoDBconnectionUri = 'mongodb://127.0.0.1:27017';
}

if (process.env.NODE_ENV !== 'production') {
  url = `http://localhost:${port}`;
}

module.exports = {
  port,

  url,

  mongoDBconnectionUri,

  mongoDBoptions: {
    useMongoClient: true
  }
};
