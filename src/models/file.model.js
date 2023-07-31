const { Schema, model } = require("mongoose");
const User = require("./user.model");

const fileSchema = new Schema(
  {
    url: {
      type: String,
      require: true,
    },
    public_id: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.name,
      require: true,
    },
  },
  { timestamps: true }
);
const File = model("File", fileSchema);
module.exports = File;
