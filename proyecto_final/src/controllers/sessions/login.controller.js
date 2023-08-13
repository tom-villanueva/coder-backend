const loginController = async (req, res, next) => {
  if (!req.user) {
    return res.json({ error: "invalid credentials" });
  }
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    cart: req.user.cart,
    role: req.user.role,
  };
  return res.redirect("/products");
};

export default loginController;
