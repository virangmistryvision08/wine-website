const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const Carts = require("../model/cartModel");

// const cartId = uuidv4();
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (
      [firstName, lastName, email, password].some(
        (item) => item === "" || item === undefined
      )
    ) {
      return res
        .status(400)
        .json({ status: false, message: "All field required!" });
    }
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({
        status: false,
        message:
          "Email Already Exist, Please Add another Email For Register Otherwise Login!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

    const savedUser = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: savedUser._id,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: true,
      token: token,
      message: "Register Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, guestId } = req.body;

    const user = await Users.findOne({ email });
    if (!user)
      return res.status(400).json({ status: false, message: "User not found" });

    // Assume password check done already

    // Load user cart or create new one
    let userCart;
    if (user.cartId) {
      userCart = await Carts.findById(user.cartId);
    } else {
      userCart = await Carts.create({ user: user._id, items: [] });
      user.cartId = userCart._id;
      await user.save();
    }

    // MERGE GUEST CART
    if (guestId) {
      const guestCart = await Carts.findOne({ guestId });

      if (guestCart) {
        guestCart.items.forEach((gItem) => {
          const existing = userCart.items.find(
            (uItem) => uItem.productId.toString() === gItem.productId.toString()
          );

          if (existing) {
            existing.quantity += gItem.quantity;
          } else {
            userCart.items.push(gItem);
          }
        });

        await userCart.save();

        // delete guest cart
        await Carts.deleteOne({ guestId });
      }
    }

    const generateToken = (user) => {
      return jwt.sign(
        {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" } // token valid for 7 days
      );
    };

    const token = generateToken(user);

    res.json({
      status: true,
      message: "Login successful",
      token,
      userCartId: user.cartId,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const verify_email = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === "" || email === undefined) {
      return res
        .status(400)
        .json({ status: false, message: "Email address is required!" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid Email!",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const htmlPath = path.join(__dirname, "../emailPage.html");
    let htmlPage = fs.readFileSync(htmlPath, "utf-8");

    htmlPage = htmlPage.replace(/{{email}}/g, user.email);

    // send the email
    const info = await transporter.sendMail({
      from: `"Wine Shop" <${process.env.EMAIL}>`,
      to: user.email,
      subject: "Email Verification Code",
      html: htmlPage,
    });

    console.log("Email sent:", info.messageId);

    return res.status(200).json({
      status: true,
      message: "We've sent you an email with a link to update your password.",
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

const reset_password = async (req, res) => {
  try {
    const { email } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: false,
        message: "Password and Confirm Password Does't Match!",
      });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message:
          "You Can't Reset Password, Please reproccess of reset Password!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

    await user.updateOne({ password: hashedPassword });

    return res.status(200).json({
      status: true,
      message: "Password Reset Successfully.",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  verify_email,
  reset_password,
};
