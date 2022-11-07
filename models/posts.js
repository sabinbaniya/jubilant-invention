const { Schema, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide name"],
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
  },
  {
    timestamps: true,
  }
);

const Posts = model("Posts", PostSchema);

module.exports = Posts;
