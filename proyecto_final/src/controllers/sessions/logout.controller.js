const logoutController = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        msg: err,
        data: {},
      });
    }

    return res.redirect("/login");
  });
};

export default logoutController;