const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
} = require("../Collections/UserCollection");
const { protect } = require("../Middleware/AuthHandler");
const router = express.Router();

router.post("/", registerUser);
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.get("/", protect, getUser);

module.exports = router;
