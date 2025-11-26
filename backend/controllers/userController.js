const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (
      [firstName, lastName, email, password].some(
        (item) => item === "" || item === undefined
      )
    ) {
      res.status(400).json({ status: false, message: "All field required!" });
    }
    const user = await Users.findOne({ email });
    if (user) {
      res.status(400).json({
        status: false,
        message:
          "Email Already Exist, Please Add another Email For Register Otherwise Login!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

    await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res.status(200).json({
      status: true,
      message: "Register Successfully.",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if ([email, password].some((item) => item === "" || item === undefined)) {
      res.status(400).json({ status: false, message: "All field required!" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "Invalid Email!",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      res.status(400).json({
        status: false,
        message: "Invalid Password!",
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      status: true,
      token: token,
      message: "Login Successfully.",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const verify_email = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === "" || email === undefined) {
      res
        .status(400)
        .json({ status: false, message: "Email address is required!" });
    }
    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({
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
      from: `"OM Kudrat" <${process.env.EMAIL}>`,
      to: findEmail.email,
      subject: "Email Verification Code",
      html: htmlPage,
    });

    console.log("✅ Email sent:", info.messageId);

    return res.status(200).json({
      status: true,
      message: "We've sent you an email with a link to update your password.",
    });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ status: false, message: error.message });
  }
};

const reset_password = async (req, res) => {
  try {
    const { email } = req.params;
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({
          status: false,
          message: "Password and Confirm Password Does't Match!",
        });
    }

    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({
        status: false,
        message: "You Can't Reset Password, Please reproccess of reset Password!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, +process.env.SALT_ROUND);

    await user.updateOne({password: hashedPassword})

    return res.status(200).json({
      status: true,
      message: "Password Reset.",
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  register,
  login,
  verify_email,
  reset_password,
};
