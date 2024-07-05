const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add a product to the cart
router.post("/", async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne();

    if (!cart) {
      // If no cart exists, create a new one with the product
      cart = new Cart({
        products: [{ productId, quantity }],
      });
    } else {
      // Check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        // If product exists, update quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        // If product doesn't exist, add it to cart
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retrieve all carts
router.get("/", async (req, res) => {
  try {
    const carts = await Cart.find().populate("products.productId");
    res.json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a product from the cart
router.delete("/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product from the cart
    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
