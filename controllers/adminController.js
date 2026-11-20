const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.send(`<form action="/admin/product" method="post">
  //       <input type="text" name="productName" />
  //       <button type="submit">Save</button>
  //   </form>`);
  //res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
  //res.sendFile(path.join(rootPath, "views", "add-product.html"));
  res.render("admin/add-or-edit-product", {
    pageTitle: "Add Products",
    activeLink: "/add-product",
    editing: false,
  });
};

//controller to show edit product data
exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const isEditing = req.query.editing;
  if(!isEditing) {
    res.redirect('/');
  }

  Product.getproductById(productId, (product) => {
    if(!product) {
      return res.redirect('/')
    }
    res.render('admin/add-or-edit-product', {
      pageTitle: "Edit Product",
      activeLink: "",
      editing: isEditing,
      product: product
    })
  })
  
}

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedProductName = req.body.productName;
  const updatedProductPrice= req.body.price;
  const updatedProductImageUrl = req.body.imageUrl;
  const updatedProductDescription = req.body.description;
  const updatedProduct = new Product(productId, updatedProductName, updatedProductImageUrl, 
    updatedProductPrice, updatedProductDescription);
  updatedProduct.saveProduct();
  res.redirect("/admin/product-list");
}


exports.postAddProduct = (req, res, next) => {
  const productName = req.body.productName;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,productName, imageUrl, price, description);
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

//Delete Product
exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  console.log('P', productId);
  Product.deleteProduct(productId, () => {

    res.redirect("/admin/product-list");
  })
};
