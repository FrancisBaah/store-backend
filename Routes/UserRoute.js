const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  UpdateUser,
  deleteUser,
} = require("../Collections/UserCollection");
const { protect } = require("../Middleware/AuthHandler");
const router = express.Router();

router.post("/", registerUser);
router.get("/all", getAllUsers);
router.post("/login", loginUser);
router.get("/", protect, getUser);
router.route("/:id").put(UpdateUser).delete(deleteUser);

module.exports = router;
