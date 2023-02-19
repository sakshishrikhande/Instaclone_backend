const express = require("express");
const multer = require("multer");


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
var upload = multer({ storage: storage })

const {
  getPosts,
  createPost,
} = require("../controllers/InstaCloneController");

const router = express.Router();

router.route("/").get(getPosts).post(upload.single('postImage'),createPost);


module.exports = router;