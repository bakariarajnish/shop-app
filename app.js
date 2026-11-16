const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const engineHbs = require("express-handlebars");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const pageNotFoundController = require("./controllers/pageNotFound");

const app = express();

const rootDir = require("./util/path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

// app.engine(
//   "hbs",
//   engineHbs({
//     layoutsDir: "views/layouts/",
//     defaultLayout: "main-layout.hbs",
//     extName: "hbs",
//   }),
// );
app.set("view engine", "ejs");
//app.set("view engine", "hbs");
//app.set("view engine", "pug");
app.set("views", "views");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(pageNotFoundController.pageNotFound);

app.listen(3000);
