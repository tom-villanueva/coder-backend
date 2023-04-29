import Product from "./Product.js";

class ProductManager {
  static #ID = 0;

  constructor(products = []) {
    this.products = products;
  }

  #generateId() {
    ProductManager.#ID += 1;
    return ProductManager.#ID;
  }

  /**
   * Agrega un producto al arreglo de productos. El producto debe tener campos válidos y un código único.
   * @param {Product} product - Objeto de producto que se va a agregar.
   * @throws {Error} - Lanza una excepción si algún campo no es válido o si el código del producto ya existe.
   */
  addProduct(product) {
    const fieldsError = Product.checkValidFields(product);

    if (fieldsError.length > 0) {
      throw new Error(`Invalid fields ${fieldsError}`);
    }

    if (this.products.some((p) => p.code === product.code)) {
      throw new Error("Code in products already exists");
    }

    const newProduct = {
      id: this.#generateId(),
      ...product,
    };

    this.products.push(newProduct);
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
    if (parseInt(id) !== Number(id)) {
      throw new Error(`ID ${id} is not a number`);
    }

    const product = this.products.find((product) => product.id === id);

    if (!product) {
      throw new Error(`Not found`);
    }

    return product;
  }
}

export default ProductManager;
