const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const CommentSchema = new Schema(
  {
    text: { type: String, maxLength: 140 },
    postId: { type: ObjectId, ref: "Posts" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
