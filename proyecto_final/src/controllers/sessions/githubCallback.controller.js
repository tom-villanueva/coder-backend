const githubCallbackController = (req, res) => {
  req.session.user = {
    _id: req.user._id,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
  };
  // Successful authentication, redirect home.
  res.redirect("/products");
};

export default githubCallbackController;
