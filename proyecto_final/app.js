import express from "express";
import productsRouter from "./src/api/products/products.js";
import cartsRouter from "./src/api/carts/carts.js";
import viewsProductsRouter from "./src/api/views/viewsProducts.js";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";

const port = 8080;

const app = express();

// Config de express-handlebars
app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/src/views');

app.set('view engine', 'handlebars');

// Config de express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(__dirname + '/public'));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// Views endpoints
app.use("/", viewsProductsRouter);
// Product endpoints
app.use("/products", productsRouter);
// Carts enpoints
app.use("/carts", cartsRouter);

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});