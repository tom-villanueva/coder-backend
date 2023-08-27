import userDTO from "../../dao/dto/user.dto.js";
import { UserService } from "../../services/index.js";

const toggleUsersRoleController = async (req, res, next) => {
  try {
    const user = await UserService.toggleUserRole(req.params.uid);

    return res.status(200).json({
      status: "success",
      msg: `Changed user role successfully to: ${user.role}`,
      data: userDTO(user),
    });
  } catch (error) {
    next(error);
  }
};

export default toggleUsersRoleController;
