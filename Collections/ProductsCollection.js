const asyncHandler = require("express-async-handler");
const Product = require("../Models/ProductModel");

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !price || !description || !image) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const newProduct = new Product({
    name,
    price,
    description,
    image,
  });

  try {
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
});

module.exports = { getAllProducts, addProduct };
