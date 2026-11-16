const path = require("path");
const express = require("express");

const adminController = require("../controllers/adminController.js");

const router = express.Router();

const rootPath = require("../util/path");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/add-product =>POST
router.post("/product", adminController.postAddProduct);

// /admin/product-list => GET

router.get("/product-list", adminController.adminProductList);

module.exports = router;
