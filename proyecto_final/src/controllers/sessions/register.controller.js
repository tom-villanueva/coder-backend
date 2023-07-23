const registerController = (req, res) => {
  if (!req.user) {
    return res.json({ error: "something went wrong" });
  }
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
  };

  return res.redirect("/products");
};

export default registerController;
