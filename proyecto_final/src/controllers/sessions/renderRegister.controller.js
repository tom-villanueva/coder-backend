const renderRegisterController = (req, res) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("register", {});
};

export default renderRegisterController;
