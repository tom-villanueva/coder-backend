const getCart = async () => {
  let storedCart = JSON.parse(localStorage.getItem("cart"));

  if (!storedCart) {
    const response = await fetch("http://localhost:8080/api/sessions/current", {
      method: "GET",
    });
    const user = await response.json();

    localStorage.setItem("cart", JSON.stringify(user.data.cart));
    storedCart = user.data.cart;
  }

  return storedCart;
};

const addProductToCart = async (productId) => {
  try {
    const cart = await getCart();
    const response = await fetch(
      `http://localhost:8080/api/carts/${cart}/product/${productId}`,
      {
        method: "POST",
      }
    );

    const addedProduct = await response.json();
    // localStorage.setItem("cart", JSON.stringify(addedProduct.data));

    return addedProduct.data;
  } catch (error) {
    console.log(error);
  }
};
