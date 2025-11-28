const express = require("express");
const { create_blog, get_all_blogs } = require("../controllers/blogController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/blogs");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

router.post("/create-blog", upload.single("blogImage"), create_blog);
router.get("/get-all-blogs", get_all_blogs);

module.exports = router;
