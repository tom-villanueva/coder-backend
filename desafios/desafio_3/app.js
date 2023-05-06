import ProductManager from "./ProductManager.js";
import express from "express";
import path from 'path';
import {fileURLToPath} from 'url';

// Consigo la ruta del archivo de productos, para pasarsela al ProductManager
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCT_PATH = path.join(__dirname, '/desafio_3', 'products.json');
const productManager = new ProductManager(PRODUCT_PATH);
const port = 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.get("/products", async (req, res) => {
	let products = [];

	if(req.query?.limit) {
		try {
			products = await productManager.getProducts(req.query.limit);
		} catch (error) {
			return res.status(error.statusCode).json({
				status: "error",
				msg: error.message,
				data: {},
			});
		}
	} else {
		products = await productManager.getProducts();
	}

	return res.status(200).json({
		status: "success",
		msg: "Products list",
		data: products,
	});
});

app.get("/products/:pid", async (req, res) => {
  try {
    const product = await productManager.getProductById(Number(req.params.pid));
    return res.status(200).json({
      status: "success",
      msg: "Product found",
      data: product,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      status: "error",
      msg: error.message,
      data: {},
    });
  }
});

app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "Route not found",
    data: {},
  });
});
