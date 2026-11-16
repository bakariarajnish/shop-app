const Product = require("../models/product");

//This controller function is to get all products
exports.getAllProducts = (req, res, next) => {
  //res.send("<h1>Hello from ExpressJS now</h1>");
  //res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
  Product.fetchAllProducts((products) => {
    res.render("shop/product-list", {
      products: products,
      hasProducts: products.length > 0,
      pageTitle: "Shop",
      activeLink: "/products",
    });
  });
};

//This is to get few products which will show on home page
exports.getProducts = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("shop/index", {
      products: products,
      hasProducts: products.length > 0,
      pageTitle: "Shop Home",
      activeLink: "/home",
    });
  });
};

//Shopping Cart controller
exports.cart = (req, res, next) => {
  res.render("shop/cart", {
    products: [],
    pageTitle: "Cart",
    activeLink: "/cart",
  });
};

//Shopping Orders controller
exports.orders = (req, res, next) => {
  res.render("shop/orders", {
    products: [],
    pageTitle: "Your Orders",
    activeLink: "/orders",
  });
};

//Checkout Controller

exports.checkout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
  });
};
