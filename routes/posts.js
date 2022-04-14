const express = require("express");
const Post = require("../schema/post");
//to manage routes
const router = express.Router();
//Multer
const multer = require("multer");
const apiResponse = require("../constants/constants");
const post = require("../schema/post");
const { route } = require("express/lib/application");
const { restart } = require("nodemon");
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
    res
      .status(200)
      .json(apiResponse({ m: "Post Created", r: savedPost, s: 1 }));
  } catch (err) {
    res.json({ message: err });
  }
});

//this will be same as /post/allpost , its ez :D
router.get("/allpost", async (req, res) => {
  try {
    const allpost = await Post.find();
    console.log(allpost);
    res
      .status(200)
      .json(apiResponse({ m: "All Post Fetched", r: allpost, s: 1 }));
  } catch (error) {
    res.status(500).json({ message: err });
  }
});

//this will fetch /:postId => post/32
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res
      .status(200)
      .json(apiResponse({ m: "Post successfully fetched", r: post, s: 1 }));
  } catch (err) {
    res.status(500).json(apiResponse({ m: "Failed to get post", s: 0, r: {} }));
  }
});

//DELETE A POST
router.delete("/delete/:postId", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId);
    res
      .status(200)
      .json(apiResponse({ m: "Post successfully deleted", r: post, s: 1 }));
  } catch (err) {
    res
      .status(500)
      .json(apiResponse({ m: "Failed to delete post", s: 0, r: {} }));
  }
});

//Update a Post
router.patch("/update/:postId", upload.none(), async function (req, res, next) {
  try {
    const post = await Post.updateOne(
      { _id: req.params.postId },
      {
        $set: { title: req.body.title },
        $set: { description: req.body.description },
      }
    );
    res
      .status(200)
      .json(apiResponse({ m: "Post successfully updated", r: post, s: 1 }));
  } catch (err) {
    res
      .status(500)
      .json(apiResponse({ m: "Failed to update post :" + err, s: 0, r: {} }));
  }
});

module.exports = router;
