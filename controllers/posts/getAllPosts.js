const Posts = require("../../models/posts");

const GetAllPost = async (req, res) => {
  try {
    const page = req.query.page || 0;
    const resultPerPage = 8;
    const posts = await Posts.find({ visibility: "public" })
      .sort({ createdAt: -1 })
      .limit(resultPerPage)
      .skip(resultPerPage * page)
      .lean();
    return res.json({ success: true, data: posts });
  } catch (error) {
    console.log(error, "/api/posts/getAllPosts");
    return res.json({ success: false, data: "Failed to retrieve all posts" });
  }
};

module.exports = GetAllPost;
