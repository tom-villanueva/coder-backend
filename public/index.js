const getCart = async () => {
  try {
    const response = await fetch(
      `${constants.clientUrl}/api/sessions/current`,
      {
        method: "GET",
      }
    );
    const user = await response.json();

    if (!response.ok) {
      throw user;
    }

    storedCart = user.data.cart;

    return storedCart;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.error ?? error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const addProductToCart = async (productId) => {
  try {
    const cart = await getCart();
    apiCall(
      "Add to cart?",
      `${constants.clientUrl}/api/carts/${cart}/product/${productId}`,
      "POST",
      reloadWindow
    );
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.error ?? error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
