import express from "express";
import { auth } from "../middlewares/auth.middleware.js";
import renderLoginController from "../controllers/sessions/renderLogin.controller.js";
import renderRegisterController from "../controllers/sessions/renderRegister.controller.js";
import renderProfileController from "../controllers/users/renderProfile.controller.js";

const viewsUsersRouter = express.Router();

viewsUsersRouter.get("/login", renderLoginController);
viewsUsersRouter.get("/register", renderRegisterController);
viewsUsersRouter.get("/profile", auth, renderProfileController);

export default viewsUsersRouter;
