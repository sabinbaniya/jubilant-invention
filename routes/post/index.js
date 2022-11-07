const router = require("express").Router();
const create = require("../../controllers/posts/create");
const GetAllPost = require("../../controllers/posts/getAllPosts");

router.post("/create", create).get("/getAllPosts", GetAllPost);

module.exports = router;
