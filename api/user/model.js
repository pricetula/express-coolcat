const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
  Schema
} = mongoose;

let UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  details: {
    name: {
      first: {
        type: String,
        required: true
      },
      last: {
        type: String,
        required: true
      }
    }
  },

  token: {
    type: String,
    required: true
  },

  status: {
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  role: {
    type: {
      type: String,
      enum: [
        'admin',
        'client'
      ],
      required: true,
      lowercase: true,
      default: 'client'
    },

    privilege: {
      type: Number,
      min: 0,
      max: 2,
      required: true,
      default: 0
    }
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

UserSchema.pre(
  // Function to run before save method is invoked by mongoose
  'save',
  async function (next) {
    // not using fat arrow functions to use this variable to use field instance
    try {
      // generate salt
      const salt = await bcrypt.genSalt(10);

      // Pass the users password and
      const saltAndHashedPassword = await bcrypt.hash(
        // password field
        this.password,
        salt
      );

      // Overwrite the original password with a combination of salt and hashed password
      this.password = saltAndHashedPassword;

      next();
    } catch (error) {
      // Pass the error it will be handled
      next(error);
    }
  }
);

UserSchema.methods.checkPassword = async function (userPassword) {
  try {
    return await bcrypt.compare(
      userPassword,
      this.password
    );
  } catch (error) {
    throw new Error(error);
  }
}

const UserModel = mongoose.model(
  'User',
  UserSchema
);

module.exports = UserModel;
