````markdown
# Shopping Store Backend

This is the backend service for the Shopping Store application, built with Node.js, Express, and MongoDB. The application supports adding products, retrieving product listings, and uploading product images.

## Features

- Add new products with images
- Retrieve all products
- Upload images for products

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Multer (for image upload handling)

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. Clone the repository:

```bash
git clone
```
````

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the project with the following content:

```env
PORT_NUMBER=8000
MONGO_URI=your_mongodb_connection_string
```

4. Start the server:

```bash
npm start
```

The server should now be running on `http://localhost:8000`.

## API Endpoints

### Add a Product

- **URL:** `/products`
- **Method:** `POST`
- **Description:** Add a new product with an image.
- **Headers:** `Content-Type: multipart/form-data`
- **Request Body:**
  - `name`: string (required)
  - `price`: number (required)
  - `description`: string (required)
  - `image`: file (required)

**Example using Postman:**

1. Select `POST` method and enter the URL: `http://localhost:8000/products`.
2. In the `Body` tab, select `form-data`.
3. Add the fields: `name`, `price`, `description`, and `image` (choose a file from your local system).

### Get All Products

- **URL:** `/products`
- **Method:** `GET`
- **Description:** Retrieve all products.

**Example:**

```bash
curl http://localhost:8000/products
```

## Folder Structure

```
├── Models
│   └── ProductModel.js
├── Routes
│   └── ProductsRoute.js
├── Controllers
│   └── ProductController.js
├── Middleware
│   └── ErrorHandler.js
├── uploads
│   └── (Uploaded images will be stored here)
├── .env
├── DB.js
├── server.js
└── README.md
```

## Error Handling

Errors are handled using a custom error handler middleware located in `Middleware/ErrorHandler.js`.

## License

This project is licensed under the MIT License.

```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string. Also, update the GitHub repository URL if needed.

This `README.md` file should provide a comprehensive guide for setting up and using your backend service.
```
