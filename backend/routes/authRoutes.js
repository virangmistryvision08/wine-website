const express = require("express");
const { register, login, verify_email, reset_password } = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify-email", verify_email);
router.post("/reset-password/:email", reset_password);

module.exports = router;