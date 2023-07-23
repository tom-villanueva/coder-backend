import Product from "./Product.js";
import { BadRequestError, NotFoundError } from "../error.js";
import Manager from "../Manager.js";
import filePaths from "../../../data/dataPaths.js";

let instance;

class ProductManager extends Manager {
  static #ID = 0;

  constructor(path) {
    super(path);
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;

    // Seteo el último ID
    if (this.entities.length > 0) {
      const lastProduct = this.entities[this.entities.length - 1];
      ProductManager.#ID = lastProduct.id;
    }

    this.entities = this.entities.map((product) => {
      return new Product(product);
    });
  }

  getInstance() {
    return this;
  }

  #generateId() {
    ProductManager.#ID += 1;
    return ProductManager.#ID;
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
      let newProduct;
      try {
        // Si algun field es incorrecto, el constructor de Product tira error
        newProduct = new Product({
          ...product,
        });
      } catch (error) {
        return reject(new BadRequestError(error.message));
      }

      if (this.entities.some((p) => p.code === product.code)) {
        return reject(new BadRequestError("Code in products already exists"));
      }

      // Si esta todo ok, creo el id
      const id = this.#generateId();

      newProduct.updateFields({
        id: id,
      });

      this.entities.push(newProduct);

      // Guardo en el archivo
      await this.saveEntitiesInFile();

      return resolve(newProduct);
    });
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
          return reject(new BadRequestError(`The IDs dont' match`));
        }
      }

      const productIndex = this.entities.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        return reject(new BadRequestError(`Not found`));
      }

      try {
        this.entities[productIndex].updateFields(updatedProduct);
      } catch (error) {
        return reject(new BadRequestError(error.message));
      }

      // Guardo en el archivo
      await this.saveEntitiesInFile();

      return resolve(this.entities[productIndex]);
    });
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
        return reject(error);
      }

      const productIndex = this.entities.findIndex(
        (product) => product.id === id
      );

      if (productIndex === -1) {
        return reject(new NotFoundError(`Not found`));
      }

      this.entities.splice(productIndex, 1);

      // Guardo en el archivo
      await this.saveEntitiesInFile();

      return resolve({ deleted: true });
    });
  }

  /**
   * Devuelve el arreglo de productos.
   * @returns {Promise<Product[]>} - Arreglo de objetos de producto.
   */
  getProducts(limit) {
    return new Promise((resolve, reject) => {
      if (limit) {
        try {
          this.#checkValidNumber(limit);
        } catch (error) {
          return reject(new BadRequestError(error.message));
        }

        return resolve(this.entities.slice(0, limit));
      }

      return resolve(this.entities);
    });
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
        return reject(new BadRequestError(error.message));
      }

      const product = this.entities.find((product) => product.id === id);

      if (!product) {
        return reject(new NotFoundError(`Product with id ${id} doesn't exist`));
      }

      return resolve(product);
    });
  }
}

const singletonManager = Object.freeze(
  new ProductManager(filePaths.productsFilePath)
);
export default singletonManager;
