const path = require("path");

const shopController = require("../controllers/shopController");

const express = require("express");

const router = express.Router();

router.get("/", shopController.getProducts);
router.get("/products", shopController.getAllProducts);
router.get("/cart", shopController.cart);
router.get("/orders", shopController.orders);
router.get("/checkout", shopController.checkout);
module.exports = router;
