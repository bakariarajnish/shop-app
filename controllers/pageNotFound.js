exports.pageNotFound = (req, res, next) => {
  res.render("page-not-found", { pageTitle: "404", activeLink: "" });
  //res.status(404).sendFile(path.join(rootDir, "views", "page-not-found.html"));
  //res.status(404).send("<h1>Page not found.</h1>");
};
