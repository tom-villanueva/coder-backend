import { UserService } from "../../services/index.js";

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    return res.status(200).json({
      status: "success",
      msg: "All users",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getAllUsersController;
