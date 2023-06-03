import ProductModel from "../dao/models/products.model.js";

class ProductService {
  async getAllProducts() {
    const product = await ProductModel.find({});
    return product;
  }
}

export default new ProductService();
