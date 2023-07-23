import express from "express";
import getAllUsersController from "../controllers/users/getAllUsers.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersController);

export default usersRouter;
