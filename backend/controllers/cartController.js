const { default: mongoose } = require("mongoose");
const Carts = require("../model/cartModel");
const { v4: uuidv4 } = require("uuid");

// // 1) INIT GUEST CART
// const initGuestCart = async (req, res) => {
//   try {
//     let { guestId } = req.body;
//     const { productId, quantity } = req.body;

//     // if guestId not present → create new guest cart
//     if (!guestId) guestId = uuidv4();

//     let cart = await Carts.findOne({ guestId });

//     if (!cart) {
//       cart = await Carts.create({
//         guestId,
//         items: [{ productId, quantity }],
//       });
//     } else {
//       // Add or update item
//       const index = cart.items.findIndex(
//         (item) => item.productId.toString() === productId
//       );
//       if (index >= 0) cart.items[index].quantity += quantity;
//       else cart.items.push({ productId, quantity });
//       await cart.save();
//     }

//     return res.status(200).json({ status: true, guestId, cart });
//   } catch (err) {
//     return res.status(500).json({ status: false, message: err.message });
//   }
// };

// // 2) ADD TO CART (User or Guest)
// const add_to_cart = async (req, res) => {
//   try {
//     const tokenUser = req.user;
//     const { guestId, productId, quantity } = req.body;

//     let cart;

//     // Logged-in user
//     if (tokenUser) {
//       cart = await Carts.findOne({ userId: tokenUser.id });

//       // If user has no cart yet
//       if (!cart) {
//         cart = await Carts.create({
//           userId: tokenUser.id,
//           items: [{ productId, quantity }],
//         });
//         return res.status(200).json({ status: true, cart });
//       }
//     }

//     // Guest user
//     else if (guestId) {
//       cart = await Carts.findOne({ guestId });

//       if (!cart) {
//         cart = await Carts.create({
//           guestId,
//           items: [{ productId, quantity }],
//         });
//         return res.status(200).json({ status: true, cart });
//       }
//     } else {
//       return res.status(400).json({
//         status: false,
//         message: "guestId or token required",
//       });
//     }

//     // Add or update item
//     const index = cart.items.findIndex(
//       (item) => item.productId.toString() === productId
//     );

//     if (index >= 0) cart.items[index].quantity += quantity;
//     else cart.items.push({ productId, quantity });

//     await cart.save();

//     return res.status(200).json({ status: true, cart });
//   } catch (err) {
//     return res.status(500).json({ status: false, message: err.message });
//   }
// };

// // 3) MERGE GUEST CART → USER CART
// const mergeGuestCart = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { guestId } = req.body;

//     let userCart = await Carts.findOne({ userId });
//     let guestCart = guestId ? await Carts.findOne({ guestId }) : null;

//     // CASE 1: Guest cart exists but user cart does NOT → convert guest cart
//     if (!userCart && guestCart) {
//       guestCart.userId = userId;
//       guestCart.guestId = null;
//       await guestCart.save();

//       return res.status(200).json({
//         status: true,
//         message: "Guest cart converted to user cart",
//         cart: guestCart,
//         // userCartId: guestCart._id,
//       });
//     }

//     // CASE 2: No guest cart → return user cart (or create empty)
//     if (!guestCart) {
//       if (!userCart) {
//         userCart = await Carts.create({ userId, items: [] });
//       }

//       return res.status(200).json({
//         status: true,
//         message: "No guest cart. Using user's existing cart",
//         cart: userCart,
//         userCartId: userCart._id,
//       });
//     }

//     // CASE 3: MERGE guestCart → userCart
//     guestCart.items.forEach((gItem) => {
//       const index = userCart.items.findIndex(
//         (u) => u.productId.toString() === gItem.productId.toString()
//       );

//       if (index >= 0) {
//         userCart.items[index].quantity += gItem.quantity;
//       } else {
//         userCart.items.push(gItem);
//       }
//     });

//     await userCart.save();

//     // delete old guest cart
//     await Carts.deleteOne({ guestId });

//     return res.status(200).json({
//       status: true,
//       message: "Guest cart merged with user cart",
//       cart: userCart,
//       userCartId: userCart._id, // <-- FIXED
//     });
//   } catch (err) {
//     return res.status(500).json({
//       status: false,
//       message: err.message,
//     });
//   }
// };

