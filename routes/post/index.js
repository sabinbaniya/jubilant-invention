const router = require("express").Router();
const create = require("../../controllers/posts/create");
const deletePost = require("../../controllers/posts/deletePost");
const getAllPost = require("../../controllers/posts/getAllPosts");
const getPostDetail = require("../../controllers/posts/getPostDetail");
const GetPostDetailFromCreate = require("../../controllers/posts/getPostDetailFromCreate");
const getUsersPosts = require("../../controllers/posts/getUsersPosts");
const update = require("../../controllers/posts/update");

router
  .post("/create", create)
  .get("/getAllPosts", getAllPost)
  .post("/getPostDetail/:id", getPostDetail)
  .post("/create/getPostDetail/:id", GetPostDetailFromCreate)
  .post("/update", update)
  .post("/getUsersPosts", getUsersPosts)
  .post("/deletePost/:id", deletePost);

module.exports = router;
