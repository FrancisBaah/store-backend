const express = require("express");
const {
  getAllProducts,
  addProduct,
} = require("../Collections/ProductsCollection");
const multer = require("multer");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", getAllProducts);
router.post("/", upload.single("image"), addProduct);
module.exports = router;
