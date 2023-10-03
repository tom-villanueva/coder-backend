let productId;

const updateProduct = async (id) => {
  apiCall(
    "Update product?",
    `${constants.clientUrl}/api/products/${id}`,
    "PUT",
    reloadWindow
  );
};

const createProduct = async (id) => {
  apiCall(
    "Create product?",
    `${constants.clientUrl}/api/products`,
    "POST",
    reloadWindow
  );
};

const deleteProduct = async (id) => {
  apiCall(
    "Create product?",
    `${constants.clientUrl}/api/products/${id}`,
    "DELETE",
    reloadWindow
  );
};

const showForm = () => {
  const form = document.getElementById("productForm");

  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
  }
};

const resetFields = () => {
  productId = null;
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const stock = document.getElementById("stock");
  const status = document.getElementById("status");
  const price = document.getElementById("price");
  const category = document.getElementById("category");
  const code = document.getElementById("code");
  const image = document.getElementById("productImage");

  title.value = "";
  description.value = "";
  stock.value = "";
  status.value = "true";
  price.value = "";
  category.value = "";
  code.value = "";
  image.src = "";
  showForm();
};

const setFormFieldsEdit = async (id) => {
  try {
    document.getElementById("spinner")?.classList.remove("hidden");

    const response = await fetch(`${constants.clientUrl}/api/products/${id}`, {
      method: "GET",
    });

    const jsonRes = await response.json();

    document.getElementById("spinner")?.classList.add("hidden");

    if (!response.ok) {
      throw jsonRes;
    }

    const product = jsonRes.data;

    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const stock = document.getElementById("stock");
    const status = document.getElementById("status");
    const price = document.getElementById("price");
    const category = document.getElementById("category");
    const code = document.getElementById("code");
    const image = document.getElementById("productImage");

    title.value = product.title;
    description.value = product.description;
    stock.value = product.stock;
    status.value = product.status;
    price.value = product.price;
    category.value = product.category;
    code.value = product.code;
    image.src = pathToPublic(product.thumbnail);

    productId = product._id;
    showForm();
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.error ?? error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const save = (e) => {
  e.preventDefault();
  if (productId) {
    apiCall(
      "Edit product?",
      `${constants.clientUrl}/api/products/${productId}`,
      "PUT",
      reloadWindow
    );
  } else {
    apiCall(
      "Add to cart?",
      `${constants.clientUrl}/api/products`,
      "POST",
      reloadWindow
    );
  }
};

const setForm = () => {
  document.getElementById("productForm").addEventListener("submit", save);
};

setForm();
