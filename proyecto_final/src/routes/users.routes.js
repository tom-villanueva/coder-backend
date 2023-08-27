import express from "express";
import getAllUsersController from "../controllers/users/getAllUsers.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import toggleUsersRoleController from "../controllers/users/toggleUsersRole.controller.js";
import requestPasswordResetController from "../controllers/users/requestPasswordReset.controller.js";
import passwordResetController from "../controllers/users/passwordReset.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersController);
usersRouter.put("/premium/:uid", isAdmin, toggleUsersRoleController);
usersRouter.post("/request-password-reset", requestPasswordResetController);
usersRouter.post("/password-reset", passwordResetController);

export default usersRouter;
