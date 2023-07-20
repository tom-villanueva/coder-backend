import express from "express";
import passport from "passport";
import { UnauthenticatedError } from "../../dao/error.js";

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

sessionRouter.get("/current", async (req, res) => {
  try {
    let user;

    if (req.session.user) {
      user = req.session.user;
    } else {
      throw new UnauthenticatedError("No user logged in");
    }

    return res.status(200).json({
      status: "success",
      msg: "Current user",
      data: user,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

export default sessionRouter;
