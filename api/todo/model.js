const mongoose = require('mongoose');

const {
  Schema
} = mongoose;

let TodoSchema = new Schema({
  details: {
    item: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      default: ''
    }
  },

  owner: {
    type: String,
    required: true
  },

  localId: {
    type: String,
    required: true
  },

  status: {
    priority: {
      type: Number,
      min: 0,
      max: 2,
      required: true,
      default: 0
    },
    hide: {
      type: Boolean,
      required: true,
      default: false
    },
    incomplete: {
      type: Boolean,
      required: true,
      default: false
    },
    finished: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  startDate: {
    type: Date,
    required: true,
    default: Date.now
  },

  dueDate: {
    type: Date,
    required: true
  },

  finishedOn: {
    type: Date,
    required: false
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const TodoModel = mongoose.model(
  'Todo',
  TodoSchema
);

module.exports = TodoModel;
