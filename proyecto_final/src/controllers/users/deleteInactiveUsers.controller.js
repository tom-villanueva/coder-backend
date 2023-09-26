import { UserService } from "../../services/index.js";

const deleteInactiveUsersController = async (req, res, next) => {
  try {
    const users = await UserService.deleteInactiveUsers();

    return res.status(201).json({
      status: "success",
      msg: `Users deleted: ${users.deletedCount}`,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export default deleteInactiveUsersController;
