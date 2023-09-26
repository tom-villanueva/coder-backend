import env from "../../config.js";
import { createHash, isValidPassword } from "../utils/bcrypt.util.js";
import { sendEmail } from "../utils/email.util.js";
import {
  BadRequestError,
  ServerError,
  NotFoundError,
  ExpiredTokenError,
} from "../utils/error.util.js";
import { TokenService } from "./index.js";
import crypto from "crypto";

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

  async updateUser(id, user) {
    try {
      const updatedUser = await this.dao.updateUser(id, user);

      if (updatedUser.modifiedCount === 0) {
        throw new NotFoundError("User not found with that id");
      }

      return updatedUser;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "BadRequestError") {
        throw error;
      }

      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async requestPasswordReset(email) {
    try {
      const user = await this.dao.getUserByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found");
      }

      let token = await TokenService.getTokenByUser(user._id);
      if (token) {
        await TokenService.deleteToken(token._id);
      }

      let resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = createHash(resetToken);

      await TokenService.createToken({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
      });

      const resetLink = `${env.clientUrl}/render-password-reset?token=${resetToken}&userId=${user._id}`;

      const emailHtml = `
      <html>
        <body>
          <h1>Hello, ${user.firstName} ${user.lastName}</h1>
          <p>You requested to reset your password</p>
          <p>Please click the link below to reset it:</p>
          <a href="${resetLink}">Reset Password</a>
        </body>
      </html>`;

      sendEmail(user.email, "Password Reset Request", emailHtml);

      return user;
    } catch (error) {
      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async passwordReset(token, userId, password) {
    try {
      const passwordResetToken = await TokenService.getTokenByUser(userId);

      if (
        !passwordResetToken ||
        !isValidPassword(token, passwordResetToken.token)
      ) {
        throw new ExpiredTokenError("Invalid or expired token");
      }

      const user = await this.getUserById(userId);

      // If passwords are equal
      if (isValidPassword(password, user.password)) {
        throw new BadRequestError("Can't use same password");
      }

      await this.updateUser(userId, {
        password: createHash(password),
      });

      const emailHtml = `
      <html>
        <body>
          <h1>Hello, ${user.firstName} ${user.lastName}</h1>
          <p>You password has been changed successfully!!!</p>
        </body>
      </html>`;

      sendEmail(user.email, "Password changed succesfully", emailHtml);

      return user;
    } catch (error) {
      if (error.name === "NotFoundError") {
        throw error;
      }

      if (error.name === "BadRequestError") {
        throw error;
      }

      if (error.name === "ExpiredTokenError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.dao.getOne(id);

      if (user.role === "admin") {
        throw new BadRequestError("Can't delete admin user");
      }
      const deletedUser = await this.dao.delete(id);

      return deletedUser;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async deleteInactiveUsers() {
    try {
      const deletedUsers = await this.dao.deleteInactiveUsers();

      return deletedUsers;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async uploadDocuments(id, documents) {
    try {
      const user = await this.dao.getOne(id);
      if (!user) {
        throw new NotFoundError("User not found with that id");
      }

      let newDocuments = documents.map((file) => ({
        name: file.filename,
        reference: file.path,
      }));

      newDocuments = [...user.documents, ...newDocuments];

      const updatedUser = await this.dao.uploadDocuments(id, newDocuments);
      return updatedUser;
    } catch (error) {
      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }
}

export default UserService;
