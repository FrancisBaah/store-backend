const express = require("express");
const {
  getAllProducts,
  addProduct,
} = require("../Collections/ProductsCollection");
const multer = require("multer");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for file uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "storeuploads/",
    format: async (req, file) => "png", // or dynamically determine format
    public_id: (req, file) => file.originalname.split(".")[0], // Using file name without extension
  },
});

const upload = multer({ storage: storage });

// Routes
router.get("/", getAllProducts);
router.post("/", upload.single("image"), addProduct);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send({ error: "An error occurred, please try again later." });
});

module.exports = router;
