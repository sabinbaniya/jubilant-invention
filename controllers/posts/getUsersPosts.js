const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

const getUsersPosts = async (req, res) => {
  if (!req.body.token) {
    return res.json({ sucess: false, data: "Unauthorized" });
  }
  try {
    const { uid } = jwt.decode(req.body.token);
    const posts = await Posts.find({ uid }).sort({ createdAt: -1 }).lean();
    return res.json({ success: true, data: posts });
  } catch (error) {
    console.log(error, "/api/posts/getUsersPosts");
    return res.json({ success: false, data: "Failed to retrieve all posts" });
  }
};

module.exports = getUsersPosts;