const add_to_cart = async (req, res) => {
  try {
    const tokenUser = req.user;
    let { guestId, productId, quantity } = req.body;

    let userCart = null;
    let guestCart = null;

    // ------------------------------------------
    // 1) USER LOGGED IN → HANDLE USER CART FIRST
    // ------------------------------------------
    if (tokenUser) {
      userCart = await Carts.findOne({ userId: tokenUser.id });

      if (guestId) {
        guestCart = await Carts.findOne({ guestId });
      }

      // CASE A — convert guestCart → userCart
      if (!userCart && guestCart) {
        guestCart.userId = tokenUser.id;
        guestCart.guestId = null;
        userCart = await guestCart.save();

        await userCart.populate("items.productId");

        return res.status(200).json({
          status: true,
          message: "Guest cart converted to user cart",
          cart: userCart,
        });
      }

      // CASE B — create new user cart
      if (!userCart && !guestCart) {
        userCart = await Carts.create({
          userId: tokenUser.id,
          items: productId ? [{ productId, quantity }] : [],
        });

        await userCart.populate("items.productId");

        return res.status(200).json({
          status: true,
          message: "New user cart created",
          cart: userCart,
        });
      }

      // CASE C — merge guest into user
      if (userCart && guestCart) {
        guestCart.items.forEach((g) => {
          const index = userCart.items.findIndex(
            (u) => u.productId.toString() === g.productId.toString()
          );

          if (index >= 0) userCart.items[index].quantity += g.quantity;
          else userCart.items.push(g);
        });

        await userCart.save();
        guestId = null;
      }

      // ADD ITEM TO USER CART
      if (productId) {
        const index = userCart.items.findIndex(
          (item) => item.productId.toString() === productId
        );

        if (index >= 0) userCart.items[index].quantity += quantity;
        else userCart.items.push({ productId, quantity });

        await userCart.save();
      }

      await userCart.populate("items.productId");

      return res.status(200).json({
        status: true,
        message: "User cart updated",
        cart: userCart,
      });
    }

    // ------------------------------------------
    // 2) GUEST FLOW
    // ------------------------------------------
    if (!guestId) guestId = uuidv4();

    guestCart = await Carts.findOne({ guestId });

    // NEW GUEST CART
    if (!guestCart) {
      guestCart = await Carts.create({
        guestId,
        items: productId ? [{ productId, quantity }] : [],
      });

      await guestCart.populate("items.productId");

      return res.status(200).json({
        status: true,
        message: "New guest cart created",
        guestId,
        cart: guestCart,
      });
    }

    // EXISTING GUEST CART
    if (productId) {
      const index = guestCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (index >= 0) guestCart.items[index].quantity += quantity;
      else guestCart.items.push({ productId, quantity });

      await guestCart.save();
    }

    await guestCart.populate("items.productId");

    return res.status(200).json({
      status: true,
      message: "Guest cart updated",
      guestId,
      cart: guestCart,
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
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
      cart = await Carts.findOne({ userId: tokenUser.id });
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
    if (type === "inc") {
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
    const tokenUser = req.user;
    let { guestId } = req.query;

    let cart = null;

    // ------------------------------------------
    // 1) USER LOGGED IN → RETURN USER CART
    // ------------------------------------------
    if (tokenUser) {
      cart = await Carts.findOne({ userId: tokenUser.id })
        .populate("items.productId");

      if (!cart) {
        return res.status(200).json({
          status: true,
          type: "user",
          cart: { items: [] }
        });
      }

      return res.status(200).json({
        status: true,
        type: "user",
        cart
      });
    }

    // ------------------------------------------
    // 2) GUEST → MUST RECEIVE guestId
    // ------------------------------------------
    if (!guestId) {
      return res.status(400).json({
        status: false,
        message: "guestId required for guest cart"
      });
    }

    cart = await Carts.findOne({ guestId })
      .populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        status: true,
        type: "guest",
        cart: { items: [] }
      });
    }

    return res.status(200).json({
      status: true,
      type: "guest",
      cart
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
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
      cart = await Carts.findOne({ userId: tokenUser.id });
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
  // initGuestCart,
  add_to_cart,
  // mergeGuestCart,
  convertToGuestCart,
  updateQuantity,
  get_carts,
  remove_from_cart,
};
