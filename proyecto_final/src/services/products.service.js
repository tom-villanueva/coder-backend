import ProductModel from "../dao/models/products.model.js";
import {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../utils/error.util.js";

class ProductService {
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
      const products = await ProductModel.paginate(query, {
        limit,
        page,
        sort: { price: sort },
      });

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
      const products = await ProductModel.find({ _id: { $in: ids } });

      return products;
    } catch (error) {
      throw new ServerError(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findOne({ _id: id });

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

  async createProduct(product) {
    try {
      const newProduct = await ProductModel.create(product);
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
      const updatedProduct = await ProductModel.updateOne({ _id: id }, product);

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
      const deletedProduct = await ProductModel.deleteOne({ _id: id });

      if (deletedProduct.deletedCount === 0) {
        throw new NotFoundError("Product not found with that id");
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

export default new ProductService();
