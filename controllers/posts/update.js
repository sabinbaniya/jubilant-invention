const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

const update = async (req, res) => {
  if (
    (typeof req.body.privateVisibility === "undefined" &&
      !req.body.title &&
      !req.body.text) ||
    !req.body._id ||
    !req.body.token
  ) {
    return res.json({ success: false, message: "Invalid request" });
  }

  try {
    const post = await Posts.findOne({ _id: req.body._id });
    const { uid } = jwt.decode(req.body.token);

    console.log(post.uid, uid);
    if (post.uid !== uid) {
      return res.json({ success: true, data: "Unauthorized" });
    }
    if (req.body.title) post.title = req.body.title;
    if (typeof req.body.privateVisibility !== "undefined")
      post.visibility = req.body.privateVisibility ? "private" : "public";
    if (req.body.text) post.body = req.body.text;

    console.log(post);
    await post.save();
    return res.json({ success: true, data: post });
  } catch (error) {
    console.log(error, "/api/posts/update");
    return res.json({ success: false, data: "Error ocurred" });
  }
};

module.exports = update;
