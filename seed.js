const mongoose = require("mongoose");
const Product = require("./models/Product"); // Make sure you have a Product model defined

mongoose
  .connect("mongodb://127.0.0.1:27017/dokan", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  const products = [
    {
      name: "Product 1",
      image: "https://via.placeholder.com/150",
      price: 100,
      stock: 50,
      description: "Description for product 1",
      isTrending: true,
    },
    {
      name: "Product 2",
      image: "https://via.placeholder.com/150",
      price: 150,
      stock: 40,
      description: "Description for product 2",
      isTrending: true,
    },
    {
      name: "Product 3",
      image: "https://via.placeholder.com/150",
      price: 200,
      stock: 30,
      description: "Description for product 3",
      isTrending: true,
    },
    {
      name: "Product 4",
      image: "https://via.placeholder.com/150",
      price: 250,
      stock: 20,
      description: "Description for product 4",
      isTrending: true,
    },
    {
      name: "Product 5",
      image: "https://via.placeholder.com/150",
      price: 300,
      stock: 10,
      description: "Description for product 5",
      isTrending: true,
    },
    {
      name: "Product 6",
      image: "https://via.placeholder.com/150",
      price: 350,
      stock: 5,
      description: "Description for product 6",
    },
    {
      name: "Product 7",
      image: "https://via.placeholder.com/150",
      price: 400,
      stock: 2,
      description: "Description for product 7",
    },
    {
      name: "Product 8",
      image: "https://via.placeholder.com/150",
      price: 450,
      stock: 8,
      description: "Description for product 8",
    },
    {
      name: "Product 9",
      image: "https://via.placeholder.com/150",
      price: 500,
      stock: 12,
      description: "Description for product 9",
    },
    {
      name: "Product 10",
      image: "https://via.placeholder.com/150",
      price: 550,
      stock: 6,
      description: "Description for product 10",
    },
  ];

  try {
    await Product.insertMany(products);
    console.log("Products added to the database");
  } catch (err) {
    console.error("Error adding products:", err);
  }

  db.close();
});
