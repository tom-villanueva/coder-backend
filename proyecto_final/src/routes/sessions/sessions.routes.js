import express from "express";
import usersService from "../../dao/services/users.service.js";
import { BadRequestError, UnauthenticatedError } from "../../dao/error.js";

const sessionRouter = express.Router();

sessionRouter.post("/register", async (req, res) => {
  try {
    const user = await usersService.createUser(req.body);

    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.age = user.age;
    req.session.user = user.email;
    req.session.role =
      user.email === "adminCoder@coder.com" && user.password === "adminCod3r123"
        ? "admin"
        : "user";

    return res.redirect("/products");
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

sessionRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new BadRequestError("Send email and password");
    }

    const user = await usersService.getUserByEmail(email);
    console.log(user, password);
    if (user.password !== password) {
      throw new UnauthenticatedError("Incorrect password");
    }

    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.age = user.age;
    req.session.user = email;
    req.session.role =
      user.email === "adminCoder@coder.com" && user.password === "adminCod3r123"
        ? "admin"
        : "user";

    return res.redirect("/products");
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

sessionRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        msg: err,
        data: {},
      });
    }

    return res.redirect("/login");
  });
});

export default sessionRouter;
