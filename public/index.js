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
  const res = await Swal.fire({
    title: "Add to cart?",
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
  });

  if (res.isConfirmed) {
    try {
      document.getElementById("spinner").classList.remove("hidden");
      const cart = await getCart();
      const response = await fetch(
        `${constants.clientUrl}/api/carts/${cart}/product/${productId}`,
        {
          method: "POST",
        }
      );

      const addedProduct = await response.json();

      document.getElementById("spinner").classList.add("hidden");

      if (!response.ok) {
        throw addedProduct;
      }

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
        text: `${error.error ?? error.message}`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
};
