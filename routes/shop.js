const path = require("path");

const shopController = require("../controllers/shopController");

const express = require("express");

const router = express.Router();

router.get("/", shopController.getProducts); // later one we will use this to load few products on home page
router.get("/products", shopController.getAllProducts); // This is for product list page to load all products
router.get("/products/:productId", shopController.getProduct);
router.get("/cart", shopController.cart);
router.get("/orders", shopController.orders);
router.get("/checkout", shopController.checkout);
module.exports = router;
