import Product from "./Product.js";
import { readFileSync } from "fs";
import * as fs from "fs/promises";
import { BadRequestError, NotFoundError } from "./error.js";

class ProductManager {
  static #ID = 0;

  constructor(path) {
    this.products = [];
    this.path = path;
    const productsFileContent = readFileSync(this.path, "utf-8");
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

  async #saveProductsInFile() {
    const productsStringContent = JSON.stringify(this.products);
    return fs.writeFile(this.path, productsStringContent);
  }

  async #checkFields(product) {
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

  #checkValidNumber(value) {
    if (parseInt(value) !== Number(value) || value < 0) {
      throw new Error(`value ${value} is not a valid number`);
    }
  }

  /**
   * Agrega un producto al arreglo de productos. El producto debe tener campos válidos y un código único.
   * @param {Promise<Product>} product - Objeto de producto que se va a agregar.
   * @throws {Error} - Lanza una excepción si algún campo no es válido o si el código del producto ya existe.
   */
  async addProduct(product) {
    return new Promise(async (resolve, reject) => {
      try {
        this.#checkFields(product);
      } catch (error) {
        reject(error);
      }
  
      if (this.products.some((p) => p.code === product.code)) {
        reject(new Error("Code in products already exists"));
      }
  
      const newProduct = {
        id: this.#generateId(),
        ...product,
      };
  
      this.products.push(newProduct);
  
      // Guardo en el archivo
      await this.#saveProductsInFile();
  
      resolve(newProduct);
    })
  }

  /**
   * Actualiza un producto existente en el arreglo de productos por ID.
   * @param {number} id - ID del producto a actualizar.
   * @param {Product} updatedProduct - Objeto de producto actualizado.
   * @returns {Promise<Product>} - Objeto de producto actualizado.
   * @throws {Error} - Lanza una excepción si los IDs no coinciden, si algún campo del objeto de producto actualizado es inválido o si el producto no existe.
   */
  async updateProduct(id, updatedProduct) {
    return new Promise(async (resolve, reject) => {
      // Verificar que el producto a actualizar no pise el id ya existente
      if (updatedProduct.hasOwnProperty("id")) {
        if (id !== updatedProduct.id) {
          reject(new Error(`The IDs dont' match`));
        }
      }
  
      this.#checkFields(updatedProduct);
  
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
  
      if (productIndex === -1) {
        reject(new Error(`Not found`));
      }
  
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedProduct,
      };
  
      // Guardo en el archivo
      await this.#saveProductsInFile();
  
      resolve(this.products[productIndex]);
    })
  }

  /**
   * Elimina un producto del arreglo de productos por ID
   *
   * @param {number} id - ID del producto a eliminar.
   * @returns {Promise<object>} - Un objeto con la propiedad deleted en true si se eliminó exitosamente.
   * @throws {Error} - Lanza una excepción si el id es inválido o si el producto no existe.
   */
  async deleteProduct(id) {
    return new Promise(async (resolve, reject) => {
      try {
        this.#checkId(id);
      } catch (error) {
        reject(error);
      }
  
      const productIndex = this.products.findIndex(
        (product) => product.id === id
      );
  
      if (productIndex === -1) {
        reject(new Error(`Not found`));
      }
  
      this.products.splice(productIndex, 1);
  
      // Guardo en el archivo
      await this.#saveProductsInFile();
  
      resolve({ deleted: true });
    })
  }

  /**
   * Devuelve el arreglo de productos.
   * @returns {Promise<Product[]>} - Arreglo de objetos de producto.
   */
  getProducts(limit) {
    return new Promise((resolve, reject) => {
      if(limit) {
        try {
          this.#checkValidNumber(limit);
        } catch (error) {
          reject(new BadRequestError(error.message));
        }

        resolve(this.products.slice(0, limit));
      }

      resolve(this.products);
    })
  }

  /**
   * Busca un producto en el arreglo de productos por ID.
   * @param {number} id - ID del producto a buscar.
   * @returns {Promise<Product>} - Objeto de producto con el ID especificado.
   * @throws {Error} - Lanza una excepción si el ID no es un número o si no se encuentra ningún producto con ese ID.
   */
  getProductById(id) {
    return new Promise((resolve, reject) => {
      try {
        this.#checkId(id);
      } catch (error) {
        reject(new BadRequestError(error.message));
      }
  
      const product = this.products.find((product) => product.id === id);
  
      if (!product) {
        reject(new NotFoundError(`Product with id ${id} doesn't exist`));
      }
  
      resolve(product);
    })
  }
}

export default ProductManager;
