const renderProfileController = (req, res, next) => {
  const user = {
    email: req.session.user.email,
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    age: req.session.user.age,
  };

  res.render("profile", { user: user });
};

export default renderProfileController;
