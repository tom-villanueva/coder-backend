import { UnauthenticatedError } from "../../utils/error.util.js";

const currentUserController = async (req, res) => {
  try {
    let user;

    if (req.session.user) {
      user = req.session.user;
    } else {
      throw new UnauthenticatedError("No user logged in");
    }

    return res.status(200).json({
      status: "success",
      msg: "Current user",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};

export default currentUserController;
