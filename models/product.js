const path = require("path");
const fs = require("fs");

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

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.productName = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  saveProduct() {
    this.id = Math.random().toString();
    const path = getFilePath();
    readContentFromFile((products) => {
      products.push(this);
      fs.writeFile(path, JSON.stringify(products), (error) => {
        console.log(error);
      });
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
};
