const constants = {
  clientUrl: "https://coder-backend-final.onrender.com",
  // clientUrl: "http://localhost:8080",
};

const reloadWindow = async () => {
  Swal.fire({
    title: "Reloading...",
    allowOutsideClick: false,
    backdrop: true,
  });
  Swal.showLoading();
  location.reload();
};

const apiCall = async (title, url, method, callbackSuccess, formData) => {
  const res = await Swal.fire({
    title: title,
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
  });

  if (res.isConfirmed) {
    try {
      Swal.fire({
        title: "Please wait",
        allowOutsideClick: false,
        backdrop: true,
      });
      Swal.showLoading();

      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      const jsonRes = await response.json();

      Swal.close();

      if (!response.ok) {
        throw jsonRes;
      }

      const res = await Swal.fire({
        title: "Success!",
        text: `${jsonRes.msg}`,
        icon: "success",
        confirmButtonText: "OK",
      });

      if (res.isConfirmed) {
        callbackSuccess(jsonRes);
      }

      return jsonRes.data;
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

const pathToPublic = (path) => {
  const indexPublic = path.indexOf("products");

  return `../../static/${path.slice(indexPublic)}`;
};
