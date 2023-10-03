const getCart = async () => {
  try {
    Swal.fire({ title: "Please wait", allowOutsideClick: false });
    Swal.showLoading();

    const response = await fetch(
      `${constants.clientUrl}/api/sessions/current`,
      {
        method: "GET",
      }
    );
    const user = await response.json();

    Swal.close();

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

function onFilterFormSubmit(e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  location.href = `${constants.clientUrl}/products/?page=1&limit=${data.limit}&category=${data.category}&status=${data.status}&sort=${data.sort}`;
}

function clearFilters() {
  location.href = `${constants.clientUrl}/products/?page=1&limit=10&category=&status=true&sort=`;
}

document
  .getElementById("filterForm")
  ?.addEventListener("submit", onFilterFormSubmit);
document
  .getElementById("clearFiltersButton")
  ?.addEventListener("click", clearFilters);
