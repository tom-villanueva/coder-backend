import { UserService } from "../../services/index.js";
import { ServerError } from "../../utils/error.util.js";

const getAllUsersController = async (req, res, next) => {
  try {
    const users = UserService.getAllUsers();
    return res.status(200).json({
      status: "success",
      msg: "Usuarios",
      data: users,
    });
  } catch (error) {
    throw new ServerError("Error retrieving users");
  }
};

export default getAllUsersController;
