import express from "express";
import usersService from "../../dao/services/users.service.js";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = usersService.getAllUsers();
    return res.status(200).json({
      status: "success",
      msg: "Usuarios",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

export default usersRouter;
