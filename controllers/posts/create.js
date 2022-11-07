const Posts = require("../../models/posts");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  if (!req.body.text) {
    return res.json({ success: false, message: "No text supplied" });
  }

  const { uid, name, image } = jwt.decode(req.body.token);
  const title = req.body.text.split("#")[1];

  const post = await Posts.findOne({
    uid,
    title,
  });

  if (!post) {
    const newPost = await Posts.create({
      uid,
      title,
      body: req.body.text,
      image,
      name,
    });

    return res.json({ success: true, data: newPost });
  } else {
    post.body = req.body.text;
    await post.save();
    return res.json({ success: true, data: post });
  }
};

module.exports = create;
