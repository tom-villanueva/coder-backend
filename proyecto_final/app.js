import express from "express";
import productsRouter from "./src/routes/products/products.routes.js";
import cartsRouter from "./src/routes/carts/carts.routes.js";
import usersRouter from "./src/routes/users/users.routes.js";
import viewsProductsRouter from "./src/routes/views/products.views.routes.js";
import { __dirname, connectMongo } from "./utils.js";
import handlebars from "express-handlebars";
import viewsCartsRouter from "./src/routes/views/carts.views.routes.js";
import cookieParser from "cookie-parser";
import session from "express-session";

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
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Views products endpoints
app.use("/front/products", viewsProductsRouter);
// Views carts endpoints
app.use("/front/carts", viewsCartsRouter);
// Product endpoints
app.use("/products", productsRouter);
// Carts enpoints
app.use("/carts", cartsRouter);
// Users endpoints
app.use("/users", usersRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});
