import { UserService } from "../../services/index.js";

const deleteUserController = async (req, res, next) => {
  try {
    const user = await UserService.deleteUser(req.params.uid);

    return res.status(201).json({
      status: "success",
      msg: "User deleted",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUserController;
