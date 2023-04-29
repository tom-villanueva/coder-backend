class Product {
  static SCHEMA = {
    title: (value) => typeof value === "string" && value !== "",
    description: (value) => typeof value === "string" && value !== "",
    price: (value) => parseInt(value) === Number(value) && value > 0,
    thumbnail: (value) => typeof value === "string" && value !== "",
    code: (value) => typeof value === "string" && value !== "",
    stock: (value) => parseInt(value) === Number(value),
  };

  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }

  /**
   * Verifica que los campos del objeto de producto sean válidos según el esquema de producto.
   * @param {Product} product - Objeto de producto que se va a verificar.
   * @returns {Error[]} - Array de objetos de error que contiene mensajes de error para campos no válidos.
   */
  static checkValidFields(product) {
    // Obtener las claves del esquema del producto y filtrar las que no son válidas según el esquema.
    const errors = Object.keys(Product.SCHEMA)
      .filter((key) => !Product.SCHEMA[key](product[key]))
      // Para cada campo no válido, crear un objeto de error con un mensaje de error.
      .map(
        (key) => new Error(`${key} is not valid with value "${product[key]}"\n`)
      );

    return errors;
  }
}

export default Product;
