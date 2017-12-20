const moment = require('moment');
const TodoModel = require('../model');

const controller = {
  addTodo: (req, res, next) => {
    try {
      const todo = new TodoModel(
        {
          details: {
            item: req.body.item,
            description: req.body.description
          },
          dueDate: moment(new Date()).add(1, 'm'),
          owner: req.user._id
        }
      );

      todo.save();

      res.json(
        {
          message: 'Todo Added',
          error: false
        }
      );
    } catch (err) {
      next(err);
    }
  },

  getTodos: (req, res, next) => {
    TodoModel.find(
      (err, todos) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                todos,
                message: `Todos Found ${todos.length}`,
                error: false
              }
            );
        }
      }
    );
  },

  getTodoId: (req, res, next) => {
    TodoModel.findOne(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      (err, todo) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                todo,
                message: todo ? 'Todo Found' : 'Todo Not Found',
                error: false
              }
            );
        }
      }
    );
  },

  hideTodoId: (req, res, next) => {
    TodoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        $set: {
          'status.hide': true
        }
      },
      {
        new: true
      },
      (err, todo) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                todo,
                message: 'Todo Hidden',
                error: false
              }
            );
        }
      }
    );
  },

  finishTodoId: (req, res, next) => {
    TodoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        $set: {
          'status.finished': true
        }
      },
      {
        new: true
      },
      (err, todo) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                todo,
                message: 'Todo Finished',
                error: false
              }
            );
        }
      }
    );
  },

  incompleteTodos: (req, res, next) => {
    TodoModel
      .where(
        {
          owner: req.user._id,
          dueDate: {
            $lt: new Date()
          },
          'status.incomplete': false
        }
      )
      .setOptions(
        {
          multi: true
        }
      )
      .update(
        {
          $set: {
            'status.incomplete': true
          }
        },
        (err) => {
          if (err) {
            next(err);
          } else {
            res
              .json(
                {
                  message: 'All todos incomplete set',
                  error: false
                }
              );
          }
        }
      );
  },

  priorityTodoId: (req, res, next) => {
    TodoModel.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      {
        $set: {
          'status.priority': req.params.value
        }
      },
      {
        new: true
      },
      (err, todo) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                todo,
                message: 'Todo Prioritized',
                error: false
              }
            );
        }
      }
    );
  },

  deleteTodoId: (req, res, next) => {
    TodoModel.deleteOne(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      (err) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                message: 'Todo Deleted',
                error: false
              }
            );
        }
      }
    );
  },

  deleteTodos: (req, res, next) => {
    TodoModel.deleteOne(
      {
        _id: req.params.id,
        owner: req.user._id
      },
      (err) => {
        if (err) {
          next(err);
        } else {
          res
            .json(
              {
                message: 'Todo Deleted',
                error: false
              }
            );
        }
      }
    );
  }
};

module.exports = controller;
