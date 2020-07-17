const { Schema, model } = require("mongoose");

const UserModel = new Schema(
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
  },
  {
    minimize: true,
    timestamps: true,
  }
);

module.exports = model("user", UserModel);
