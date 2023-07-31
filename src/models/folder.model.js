const { Schema, model } = require("mongoose");
const User = require("./user.model");
const File = require("./file.model");

const folderSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.name,
      required: true,
    },
    files: [
      {
        type: Schema.Types.ObjectId,
        ref: File.name,
      },
    ],
  },
  { timestamps: true }
);
const Folder = model("Folder", folderSchema);
module.exports = Folder;
