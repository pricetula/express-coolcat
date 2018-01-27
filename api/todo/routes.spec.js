import { currentId } from 'async_hooks';

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
    let testTodoId = null;

    const token = tokenGenerator(testUser.id);

    const testTodo2 = {
      item: faker.lorem.word(),
      description: faker.lorem.paragraph(),
      dueDate: moment(new Date())
        .add(1, 'h')
        .toDate(),
      localId: faker.random.alphaNumeric(),
      startDate: new Date()
    };

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
      'Get todos',
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

    it(
      'Add todo',
      function (done) {
        chai
          .request(app)
          .post('/todos/')
          .set('content-type', 'application/json')
          .set('Authorization', token)
          .send(
            testTodo2
          )
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
                  'todo',
                  'message'
                ],
                'Response Status not properties missing'
              );

              assert.isString(
                res.body.message
              );

              assert.strictEqual(
                res.body.message,
                'Todo Added'
              );

              assert.isObject(
                res.body.todo
              );

              assert.deepInclude(
                {
                  ...res.body.todo,
                  startDate: moment(
                    res.body.todo.startDate
                  ).toDate(),
                  dueDate: moment(
                    res.body.todo.dueDate
                  ).toDate()
                },
                {
                  details: {
                    item: testTodo2.item,
                    description: testTodo2.description
                  },
                  startDate: testTodo2.startDate,
                  dueDate: testTodo2.dueDate,
                  localId: testTodo2.localId,
                  owner: testUser._id
                }
              );

              testTodoId = res.body.todo._id;

              return done();
            }
          );
      }
    );

    it(
      'Get one todo with id',
      function (done) {
        chai
          .request(app)
          .get(`/todos/${testTodoId}`)
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
                  'todo',
                  'message'
                ],
                'Response Status not properties missing'
              );

              assert.isString(
                res.body.message
              );

              assert.strictEqual(
                res.body.message,
                'Todo Found'
              );

              assert.isObject(
                res.body.todo
              );

              assert.deepInclude(
                {
                  ...res.body.todo,
                  startDate: moment(
                    res.body.todo.startDate
                  ).toDate(),
                  dueDate: moment(
                    res.body.todo.dueDate
                  ).toDate()
                },
                {
                  details: {
                    item: testTodo2.item,
                    description: testTodo2.description
                  },
                  startDate: testTodo2.startDate,
                  dueDate: testTodo2.dueDate,
                  localId: testTodo2.localId,
                  owner: testUser._id
                }
              );

              testTodoId = res.body.todo._id;

              return done();
            }
          );
      }
    );

    it(
      'Hide one todo with id',
      function (done) {
        chai
          .request(app)
          .put(`/todos/${testTodoId}/hide`)
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
                200
              );

              assert.isTrue(
                res.body.todo.status.hide
              );

              return done();
            }
          );
      }
    );

    it(
      'Finish one todo with id',
      function (done) {
        chai
          .request(app)
          .put(`/todos/${testTodoId}/finished`)
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
                200
              );

              assert.isTrue(
                res.body.todo.status.finished
              );

              return done();
            }
          );
      }
    );

    it(
      'Priority one todo with id',
      function (done) {
        chai
          .request(app)
          .put(`/todos/${testTodoId}/priority/2`)
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
                200
              );

              assert.strictEqual(
                res.body.todo.status.priority,
                2
              );

              return done();
            }
          );
      }
    );
  }
);
