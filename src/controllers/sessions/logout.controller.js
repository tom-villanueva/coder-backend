import { UserService } from "../../services/index.js";

const logoutController = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.session.user._id);
    user.last_connection = Date.now();
    await user.save();

    req.session.destroy((err) => {
      if (err) {
        next(err);
      }

      return res.redirect("/login");
    });
  } catch (error) {
    next(error);
  }
};

export default logoutController;
