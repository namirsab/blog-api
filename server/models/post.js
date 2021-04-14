const mongoose = require("mongoose");

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    body: String,
    votes: {
      up: {
        type: Number,
        default: 0,
      },
      down: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Posts", PostSchema);
