const productDTO = (product) => {
  return {
    title: product.title,
    description: product.description,
    price: product.price,
    code: product.code,
    stock: product.stock,
    status: product.status,
    category: product.category,
  };
};

export default productDTO;
