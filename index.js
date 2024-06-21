const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectToDB = require("./DB");
const router = require("./Routes/ProductsRoute");
const errorHandler = require("./Middleware/ErrorHandler");
const PORT = process.env.PORT_NUMBER || 8000;

const app = express();
connectToDB();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://store-frontend-three-ochre.vercel.app",
    ],
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files from the "uploads" directory
app.use("/uploads", express.static("uploads"));

app.use("/products", router);
app.use("/user", require("./Routes/UserRoute"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`listenin on port ${PORT}`));
