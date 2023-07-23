import { __dirname } from "../../utils.js";
import path from "path";

const PRODUCTS_FILE_PATH = path.join(__dirname, "src/data/products.json");
const CARTS_FILE_PATH = path.join(__dirname, "src/data/carts.json");

const filePaths = Object.freeze({
  productsFilePath: PRODUCTS_FILE_PATH,
  cartsFilePath: CARTS_FILE_PATH,
});

export default filePaths;
