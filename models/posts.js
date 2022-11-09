const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    uid: {
      type: Number,
      required: [true, "Please provide a user id"],
    },
    body: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

const Posts = model("Posts", PostSchema);

module.exports = Posts;
