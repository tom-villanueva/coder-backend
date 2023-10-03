import { UnauthenticatedError } from "../../utils/error.util.js";

const loginController = async (req, res, next) => {
  if (!req.user) {
    next(new UnauthenticatedError("Invalid Credentials"));
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
