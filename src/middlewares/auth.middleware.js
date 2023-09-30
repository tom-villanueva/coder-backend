import { ProductService } from "../services/index.js";

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
    msg: "Unauthorized, you're not admin",
    data: {},
  });
};

export const isPremiumUser = (req, res, next) => {
  if (req.session.user && req.session.user.role === "premium") {
    return next();
  }

  return res.status(401).json({
    status: "error",
    msg: "Unauthorized, you're not admin nor premium user",
    data: {},
  });
};

export const canCreateProduct = (req, res, next) => {
  if (
    req.session.user &&
    (req.session.user.role === "admin" || req.session.user.role === "premium")
  ) {
    return next();
  }

  return res.status(401).json({
    status: "error",
    msg: "Unauthorized, you're not allowed to create a product",
    data: {},
  });
};

export const canDeleteProduct = async (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "admin") {
      return next();
    }
    if (req.session.user.role === "premium") {
      try {
        const productToDelete = await ProductService.getProductById(
          req.params.pid
        );

        if (productToDelete.owner === req.session.user.email) {
          return next();
        }
      } catch (error) {
        return next(error);
      }
    }
  }

  return res.status(401).json({
    status: "error",
    msg: "Unauthorized, you're not allowed to delete this product",
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

export const ownsProduct = async (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.role === "premium") {
      try {
        const productToAdd = await ProductService.getProductById(
          req.params.pid
        );
        if (productToAdd.owner !== req.session.user.email) {
          return next();
        }
      } catch (error) {
        return next(error);
      }
    } else {
      return next();
    }
  }

  return res.status(401).json({
    status: "error",
    msg: "Unauthorized, can't add your own product",
    data: {},
  });
};
