const getCart = async () => {
  try {
    const response = await fetch(
      `${constants.clientUrl}/api/sessions/current`,
      {
        method: "GET",
      }
    );
    const user = await response.json();
    storedCart = user.data.cart;

    return storedCart;
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const addProductToCart = async (productId) => {
  const res = await Swal.fire({
    title: "Add to cart?",
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
  });

  if (res.isConfirmed) {
    try {
      const cart = await getCart();
      const response = await fetch(
        `${constants.clientUrl}/api/carts/${cart}/product/${productId}`,
        {
          method: "POST",
        }
      );

      const addedProduct = await response.json();

      const res = await Swal.fire({
        title: "Success!",
        text: `${addedProduct.msg}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      if (res.isConfirmed) {
        location.reload();
      }

      return addedProduct.data;
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};
