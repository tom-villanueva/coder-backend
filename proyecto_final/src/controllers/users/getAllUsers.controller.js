import { UserService } from "../../services/index.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = UserService.getAllUsers();
    return res.status(200).json({
      status: "success",
      msg: "Usuarios",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
};

export default getAllUsersController;
