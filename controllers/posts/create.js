const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  if (!req.body.text || !req.body.title) {
    return res.json({ success: false, message: "Invalid request" });
  }

  const { uid, name, image } = jwt.decode(req.body.token);

  console.log("here");
  // case of new post
  if (!req.body._id) {
    try {
      const newPost = await Posts.create({
        uid,
        title: req.body.title,
        body: req.body.text,
        image,
        name,
      });

      return res.json({ success: true, data: newPost, created: true });
    } catch (error) {
      return res.json({ success: false, data: "Error ocurred" });
    }
  } else {
    //case of old post updating
    try {
      const { uid } = jwt.decode(req.body.token);

      const post = await Posts.findById({ _id: req.body._id });
      console.log(post.uid, uid);
      if (post.uid !== uid) {
        return res.json({ success: true, data: "Unauthorized" });
      }
      post.title = req.body.title;
      post.body = req.body.text;
      await post.save();
      return res.json({ success: true, data: post });
    } catch (error) {
      console.log(error, "/api/posts/create");
      return res.json({ success: false, data: "Error ocurred" });
    }
  }
};

module.exports = create;
