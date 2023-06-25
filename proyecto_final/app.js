import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import cartsRouter from "./src/routes/carts/carts.routes.js";
import productsRouter from "./src/routes/products/products.routes.js";
import usersRouter from "./src/routes/users/users.routes.js";
import viewsCartsRouter from "./src/routes/views/carts.views.routes.js";
import viewsProductsRouter from "./src/routes/views/products.views.routes.js";
import { __dirname, auth, connectMongo } from "./utils.js";
import viewsUsersRouter from "./src/routes/views/users.views.routes.js";
import sessionRouter from "./src/routes/sessions/sessions.routes.js";

const port = 8080;

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
      mongoUrl: "",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 3600,
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

app.use("/", viewsUsersRouter);
// Views products endpoints
app.use("/products", auth, viewsProductsRouter);
// Views carts endpoints
app.use("/carts", auth, viewsCartsRouter);
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
