const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

global.chai = chai;
global.assert = chai.assert;
