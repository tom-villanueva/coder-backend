import express from "express";
import getAllUsersController from "../controllers/users/getAllUsers.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import toggleUsersRoleController from "../controllers/users/toggleUsersRole.controller.js";
import requestPasswordResetController from "../controllers/users/requestPasswordReset.controller.js";
import passwordResetController from "../controllers/users/passwordReset.controller.js";
import deleteUserController from "../controllers/users/deleteUser.controller.js";
import { uploader } from "../utils/storage.util.js";
import uploadDocumentsController from "../controllers/users/uploadDocuments.controller.js";
import deleteInactiveUsersController from "../controllers/users/deleteInactiveUsers.controller.js";

const usersRouter = express.Router();

usersRouter.get("/", getAllUsersController);
usersRouter.delete("/", isAdmin, deleteInactiveUsersController);
usersRouter.delete("/:uid", isAdmin, deleteUserController);
usersRouter.post(
  "/:uid/documents",
  uploader.array("documents"),
  uploadDocumentsController
);
usersRouter.put("/premium/:uid", isAdmin, toggleUsersRoleController);
usersRouter.post("/request-password-reset", requestPasswordResetController);
usersRouter.post("/password-reset", passwordResetController);

export default usersRouter;
