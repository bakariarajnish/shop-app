const path = require("path");
const express = require("express");

const adminController = require("../controllers/adminController.js");

const router = express.Router();

const rootPath = require("../util/path");

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

//admin/edit-product  => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// /admin/add-product =>POST
router.post("/add-product", adminController.postAddProduct);

// /admin/edit-product. => POST
router.post("/edit-product", adminController.postEditProduct);

// /admin/delete-product. => delete
router.post("/delete-product", adminController.deleteProduct);

// /admin/product-list => GET

router.get("/product-list", adminController.adminProductList);

module.exports = router;
