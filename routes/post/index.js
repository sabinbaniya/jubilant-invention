const router = require("express").Router();
const create = require("../../controllers/posts/create");
const getAllPost = require("../../controllers/posts/getAllPosts");
const getPostDetail = require("../../controllers/posts/getPostDetail");
const GetPostDetailFromCreate = require("../../controllers/posts/getPostDetailFromCreate");
const update = require("../../controllers/posts/update");

router
  .post("/create", create)
  .get("/getAllPosts", getAllPost)
  .post("/getPostDetail/:id", getPostDetail)
  .post("/create/getPostDetail/:id", GetPostDetailFromCreate)
  .post("/update", update);

module.exports = router;
