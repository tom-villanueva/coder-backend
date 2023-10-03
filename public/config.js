const constants = {
  //clientUrl: "https://coder-backend-final.onrender.com",
  clientUrl: "http://localhost:8080",
};

const reloadWindow = () => {
  location.reload();
};

const apiCall = async (title, url, method, callbackSuccess) => {
  const res = await Swal.fire({
    title: title,
    text: ``,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "OK",
  });

  if (res.isConfirmed) {
    try {
      document.getElementById("spinner")?.classList.remove("hidden");

      const response = await fetch(url, {
        method: method,
      });

      const jsonRes = await response.json();

      document.getElementById("spinner")?.classList.add("hidden");

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
        callbackSuccess();
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
