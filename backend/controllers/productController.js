const Products = require("../model/productModel");

const create_product = async (req, res) => {
  try {
    const {
      title,
      verity,
      isGold,
      price,
      productType,
      wineType,
      quantity,
      slug,
      isFeatured
    } = req.body;

    if (!req.file) {
      res
        .status(400)
        .json({ status: false, message: "Product Image is required!" });
    }

    if (
      [
        title,
        verity,
        isGold,
        price,
        productType,
        wineType,
        quantity,
        slug,
      ].some((item) => item === "" || item === undefined)
    ) {
      res.status(400).json({ status: false, message: "All fieled required!" });
    }

    await Products.create({
      productImage: `http://localhost:${process.env.PORT}/product/products/${req.file.filename}`,
      title,
      verity,
      isGold,
      price,
      productType,
      wineType,
      quantity,
      slug,
      isFeatured
    });
    res.status(201).json({ status: true, message: "Product Created!" });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const get_all_products = async (req, res) => {
  try {
    const products = await Products.find();
    if (products.length === 0) {
      res.status(400).json({ status: false, message: "Empty Product!" });
    }
    res.status(200).json({
      status: true,
      data: products,
      message: "Get All Products Successfully!",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const get_filtered_products = async (req, res) => {
  try {
    // Extract from query (always strings)
    let {
      grape,
      productType,
      availability,
      minPrice = 0,
      maxPrice = 10000,
      sort = "A-Z",
      page = 1,
      limit = 7,
    } = req.query;

    // Convert query params to arrays safely
    const toArray = (param) => {
      if (!param) return [];
      if (Array.isArray(param)) return param;
      return [param]; // wrap single string as array
    };

    grape = toArray(grape);
    productType = toArray(productType);
    availability = toArray(availability);

    const query = {};

    // GRAPE FILTER
    if (grape.length > 0) {
      query.wineType = { $in: grape };
    }

    // PRODUCT TYPE FILTER
    if (productType.length > 0) {
      query.productType = { $in: productType };
    }

    // AVAILABILITY FILTER
    if (availability.length > 0) {
      query.availability = { $in: availability };
    }

    // PRICE FILTER
    query.price = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice),
    };

    // BASIC QUERY
    let dbQuery = Products.find(query);

    // SORTING
    if (sort === "A-Z") dbQuery = dbQuery.sort({ title: 1 });
    if (sort === "Z-A") dbQuery = dbQuery.sort({ title: -1 });
    if (sort === "Low-High") dbQuery = dbQuery.sort({ price: 1 });
    if (sort === "High-Low") dbQuery = dbQuery.sort({ price: -1 });

    // PAGINATION
    page = Number(page);
    limit = Number(limit);

    const skip = (page - 1) * limit;
    const total = await Products.countDocuments(query);

    const products = await dbQuery.skip(skip).limit(limit);

    return res.status(200).json({
      status: true,
      data: products,
      pagination: {
        currentPage: page,
        totalProducts: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const get_single_product = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Products.findOne({ slug: slug });
    if (!product) {
      res.status(404).json({ status: false, message: "Product Not Found!" });
    }

    let relatedQuery = {
      slug: { $ne: product.slug },
    };

    let relatedProducts = await Products.find(relatedQuery).limit(3);

    return res.status(200).json({
      status: true,
      data: {
        product,
        relatedProducts,
      },
      message: "Get Single Product Successfully.",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const get_featured_products = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 3;

    const featuredProducts = await Products.find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .limit(limit);

    if (featuredProducts.length === 0) {
      return res.status(200).json({
        status: true,
        data: [],
        message: "No featured products found.",
      });
    }

    return res.status(200).json({
      status: true,
      data: featuredProducts,
      message: "Featured products fetched successfully.",
    });

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


module.exports = {
  create_product,
  get_all_products,
  get_filtered_products,
  get_single_product,
  get_featured_products,
};
