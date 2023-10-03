const githubCallbackController = (req, res, next) => {
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    cart: req.user.cart,
    role: req.user.role,
  };

  res.redirect("/products");
};

export default githubCallbackController;
