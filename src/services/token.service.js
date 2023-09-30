import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../utils/error.util.js";

class TokenService {
  constructor(dao) {
    this.dao = dao;
  }

  async getAllTokens() {
    const tokens = await this.dao.get({});
    return tokens;
  }

  async getTokenById(id) {
    try {
      const token = await this.dao.getOne({ _id: id });

      if (!token) {
        throw new NotFoundError("Token not found");
      }

      return token;
    } catch (error) {
      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async getTokenByUser(id) {
    try {
      const token = await this.dao.getByUser(id);

      return token;
    } catch (error) {
      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      throw new ServerError(error);
    }
  }

  async createToken(token) {
    try {
      const newToken = await this.dao.create(token);

      return newToken;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }

      throw new ServerError(error);
    }
  }

  async deleteToken(id) {
    try {
      const deletedToken = await this.dao.delete(id);

      return deletedToken;
    } catch (error) {
      throw new ServerError(error);
    }
  }
}

export default TokenService;
