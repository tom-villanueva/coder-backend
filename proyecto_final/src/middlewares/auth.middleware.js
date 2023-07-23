export const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.redirect("/login");
  // return res.status(401).send("Unauthenticated");
};
