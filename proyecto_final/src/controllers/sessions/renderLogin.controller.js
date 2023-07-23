const renderLoginController = (req, res) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("login", {});
};

export default renderLoginController;
