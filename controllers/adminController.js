const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.send(`<form action="/admin/product" method="post">
  //       <input type="text" name="productName" />
  //       <button type="submit">Save</button>
  //   </form>`);
  //res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  //res.sendFile(path.join(rootPath, "views", "add-product.html"));
  res.render("admin/add-product", {
    pageTitle: "Add Products",
    activeLink: "/add-product",
    hasProductCSS: true,
    addProductActive: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const productName = req.body.productName;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(productName, imageUrl, price, description);
  product.saveProduct();
  res.redirect("/");
};

//Admin Product list controller
exports.adminProductList = (req, res, next) => {
  Product.fetchAllProducts((products) => {
    res.render("admin/product-list", {
      products: products,
      hasProducts: products.length > 0,
      pageTitle: "Admin Product List",
      activeLink: "/admin/product-list",
    });
  });
};
