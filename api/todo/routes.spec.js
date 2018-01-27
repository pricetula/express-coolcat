/* eslint-env mocha */
const faker = require('faker');
const moment = require('moment');
const tokenGenerator = require('../user/utils/tokenGenerator');
const testUser = require('../user/utils/testUser');
const app = require('../api');
const TodoModel = require('./model');

describe(
  'API:Route:Todo',
  function () {
    const token = tokenGenerator(testUser.id);

    const testTodo = {
      details: {
        item: faker.random.word(),
        description: faker.lorem.paragraph()
      },

      owner: faker.random.alphaNumeric(),

      localId: faker.random.alphaNumeric(),

      dueDate: moment(new Date()).add(1, 'm').toDate()
    };

    before(
      function (done) {
        const existingTodo = new TodoModel(
          testTodo
        );

        existingTodo
          .save()
          .then(() => done())
          .catch(done)
      }
    )

    after(
      function (done) {
        TodoModel.collection.drop();

        done();
      }
    )

    it(
      'Get todo',
      function (done) {
        chai
          .request(app)
          .get('/todos/')
          .set('content-type', 'application/json')
          .set('Authorization', token)
          .end(
            (err, res) => {
              // NOTE chai-http fails with error if unauthorised access
              if (err) {
                // handle error caught
              }

              assert.strictEqual(
                res.status,
                200,
                'Response Status not 200'
              );

              assert.containsAllKeys(
                res.body,
                [
                  'todos',
                  'message'
                ],
                'Response Status not properties missing'
              );

              assert.isString(
                res.body.message
              );

              assert.isArray(
                res.body.todos
              );

              assert.lengthOf(
                res.body.todos,
                1
              );

              assert.deepInclude(
                {
                  ...res.body.todos[0],
                  dueDate: moment(
                    res.body.todos[0].dueDate
                  ).toDate()
                },
                testTodo
              );

              return done();
            }
          );
      }
    );
  }
);
