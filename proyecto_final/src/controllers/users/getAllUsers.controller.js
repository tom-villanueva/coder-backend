import usersService from "../../services/users.service.js";

const getAllUsersController = async (req, res) => {
  try {
    const users = usersService.getAllUsers();
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
