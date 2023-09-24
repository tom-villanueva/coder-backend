import { UserService } from "../../services/index.js";
import userDTO from "../../dao/dto/user.dto.js";

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    let mappedUsers = users.map((user) => userDTO(user));

    return res.status(200).json({
      status: "success",
      msg: "All users",
      data: mappedUsers,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllUsersController;
