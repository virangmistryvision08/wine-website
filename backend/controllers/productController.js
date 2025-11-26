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
      limit = 6,
    } = req.query;

    // Convert query params to array if needed
    grape = Array.isArray(grape) ? grape : grape ? grape.split(",") : [];

    productType = Array.isArray(productType)
      ? productType
      : productType
      ? productType.split(",")
      : [];

    availability = Array.isArray(availability)
      ? availability
      : availability
      ? availability.split(",")
      : [];

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
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      res.status(404).json({ status: false, message: "Product Not Found!" });
    }

    let relatedQuery = {
      _id: { $ne: product._id },
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

module.exports = {
  create_product,
  get_all_products,
  get_filtered_products,
  get_single_product,
};
