const path = require("path");
const fs = require("fs");
const Cart = require("./cart");

const getFilePath = () => {
  const filePath = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json",
  );

  return filePath;
};

const readContentFromFile = (cbFun) => {
  const filePath = getFilePath();
  fs.readFile(filePath, (error, fileContent) => {
    if (error) {
      cbFun([]);
    }
    cbFun(JSON.parse(fileContent));
  });
};

//Function to write data to database
const writeContentToFile = (cartData, productData, cbFun) => {
  const path = getFilePath();
  fs.writeFile(path, JSON.stringify(productData), (error) => {
    if(error) {
      console.log(error);
    } else if(cbFun) {
      Cart.deleteProductFromCart(cartData.pId, cartData.price);
      cbFun();
    }
  });
}

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.productName = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  //Save method will save new product and also the updated product
  saveProduct() {
    readContentFromFile((products) => {
      const existingProducts = [...products];
      if(this.id) {
        const productIndex = existingProducts.findIndex(product => product.id === this.id);
        existingProducts[productIndex] = this;
      } else {
        this.id = Math.random().toString();
        existingProducts.push(this);
      }
      writeContentToFile(null, existingProducts, null)
    });
  }

  static fetchAllProducts(cbFun) {
    readContentFromFile(cbFun);
  }

  static getproductById(productId, cb) {
    readContentFromFile((products) => {
        const product = products.find(product => product.id === productId);
        cb(product);
    })
  }

  static deleteProduct(pId, cb) {
    readContentFromFile((products) => {
        const exisitngProducts = [...products];
        const productIndex = exisitngProducts.findIndex(product => product.id === pId);
        if(productIndex > -1) {
          const cartData = {pId, price: exisitngProducts[productIndex].price};
          exisitngProducts.splice(productIndex, 1);
          writeContentToFile(cartData, exisitngProducts, cb)
        }
        
    })
  }

};
