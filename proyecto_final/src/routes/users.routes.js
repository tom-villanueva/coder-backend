import express from "express";
import getAllUsersController from "../controllers/users/getAllUsers.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import toggleUsersRoleController from "../controllers/users/toggleUsersRoleController.js";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersController);
usersRouter.put("/premium/:uid", isAdmin, toggleUsersRoleController);

export default usersRouter;
