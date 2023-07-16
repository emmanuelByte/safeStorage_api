const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = model("User", userSchema);
module.exports = User;
