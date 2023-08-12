import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import cartsRouter from "./src/routes/carts.routes.js";
import productsRouter from "./src/routes/products.routes.js";
import usersRouter from "./src/routes/users.routes.js";
import viewsCartsRouter from "./src/routes/carts.views.routes.js";
import viewsProductsRouter from "./src/routes/products.views.routes.js";
import { __dirname } from "./dirname.util.js";
import { isLoggedIn } from "./src/middlewares/auth.middleware.js";
import { connectMongo } from "./src/utils/mongo.util.js";
import viewsUsersRouter from "./src/routes/users.views.routes.js";
import sessionRouter from "./src/routes/sessions.routes.js";
import { initializePassport } from "./src/config/passport.config.js";
import passport from "passport";
import env from "./config.js";
import { errorHandler } from "./src/middlewares/error-handler.middleware.js";

const port = env.port;

const app = express();

connectMongo();

// Config de express-handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

// Config de express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: env.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    }),
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", viewsUsersRouter);
// Views products endpoints
app.use("/products", isLoggedIn, viewsProductsRouter);
// Views carts endpoints
app.use("/carts", isLoggedIn, viewsCartsRouter);
// Sessions endpoint
app.use("/api/sessions", sessionRouter);
// Product endpoints
app.use("/api/products", productsRouter);
// Carts enpoints
app.use("/api/carts", cartsRouter);
// Users endpoints
app.use("/api/users", usersRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});

app.use(errorHandler);
