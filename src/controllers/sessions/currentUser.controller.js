import userDTO from "../../dao/dto/user.dto.js";
import { UnauthenticatedError } from "../../utils/error.util.js";

const currentUserController = async (req, res, next) => {
  try {
    let user;

    if (req.session.user) {
      user = userDTO(req.session.user);
    } else {
      throw new UnauthenticatedError("No user logged in");
    }

    return res.status(200).json({
      status: "success",
      msg: "Current user",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default currentUserController;
