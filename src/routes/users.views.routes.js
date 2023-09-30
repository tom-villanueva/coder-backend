import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";
import renderLoginController from "../controllers/sessions/renderLogin.controller.js";
import renderRegisterController from "../controllers/sessions/renderRegister.controller.js";
import renderProfileController from "../controllers/users/renderProfile.controller.js";
import renderPasswordResetController from "../controllers/users/renderPasswordReset.controller.js";
import renderUsersController from "../controllers/users/renderUsers.controller.js";

const viewsUsersRouter = express.Router();

viewsUsersRouter.get("/", (req, res) => res.redirect("/login"));
viewsUsersRouter.get("/login", renderLoginController);
viewsUsersRouter.get("/register", renderRegisterController);
viewsUsersRouter.get("/profile", isLoggedIn, renderProfileController);
viewsUsersRouter.get("/users", isLoggedIn, isAdmin, renderUsersController);
viewsUsersRouter.get("/render-password-reset", renderPasswordResetController);

export default viewsUsersRouter;
