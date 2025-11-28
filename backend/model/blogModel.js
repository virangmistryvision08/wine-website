const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    blogImage: { type: String },
    title: { type: String },
    description: { type: String },
    by: { type: String },
    slug: { type: String },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", blogSchema);

module.exports = Blogs;
