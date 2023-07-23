import express from "express";
import passport from "passport";
import registerController from "../controllers/sessions/register.controller.js";
import failRegisterController from "../controllers/sessions/failRegister.controller.js";
import loginController from "../controllers/sessions/login.controller.js";
import failLoginController from "../controllers/sessions/failLogin.controller.js";
import logoutController from "../controllers/sessions/logout.controller.js";
import githubCallbackController from "../controllers/sessions/githubCallback.controller.js";
import currentUserController from "../controllers/sessions/currentUser.controller.js";

const sessionRouter = express.Router();

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/sessions/failregister",
  }),
  registerController
);
sessionRouter.get("/failregister", failRegisterController);

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  loginController
);
sessionRouter.get("/faillogin", failLoginController);
sessionRouter.post("/logout", logoutController);

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  githubCallbackController
);

sessionRouter.get("/current", currentUserController);

export default sessionRouter;
