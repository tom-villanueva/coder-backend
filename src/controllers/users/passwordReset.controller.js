import userDTO from "../../dao/dto/user.dto.js";
import { UserService } from "../../services/index.js";

const passwordResetController = async (req, res, next) => {
  try {
    const user = await UserService.passwordReset(
      req.query.token,
      req.query.userId,
      req.body.password
    );

    return res.status(200).json({
      status: "success",
      msg: `Password reset succesfull!`,
      data: userDTO(user),
    });
  } catch (error) {
    if (error.name === "ExpiredTokenError") {
      const user = await UserService.getUserById(req.query.userId);

      return res.render("passwordResetRequest", {
        user: { email: user.email },
      });
    }
    next(error);
  }
};

export default passwordResetController;
