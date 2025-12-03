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
    let { limit } = req.query;
    limit = limit ? +limit : 3;
    const blogs = await Blogs.find().sort({ createdAt: -1 }).limit(limit);
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

const get_single_blog = async (req, res) => {
  try {
    const { slug } = req.params;

    // 1) Find current blog
    const blog = await Blogs.findOne({ slug });

    if (!blog) {
      return res
        .status(404)
        .json({ status: false, message: "Blog Not Found!" });
    }

    // 2) Fetch other blogs excluding the current one (max 3)
    const relatedBlogs = await Blogs.find({ slug: { $ne: slug } })
      .sort({ createdAt: -1 }) // latest first (change if needed)
      .limit(3);

    return res.status(200).json({
      status: true,
      data: blog,
      relatedBlogs,
      message: "Get Single Blog Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  create_blog,
  get_all_blogs,
  get_single_blog,
};
