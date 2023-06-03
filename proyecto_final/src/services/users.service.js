import UserModel from "../dao/models/users.model.js";

class UserService {
  async getAllUsers() {
    const users = await UserModel.find({});
    return users;
  }
}

export default new UserService();
