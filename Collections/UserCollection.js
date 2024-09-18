const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    role,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure cookie (prevents JavaScript access)
      secure: true, // Must be true if using SameSite=None
      sameSite: "None",
      // secure: process.env.NODE_ENV === "production", // Set only on HTTPS
      // sameSite: "strict", // Prevents CSRF
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);

    // Set token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Secure cookie (prevents JavaScript access)
      secure: true, // Must be true if using SameSite=None
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
const logoutUser = (req, res) => {
  // Clear the cookie by setting an empty value and an immediate expiration date
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0), // Set the expiration to a past date to delete the cookie
  });

  res.status(200).json({ message: "Logged out successfully" });
};

//   Get user data
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

//all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const UpdateUser = asyncHandler(async (req, res) => {
  const { name, email, role } = req.body;
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    { new: true }
  );
  if (!updateUser) {
    res.status(404);
    throw new Error("User not found");
  }
  res.status(200).json(updateUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getAllUsers,
  UpdateUser,
  deleteUser,
  logoutUser,
};
