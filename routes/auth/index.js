const router = require("express").Router();
const github = require("../../controllers/github");

router.post("/github", github);

module.exports = router;
