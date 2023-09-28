import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../utils/error.util.js";
import { sendEmail } from "../utils/email.util.js";

class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  checkId(id) {
    if (!id) {
      throw new BadRequestError("Id required");
    }
  }

  async getAllProducts({ limit = 10, page = 1, category, status, sort }) {
    try {
      const query = {
        ...(category ? { category: category } : {}),
        ...(status ? { status: status } : {}),
      };

      const products = await this.dao.get(query, limit, page, sort);

      return products;
    } catch (error) {
      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      throw new ServerError(error);
    }
  }

  async getProductsByIds(ids) {
    try {
      const products = await this.dao.getByIds(ids);

      return products;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await this.dao.getOne({ _id: id });

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      return product;
    } catch (error) {
      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async createProduct(product, user) {
    try {
      let productToAdd = product;

      if (user.role === "premium") {
        productToAdd = {
          ...product,
          owner: user.email,
        };
      }

      const newProduct = await this.dao.create(productToAdd);

      return newProduct;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }

      throw new ServerError(error);
    }
  }

  async updateProduct(id, product) {
    try {
      this.checkId(id);
      const updatedProduct = await this.dao.updateProduct(id, product);

      if (updatedProduct.modifiedCount === 0) {
        throw new NotFoundError("Product not found with that id");
      }

      return updatedProduct;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "BadRequestError") {
        throw error;
      }

      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }

  async deleteProduct(id) {
    try {
      this.checkId(id);

      const product = await this.getProductById(id);

      const deletedProduct = await this.dao.deleteProduct(id);

      if (deletedProduct.deletedCount === 0) {
        throw new NotFoundError("Product not found with that id");
      }

      if (product.owner) {
        const emailHtml = `
        <html>
          <body>
            <h1>Hello</h1>
            <p>Your product ${product.title} has been deleted</p>
          </body>
        </html>`;

        sendEmail(product.owner, "Information: product deletion", emailHtml);
      }

      return deletedProduct;
    } catch (error) {
      if (error.name === "CastError") {
        throw new BadRequestError(error.message);
      }

      if (error.name === "BadRequestError") {
        throw error;
      }

      if (error.name === "NotFoundError") {
        throw error;
      }

      throw new ServerError(error);
    }
  }
}

export default ProductService;
