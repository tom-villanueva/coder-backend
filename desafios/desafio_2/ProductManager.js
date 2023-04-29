import Product from "./Product.js";
import * as fs from "fs";

class ProductManager {
  static #ID = 0;

  constructor() {
    this.products = [];
    const productsFileContent = fs.readFileSync("products.json", "utf-8");
    const storedProducts = JSON.parse(productsFileContent);

    this.products = storedProducts;

    // Seteo el último ID
    if (storedProducts.length > 0) {
      const lastProduct = storedProducts[storedProducts.length - 1];
      ProductManager.#ID = lastProduct.id;
    }
  }

  #generateId() {
    ProductManager.#ID += 1;
    return ProductManager.#ID;
  }

  #saveProductsInFile() {
    const productsStringContent = JSON.stringify(this.products);
    fs.writeFileSync("products.json", productsStringContent);
  }

  #checkFields(product) {
    const fieldsError = Product.checkValidFields(product);

    if (fieldsError.length > 0) {
      throw new Error(`Invalid fields ${fieldsError}`);
    }
  }

  #checkId(id) {
    if (parseInt(id) !== Number(id)) {
      throw new Error(`ID ${id} is not a number`);
    }
  }

  /**
   * Agrega un producto al arreglo de productos. El producto debe tener campos válidos y un código único.
   * @param {Product} product - Objeto de producto que se va a agregar.
   * @throws {Error} - Lanza una excepción si algún campo no es válido o si el código del producto ya existe.
   */
  addProduct(product) {
    this.#checkFields(product);

    if (this.products.some((p) => p.code === product.code)) {
      throw new Error("Code in products already exists");
    }

    const newProduct = {
      id: this.#generateId(),
      ...product,
    };

    this.products.push(newProduct);

    // Guardo en el archivo
    this.#saveProductsInFile();

    return newProduct;
  }

  /**
   * Actualiza un producto existente en el arreglo de productos por ID.
   * @param {string} id - ID del producto a actualizar.
   * @param {Product} updatedProduct - Objeto de producto actualizado.
   * @returns {Product} - Objeto de producto actualizado.
   * @throws {Error} - Lanza una excepción si los IDs no coinciden, si algún campo del objeto de producto actualizado es inválido o si el producto no existe.
   */
  updateProduct(id, updatedProduct) {
    // Verificar que el producto a actualizar no pise el id ya existente
    if (updatedProduct.hasOwnProperty("id")) {
      if (id !== updatedProduct.id) {
        throw new Error(`The IDs dont' match`);
      }
    }

    this.#checkFields(updatedProduct);

    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      throw new Error(`Not found`);
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedProduct,
    };

    // Guardo en el archivo
    this.#saveProductsInFile();

    return this.products[productIndex];
  }

  /**
   * Elimina un producto del arreglo de productos por ID
   *
   * @param {number} id - ID del producto a eliminar.
   * @returns {object} - Un objeto con la propiedad deleted en true si se eliminó exitosamente.
   * @throws {Error} - Lanza una excepción si el id es inválido o si el producto no existe.
   */
  deleteProduct(id) {
    this.#checkId(id);

    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      throw new Error(`Not found`);
    }

    this.products.splice(productIndex, 1);

    // Guardo en el archivo
    this.#saveProductsInFile();

    return { deleted: true };
  }

  /**
   * Devuelve el arreglo de productos.
   * @returns {Product[]} - Arreglo de objetos de producto.
   */
  getProducts() {
    return this.products;
  }

  /**
   * Busca un producto en el arreglo de productos por ID.
   * @param {number} id - ID del producto a buscar.
   * @returns {Product} - Objeto de producto con el ID especificado.
   * @throws {Error} - Lanza una excepción si el ID no es un número o si no se encuentra ningún producto con ese ID.
   */
  getProductById(id) {
    this.#checkId(id);

    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error(`Not found`);
    }

    return product;
  }
}

export default ProductManager;
