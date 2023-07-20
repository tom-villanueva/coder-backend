import express from "express";
import { auth } from "../../../utils.js";

const viewsUsersRouter = express.Router();

viewsUsersRouter.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("login", {});
});

viewsUsersRouter.get("/register", (req, res) => {
  if (req.session.user) {
    return res.redirect("/products");
  }

  res.render("register", {});
});

viewsUsersRouter.get("/profile", auth, (req, res) => {
  const user = {
    email: req.session.user.email,
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    age: req.session.user.age,
  };

  res.render("profile", { user: user });
});

export default viewsUsersRouter;
