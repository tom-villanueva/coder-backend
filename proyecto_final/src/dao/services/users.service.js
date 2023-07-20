import { BadRequestError, ServerError, NotFoundError } from "../error.js";
import UserModel from "../models/users.model.js";

class UserService {
  async getAllUsers() {
    const users = await UserModel.find({});
    return users;
  }

  async createUser(user) {
    try {
      const newUser = await UserModel.create(user);

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
      const user = await UserModel.findOne({ email: email });

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
      const user = await UserModel.findById(id);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      return user;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default new UserService();
