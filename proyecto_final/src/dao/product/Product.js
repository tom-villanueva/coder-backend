class Product {
  static SCHEMA = Object.freeze({
    id: (value) => parseInt(value) === Number(value) && value > 0 || value === undefined,
    title: (value) => typeof value === "string" && value !== "",
    description: (value) => typeof value === "string" && value !== "",
    price: (value) => parseInt(value) === Number(value) && value > 0,
    thumbnail: (value) => typeof value === "string" && value !== "" || value === undefined,
    code: (value) => typeof value === "string" && value !== "",
    stock: (value) => parseInt(value) === Number(value),
    status: (value) => typeof value === "boolean",
    category: (value) =>  typeof value === "string" && value !== "",
  });

  constructor({id, title, description, price, thumbnail, code, stock, category, status = true}) {
    this.#checkCreateFields({id, title, description, price, thumbnail, code, stock, category, status});

    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.status = status;
    this.category = category;
  }

  /**
   * Verifica que los campos del objeto de producto sean válidos según el esquema de producto.
   * @param {Product} product - Objeto de producto que se va a verificar.
   * @returns {Error[]} - Array de objetos de error que contiene mensajes de error para campos no válidos.
   */
  #checkCreateFields(product) {
    // Obtener las claves del esquema del producto y filtrar las que no son válidas según el esquema.
    const errors = Object.keys(Product.SCHEMA)
      .filter((key) => !Product.SCHEMA[key](product[key]))
      // Para cada campo no válido, crear un objeto de error con un mensaje de error.
      .map(
        (key) => new Error(`${key} is not valid with value "${product[key]}"\n`)
      );

    if(errors.length > 0) {
      throw new Error(errors);
    }

    return errors;
  }

  /**
   * Verifica que los campos del objeto de producto sean válidos según el esquema de producto para actualizar.
   * @param {Product} product - Objeto de producto que se va a verificar.
   * @returns {Error[]} - Array de objetos de error que contiene mensajes de error para campos no válidos.
   */
  #checkUpdateFields(product) {
    const schemaKeys = Object.keys(Product.SCHEMA);
    const errors = [];

    Object.keys(product).forEach((productKey) => {
      if(!schemaKeys.includes(productKey)) {
        errors.push(new Error(`${productKey} is not valid\n`))
      } else if(!Product.SCHEMA[productKey](product[productKey])){
        errors.push(new Error(`${productKey} is not valid with value "${product[productKey]}"\n`))
      }
    });

    if(errors.length > 0) {
      throw new Error(errors);
    }

    return errors;
  }

  updateFields(updatedFields) {
    this.#checkUpdateFields(updatedFields);

    Object.keys(updatedFields).forEach((key) => {
      this[key] = updatedFields[key]; 
    });
  }

}

export default Product;
