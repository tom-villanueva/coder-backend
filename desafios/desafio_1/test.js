try {
  const productManager = new ProductManager();
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

  console.log(productManager.getProducts());

  console.log(productManager.getProductById(1)); // expected output: Product
} catch (error) {
  console.error(error);
}

try {
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
  console.log(productManager.getProductById(54)); // expected output: Error: Not found
} catch (error) {
  console.error(error);
}
