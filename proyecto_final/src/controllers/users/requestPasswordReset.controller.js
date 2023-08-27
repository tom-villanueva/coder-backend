import userDTO from "../../dao/dto/user.dto.js";
import { UserService } from "../../services/index.js";

const requestPasswordResetController = async (req, res, next) => {
  try {
    const user = await UserService.requestPasswordReset(req.body.email);

    return res.status(200).json({
      status: "success",
      msg: `You requested a password change, check your email for instructions`,
      data: userDTO(user),
    });
  } catch (error) {
    next(error);
  }
};

export default requestPasswordResetController;
