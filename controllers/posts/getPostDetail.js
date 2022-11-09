const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

// checks if a private post is being accessed by a user other than creator
const GetPostDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById({
      _id: id,
    }).lean();

    console.log(req);

    if (!req.body.token) {
      // means logged out user/ external user
      if (post.visibility === "public") {
        return res.json({ success: true, data: post });
      } else {
        return res.json({ success: true, data: "Post is private" });
      }
    }

    const { uid } = jwt.decode(req.body.token);

    // console.log(req.body);

    if (post.visibility === "private" && post.uid !== uid)
      return res.json({ success: true, data: "Post is private" });

    return res.json({ success: true, data: post });
  } catch (error) {
    console.log(error, "/api/posts/getPostDetail");
    return res.json({ success: false, data: "Failed to get post" });
  }
};

module.exports = GetPostDetail;
