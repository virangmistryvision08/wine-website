const Blogs = require("../model/blogModel");

const create_blog = async (req, res) => {
  try {
    const { title, description, by, slug } = req.body;
    if (
      [title, description, by, slug].some(
        (item) => item === "" || item === undefined
      )
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All fieled required!" });
    }
    if (!req.file) {
      return res
        .status(400)
        .json({ status: false, message: "Blog Image required!" });
    }
    await Blogs.create({
      blogImage: `http://localhost:${process.env.PORT}/product/blogs/${req.file.filename}`,
      title,
      description,
      by,
      slug,
    });
    return res.status(201).json({ status: true, message: "Blog Created." });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_blogs = async (req, res) => {
  try {
    const blogs = await Blogs.find();
    if (blogs.length === 0) {
      return res.status(400).json({ status: false, message: "Empty Blog!" });
    }
    return res.status(200).json({
      status: true,
      data: blogs,
      message: "Get All Blogs Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_blog,
  get_all_blogs,
};
