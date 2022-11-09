const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

const deletePost = async (req, res) => {
  if (!req.body.token || !req.body.post_id) {
    return res.json({ success: false, data: "Invalid Request" });
  }
  try {
    const { id } = req.params;
    const { uid } = jwt.decode(req.body.token);
    await Posts.findOneAndDelete({ _id: id, uid: uid });
    return res.json({ success: true, data: "Post deleted sucessfully" });
  } catch (error) {
    console.log(error, "/api/posts/deletePost");
    return res.json({ success: false, data: "Failed to delete post" });
  }
};

module.exports = deletePost;
