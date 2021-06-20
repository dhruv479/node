const { Schema, model } = require('mongoose');

const UserTypes = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
    },

    email: {
      type: String,
      required: true,
      minlength: 10,
    },

    password: {
      type: String,
      required: true,
      minlength: 10,
    },

    type: {
      type: String,
      required: true,
      enum: Object.values(UserTypes),
      default: UserTypes.USER,
    },
  },
  {
    minimize: true,
    timestamps: true,
  }
);

const UserModel = model('user', UserSchema);

module.exports = { UserModel, UserTypes };
