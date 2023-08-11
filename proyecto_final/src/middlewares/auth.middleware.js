export const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.redirect("/login");
  // return res.status(401).send("Unauthenticated");
};

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.role === "admin") {
    return next();
  }

  return res.status(401).json({
    status: "error",
    msg: "Unauthorized",
    data: {},
  });
};

export const isCartOwner = (req, res, next) => {
  if (req.session.user && req.session.user.cart === req.params.cid) {
    return next();
  }

  return res.status(401).json({
    status: "error",
    msg: "Unauthorized: not your cart",
    data: {},
  });
};
