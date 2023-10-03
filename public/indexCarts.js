const buyCart = async (id) => {
  apiCall(
    "Buy?",
    `${constants.clientUrl}/api/carts/${id}/purchase`,
    "POST",
    (response) => {
      location.href = `/carts/purchase-success?ticket=${response.data.ticket.code}`;
    }
  );
};

const clearCart = async (cid) => {
  apiCall(
    "Clear cart?",
    `${constants.clientUrl}/api/carts/${cid}`,
    "DELETE",
    reloadWindow
  );
};

const deleteProductFromCart = async (productId) => {
  try {
    const cart = await getCart();
    apiCall(
      "Delete from cart?",
      `${constants.clientUrl}/api/carts/${cart}/product/${productId}`,
      "DELETE",
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
