const getCart = async () => {
  let storedCart = JSON.parse(localStorage.getItem("cart"));

  if (!storedCart) {
    const response = await fetch("http://localhost:8080/carts", {
      method: "POST",
    });
    const newCart = await response.json();

    localStorage.setItem("cart", JSON.stringify(newCart.data));
    storedCart = newCart.data;
  }

  return storedCart;
};

const addProductToCart = async (productId) => {
  try {
    const cart = await getCart();
    const response = await fetch(
      `http://localhost:8080/carts/${cart._id}/product/${productId}`,
      {
        method: "POST",
      }
    );

    const addedProduct = await response.json();
    localStorage.setItem("cart", JSON.stringify(addedProduct.data));

    return addedProduct.data;
  } catch (error) {
    console.log(error);
  }
};
