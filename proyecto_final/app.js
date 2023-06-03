import express from "express";
import productsRouter from "./src/routes/products/products.js";
import cartsRouter from "./src/routes/carts/carts.js";
import usersRouter from "./src/routes/users/users.js";
import viewsProductsRouter from "./src/routes/views/viewsProducts.js";
import { __dirname, connectMongo } from "./utils.js";
import handlebars from "express-handlebars";

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
app.use("/static", express.static(__dirname + "/public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Views endpoints
app.use("/", viewsProductsRouter);
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
