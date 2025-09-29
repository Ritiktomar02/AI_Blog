const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware.js");

const {
  registerUser,
  loginUser,
  getInfoUser,
} = require("../controllers/authController.js");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getInfoUser);


module.exports = router;