import env from "../../../config.js";

const renderRegisterController = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("register", { clientUrl: env.clientUrl });
};

export default renderRegisterController;
