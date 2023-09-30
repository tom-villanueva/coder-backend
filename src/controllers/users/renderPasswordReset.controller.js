import { BadRequestError } from "../../utils/error.util.js";

const renderPasswordResetController = (req, res, next) => {
  if (!req.query.token && !req.query.userId) {
    next(new BadRequestError("NO token provided"));
  }
  const user = {
    token: req.query.token,
    userId: req.query.userId,
  };

  return res.render("passwordReset", { user: user });
};

export default renderPasswordResetController;
