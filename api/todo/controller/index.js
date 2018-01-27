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
          startDate: req.body.startDate,
          localId: req.body.localId,
          dueDate: req.body.dueDate,
          owner: req.user._id
        }
      );

      todo
        .save()
        .then(
          todo => res.json(
            {
              todo,
              message: 'Todo Added'
            }
          )
        )
        .catch(next);
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
                message: `Todos Found ${todos.length}`
              }
            );
        }
      }
    );
  },

  getTodoId: (req, res, next) => {
    TodoModel.findOne(
      {
      //  _id: req.params.id,
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
                message: todo ? 'Todo Found' : 'Todo Not Found'
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
                message: 'Todo Hidden'
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
                message: 'Todo Finished'
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
                  message: 'All todos incomplete set'
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
                message: 'Todo Prioritized'
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
                message: 'Todo Deleted'
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
                message: 'Todo Deleted'
              }
            );
        }
      }
    );
  }
};

module.exports = controller;
