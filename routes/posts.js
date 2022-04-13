const express = require("express");
const Post = require("../schema/post");
//to manage routes
const router = express.Router();
//Multer
const multer = require("multer");
const apiResponse = require("../constants/constants");
//Object
const upload = multer();
//this will act as /post as we already added middleware in app.js
router.post("/", upload.none(), async function (req, res, next) {
  console.log(req.body.title);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  console.log("SCHEMA DONE=>" + post);
  try {
    console.log("WRITING TO DB");
    const savedPost = await post.save();
    console.log("WRITTEN INTO DB");
    res.status(200).json(apiResponse({ m: "Post Created", r: savedPost, s: 1 }));
  } catch (err) {
    res.json({ message: err });
  }
});

//this will be same as /post/21 , its ez :D
router.get("/21", (req, res) => {
  res.send("Helo 21");
});

module.exports = router;
