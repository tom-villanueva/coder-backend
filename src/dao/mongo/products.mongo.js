import ProductModel from "./models/products.model.js";

export default class Products {
  constructor() {}

  async get(query, limit, page, sort) {
    const products = await ProductModel.paginate(query, {
      limit,
      page,
      sort: { price: sort },
    });

    return products;
  }

  async getOne(id) {
    const product = await ProductModel.findOne({ _id: id });
    return product;
  }

  async getByIds(ids) {
    const products = await ProductModel.find({ _id: { $in: ids } });

    return products;
  }

  async create(data) {
    const result = await ProductModel.create(data);
    return result;
  }

  async updateProduct(id, product) {
    const updatedProduct = await ProductModel.updateOne({ _id: id }, product);

    return updatedProduct;
  }

  async deleteProduct(id) {
    const deletedProduct = await ProductModel.deleteOne({ _id: id });

    return deletedProduct;
  }
}
