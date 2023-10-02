const buyCart = async (id) => {
  const res = await Swal.fire({
    title: "Buy?",
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
  });

  if (res.isConfirmed) {
    try {
      document.getElementById("spinner").classList.remove("hidden");
      const response = await fetch(
        `${constants.clientUrl}/api/carts/${id}/purchase`,
        {
          method: "POST",
        }
      );

      const buyTicket = await response.json();

      document.getElementById("spinner").classList.add("hidden");

      if (!response.ok) {
        throw buyTicket;
      }

      const res = await Swal.fire({
        title: "Success!",
        text: `${buyTicket.msg}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      if (res.isConfirmed) {
        location.reload();
      }

      return buyTicket.data;
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

const clearCart = async (cid) => {
  const res = await Swal.fire({
    title: "Clear cart?",
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
  });

  if (res.isConfirmed) {
    try {
      document.getElementById("spinner").classList.remove("hidden");
      const response = await fetch(`${constants.clientUrl}/api/carts/${cid}`, {
        method: "DELETE",
      });

      const deletedProduct = await response.json();

      document.getElementById("spinner").classList.add("hidden");

      if (!response.ok) {
        throw deletedProduct;
      }

      const res = await Swal.fire({
        title: "Success!",
        text: `${deletedProduct.msg}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      if (res.isConfirmed) {
        location.reload();
      }

      return deletedProduct.data;
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

const deleteProductFromCart = async (productId) => {
  const res = await Swal.fire({
    title: "Delete from cart?",
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
          method: "DELETE",
        }
      );

      const deletedProduct = await response.json();

      document.getElementById("spinner").classList.add("hidden");

      if (!response.ok) {
        throw deletedProduct;
      }

      const res = await Swal.fire({
        title: "Success!",
        text: `${deletedProduct.msg}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      if (res.isConfirmed) {
        location.reload();
      }

      return deletedProduct.data;
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
