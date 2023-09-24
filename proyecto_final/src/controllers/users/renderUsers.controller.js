import { UserService } from "../../services/index.js";
import userDTO from "../../dao/dto/user.dto.js";

const renderUsersController = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    let mappedUsers = users.map((user) => ({
      ...userDTO(user),
      id: user._id,
    }));
    res.render("users", { users: mappedUsers });
  } catch (error) {
    next(error);
  }
};

export default renderUsersController;
