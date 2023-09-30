import env from "../../../config.js";

const renderLoginController = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("login", { clientUrl: env.clientUrl });
};

export default renderLoginController;
