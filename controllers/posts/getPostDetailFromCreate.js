const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

// checks if the requesting person is authorized to request details for edit
const GetPostDetailFromCreate = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById({
      _id: id,
    }).lean();

    const { uid } = jwt.decode(req.body.token);

    if (post.uid !== uid)
      return res.json({ success: true, data: "Post is private" });

    return res.json({ success: true, data: post });
  } catch (error) {
    console.log(error, "/api/posts/getPostDetailFromCreate");
    return res.json({ success: false, data: "Failed to get post" });
  }
};

module.exports = GetPostDetailFromCreate;
