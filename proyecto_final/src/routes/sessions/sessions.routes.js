import express from "express";
import passport from "passport";
import usersService from "../../dao/services/users.service.js";
import { BadRequestError, UnauthenticatedError } from "../../dao/error.js";

const sessionRouter = express.Router();

sessionRouter.get("/register", (req, res) => {
  return res.render("register", {});
});

sessionRouter.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "api/sessions/failregister",
  }),
  (req, res) => {
    if (!req.user) {
      return res.json({ error: "something went wrong" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
    };

    return res.redirect("/products");
  }
);

sessionRouter.get("/failregister", (req, res) => {
  return res.send({ error: "Fail to register" });
});

sessionRouter.get("/login", (req, res) => {
  return res.render("login", {});
});

sessionRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin",
  }),
  async (req, res) => {
    if (!req.user) {
      return res.json({ error: "invalid credentials" });
    }
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
    };
    return res.redirect("/products");
  }
);

sessionRouter.get("/faillogin", (req, res) => {
  return res.send({ error: "Fail to login" });
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

sessionRouter.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

sessionRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = {
      _id: req.user._id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      role: req.user.role,
    };
    // Successful authentication, redirect home.
    res.redirect("/products");
  }
);

export default sessionRouter;
