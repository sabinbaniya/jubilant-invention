const Posts = require("../../models/posts");

const GetAllPost = async (req, res) => {
  try {
    const posts = await Posts.find().limit(100).lean();
    return res.json({ success: true, data: posts });
  } catch (error) {}
};

module.exports = GetAllPost;
