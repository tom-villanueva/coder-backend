import { BadRequestError, NotFoundError } from "../error.js";
import filePaths from "../../resources/resourcesPaths.js";
import Manager from "../Manager.js";
import Cart from "./Cart.js";

let instance;

class CartManager extends Manager{
  static #ID = 0;

  constructor(path) {
    super(path);
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;

    // Seteo el último ID
    if (this.entities.length > 0) {
      const lastCart = this.entities[this.entities.length - 1];
      CartManager.#ID = lastCart.id;
    }

    this.entities = this.entities.map((cart) => {
      return new Cart(cart);
    });
  }

  #generateId() {
    CartManager.#ID += 1;
    return CartManager.#ID;
  }

  #checkId(id) {
    if (parseInt(id) !== Number(id)) {
      throw new Error(`ID ${id} is not a number`);
    }
  }

  addCart() {
    return new Promise(async (resolve, reject) => {
      const id = this.#generateId();

      const newCart = new Cart({id});
  
      this.entities.push(newCart);
  
      // Guardo en el archivo
      await this.saveEntitiesInFile();
  
      return resolve(newCart);
    })
  }

  getCartProducts(id) {
    return new Promise(async (resolve, reject) => {
      try {
        this.#checkId(id);
      } catch (error) {
        return reject(new BadRequestError(error));
      }

      const cart = this.entities.find(
        (cart) => cart.id === id
      );

      if (!cart) {
        return reject(new NotFoundError(`Cart not found`));
      }

      return resolve(cart.getProducts());
    });
  }

  addProductToCart(id, product) {
    return new Promise(async (resolve, reject) => {
      try {
        this.#checkId(id);
      } catch (error) {
        return reject(new BadRequestError(error));
      }

      const cart = this.entities.find(
        (cart) => cart.id === id
      );

      if (!cart) {
        return reject(new NotFoundError(`Cart not found`));
      }

      cart.addProduct(product);
      
      // Guardo en el archivo
      await this.saveEntitiesInFile();

      return resolve(cart);
    })
  }
}

const singletonManager = Object.freeze(new CartManager(filePaths.cartsFilePath));
export default singletonManager;