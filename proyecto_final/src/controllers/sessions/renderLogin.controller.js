const renderLoginController = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("login", {});
};

export default renderLoginController;
