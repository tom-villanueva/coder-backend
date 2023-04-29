import ProductManager from "./ProductManager.js";
import Product from "./Product.js";

try {
  const productManager = new ProductManager();
  console.log("---------------------------\n");
  console.log("Test 1: agregar producto \n");
  console.log(productManager.getProducts());

  productManager.addProduct(
    new Product(
      "producto prueba",
      "Este es un producto prueba",
      200,
      "Sin imagen",
      "abc123",
      25
    )
  );

  productManager.addProduct(
    new Product(
      "producto prueba N°2",
      "Este es un producto prueba N°2",
      200,
      "Sin imagen",
      "abc122",
      25
    )
  );

  console.log("---------------------------\n");
  console.log("Test 2: get productos \n");
  console.log(productManager.getProducts());

  console.log("---------------------------\n");
  console.log("Test 3: get producto by id \n");
  console.log(productManager.getProductById(1)); // expected output: Product

  try {
    console.log("---------------------------\n");
    console.log("Test 4: add product con codigo repetido \n");
    productManager.addProduct(
      new Product(
        "producto prueba",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
      )
    ); // expected output: Error: Code in products already exists
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("---------------------------\n");
    console.log("Test 5: get product by id con id inexistente \n");
    console.log(productManager.getProductById(54)); // expected output: Error: Not found
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("---------------------------\n");
    console.log("Test 6: update producto by id \n");
    const updatedProduct = productManager.getProductById(1);
    console.log("Antes: \n", updatedProduct);

    updatedProduct.title = "Actualizando el producto 1";
    updatedProduct.stock -= 5;

    productManager.updateProduct(1, updatedProduct);

    const afterProduct = productManager.getProductById(1);
    console.log("Después: \n", afterProduct);
  } catch (error) {
    console.error(error);
  }

  try {
    console.log("---------------------------\n");
    console.log("Test 7: delete producto by id 1 \n");
    productManager.deleteProduct(1);
    console.log("Al buscar id 1:");
    console.log(productManager.getProductById(1)); // expected output: Error: Not found
  } catch (error) {
    console.error(error);
  }
} catch (error) {
  console.error(error);
}
