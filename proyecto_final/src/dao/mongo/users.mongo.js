import UserModel from "./models/users.model.js";

export default class Users {
  constructor() {}

  async get() {
    const users = await UserModel.find();
    return users;
  }

  async getOne(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async getUserByEmail(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

  async updateUser(id, user) {
    const updatedUser = await UserModel.updateOne({ _id: id }, user);

    return updatedUser;
  }

  async delete(id) {
    const deletedUser = await UserModel.deleteOne({ _id: id });

    return deletedUser;
  }

  async create(data) {
    const result = await UserModel.create(data);
    return result;
  }
}
