import {
  BadRequestError,
  ServerError,
  NotFoundError,
} from "../utils/error.util.js";

class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllUsers() {
    const users = await this.dao.get({});
    return users;
  }

  async createUser(user) {
    try {
      const newUser = await this.dao.create(user);

      return newUser;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }

      throw new ServerError(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.dao.getUserByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async getUserById(id) {
    try {
      const user = await this.dao.getOne(id);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async toggleUserRole(id) {
    try {
      const user = await this.dao.getOne(id);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      if (user.role === "premium") {
        user.role = "user";
      } else if (user.role === "user") {
        user.role = "premium";
      } else {
        throw new BadRequestError("Can't change admin role");
      }

      await user.save();

      return user;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default UserService;
