import express from "express";
import productsRouter from "./src/api/products/products.js";
import cartsRouter from "./src/api/carts/carts.js";

const port = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

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