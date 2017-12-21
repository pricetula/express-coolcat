const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiJoi = require('chai-joi');

chai.use(chaiJoi);
chai.use(chaiHttp);

global.chai = chai;
global.assert = chai.assert;
