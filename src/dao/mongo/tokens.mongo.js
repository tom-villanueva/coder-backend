import TokenModel from "./models/token.model.js";

export default class Tickets {
  constructor() {}

  async get() {
    const tokens = await TokenModel.find();
    return tokens;
  }

  async getOne(id) {
    const token = await TokenModel.findById(id);
    return token;
  }

  async getByUser(id) {
    const token = await TokenModel.findOne({ userId: id });
    return token;
  }

  async create(data) {
    const result = await TokenModel.create(data);
    return result;
  }

  async delete(id) {
    const result = await TokenModel.deleteOne({ _id: id });
    return result;
  }
}
