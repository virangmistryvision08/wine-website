const { default: mongoose } = require("mongoose");
const Carts = require("../model/cartModel");
const { v4: uuidv4 } = require("uuid");
const Products = require("../model/productModel");
const Users = require("../model/userModel");

// Commont Function for Checking Products Availability
const checkProductAvailable = async (productId, quantity = 1) => {
  const product = await Products.findById(productId);

  if (!product) return { ok: false, message: "Product not found" };

  // If availability (enum) exists
  if (product.availability && product.availability !== "in_stock") {
    return { ok: false, message: "Product is out of stock" };
  }

  // If using stock number
  if (product.stock !== undefined && product.stock < quantity) {
    return { ok: false, message: "Not enough stock available" };
  }

  return { ok: true, product };
};

const add_to_cart = async (req, res) => {
  try {
    const { productId, quantity, guestId } = req.body;
    const userId = req.user ? req.user.userId : null;

    // ------------------------------------------
    // GET PRODUCT
    // ------------------------------------------
    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    // ------------------------------------------
    // CHECK STOCK AVAILABILITY
    // ------------------------------------------
    if (product.availability === "out_of_stock" || product.stock <= 0) {
      return res.status(400).json({
        status: false,
        message: "This product is out of stock",
      });
    }

    // ------------------------------------------
    // FIND / CREATE CART
    // ------------------------------------------
    let cart;

    if (userId) {
      const user = await Users.findById(userId);

      if (user.cartId) {
        cart = await Carts.findOne({ userId: user._id });
      } else {
        cart = await Carts.create({ userId, items: [] });
        user.cartId = cart._id;
        await user.save();
      }
    } else {
      if (guestId) {
        cart = await Carts.findOne({ guestId });
      }

      if (!cart) {
        const newGuestId =
          guestId || Math.random().toString(36).substring(2, 12);
        cart = await Carts.create({ guestId: newGuestId, items: [] });
      }
    }

    // ------------------------------------------
    // CHECK CART ITEM STOCK LIMIT
    // ------------------------------------------
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          status: false,
          message: `Only ${product.stock} units available in stock`,
        });
      }

      existingItem.quantity += quantity;

    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          status: false,
          message: `Only ${product.stock} units available in stock`,
        });
      }

      cart.items.push({ productId, quantity });
    }

    await cart.save();

    res.json({
      status: true,
      message: "Cart updated",
      cart,
      assignedGuestId: cart.guestId || null,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const convertToGuestCart = async (req, res) => {
  try {
    const { userCartId } = req.body;

    let cart = await Carts.findOne({
      userId: new mongoose.Types.ObjectId(userCartId),
    });

    if (!cart) {
      return res.status(404).json({ status: false, message: "Cart not found" });
    }

    cart.guestId = userCartId; // make guestId = cart id
    cart.userId = null; // remove user ownership
    await cart.save();

    return res.status(200).json({
      status: true,
      guestId: cart.guestId,
      message: "User cart converted to guest cart",
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const tokenUser = req.user;
    const { guestId, productId, type } = req.body;

    let cart;

    // USER CART
    if (tokenUser) {
      cart = await Carts.findOne({
        userId: new mongoose.Types.ObjectId(tokenUser.userId),
      });
    }
    // GUEST CART
    else if (guestId) {
      cart = await Carts.findOne({ guestId });
    } else {
      return res.status(400).json({
        status: false,
        message: "guestId or token required",
      });
    }

    if (!cart) {
      await Carts.create({
        userId: tokenUser.id || null,
        guestId: tokenUser.id ? null : guestId,
        items: [{ productId, quantity: 1 }],
      });
      return res.status(201).json({ status: true, message: "Added in Cart." });
    }

    const index = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (index < 0) {
      return res
        .status(404)
        .json({ status: false, message: "Item not in cart" });
    }

    // INCREMENT OR DECREMENT
    // if (type === "inc") {
    //   cart.items[index].quantity += 1;
    // }
    if (type === "inc") {
      const check = await checkProductAvailable(
        productId,
        cart.items[index].quantity + 1
      );
      if (!check.ok) {
        return res.status(400).json({
          status: false,
          message: check.message,
        });
      }

      cart.items[index].quantity += 1;
    }

    if (type === "dec") {
      cart.items[index].quantity -= 1;

      // remove item if quantity hits 0
      if (cart.items[index].quantity <= 0) {
        cart.items.splice(index, 1);
      }
    }

    await cart.save();

    return res.status(200).json({
      status: true,
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const get_carts = async (req, res) => {
  try {
    const userId = req.user ? req.user.userId : null;
    const guestId = req.query.guestId;

    let cart;

    if (userId) {
      const user = await Users.findById(userId);
      cart = await Carts.findOne({ userId: user._id }).populate(
        "items.productId"
      );
    } else if (guestId) {
      cart = await Carts.findOne({ guestId }).populate("items.productId");
    }

    res.json({
      status: true,
      cart: cart || [],
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

const remove_from_cart = async (req, res) => {
  try {
    const tokenUser = req.user;
    const { guestId, productId } = req.body;

    let cart;

    // ------------------------------------------
    // 1) FIND CART (USER OR GUEST)
    // ------------------------------------------
    if (tokenUser) {
      cart = await Carts.findOne({ userId: tokenUser.userId });
    } else if (guestId) {
      cart = await Carts.findOne({ guestId });
    } else {
      return res.status(400).json({
        status: false,
        message: "guestId or token required",
      });
    }

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    // ------------------------------------------
    // 2) REMOVE PRODUCT FROM CART ITEMS
    // ------------------------------------------
    const prevLength = cart.items.length;

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // product not found
    if (cart.items.length === prevLength) {
      return res.status(404).json({
        status: false,
        message: "Product not found in cart",
      });
    }

    // ------------------------------------------
    // 3) HANDLE EMPTY CART → DELETE CART
    // ------------------------------------------
    if (cart.items.length === 0) {
      await Carts.deleteOne({ _id: cart._id });

      return res.status(200).json({
        status: true,
        message: "Product removed. Cart is empty and deleted.",
        cart: null,
      });
    }

    // ------------------------------------------
    // 4) SAVE UPDATED CART
    // ------------------------------------------
    await cart.save();
    await cart.populate("items.productId");

    return res.status(200).json({
      status: true,
      message: "Product removed from cart",
      cart,
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  add_to_cart,
  convertToGuestCart,
  updateQuantity,
  get_carts,
  remove_from_cart,
};
