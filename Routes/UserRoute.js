const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  UpdateUser,
  deleteUser,
  logoutUser,
} = require("../Collections/UserCollection");
const { protect } = require("../Middleware/AuthHandler");
const router = express.Router();

router.post("/", registerUser);
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/", protect, getUser);
router.route("/:id", protect).put(UpdateUser).delete(deleteUser);

module.exports = router;
