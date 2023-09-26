const changeRole = async (id) => {
  try {
    const response = await fetch(
      `${constants.clientUrl}/api/users/premium/${id}`,
      {
        method: "PUT",
      }
    );

    const jsonRes = await response.json();

    if (jsonRes.status === "error") {
      Swal.fire({
        title: "Error!",
        text: `${jsonRes.error}`,
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    const res = await Swal.fire({
      title: "Success!",
      text: `${jsonRes.msg}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    if (res.isConfirmed) {
      location.reload();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const deleteUser = async (id) => {
  try {
    const response = await fetch(`${constants.clientUrl}/api/users/${id}`, {
      method: "DELETE",
    });

    const jsonRes = await response.json();

    if (jsonRes.status === "error") {
      Swal.fire({
        title: "Error!",
        text: `${jsonRes.error}`,
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    const res = await Swal.fire({
      title: "Success!",
      text: `${jsonRes.msg}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    if (res.isConfirmed) {
      location.reload();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};

const deleteInactiveUsers = async () => {
  try {
    const response = await fetch(`${constants.clientUrl}/api/users/`, {
      method: "DELETE",
    });

    const jsonRes = await response.json();

    if (jsonRes.status === "error") {
      Swal.fire({
        title: "Error!",
        text: `${jsonRes.error}`,
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }

    const res = await Swal.fire({
      title: "Success!",
      text: `${jsonRes.msg}`,
      icon: "success",
      confirmButtonText: "OK",
    });

    if (res.isConfirmed) {
      location.reload();
    }
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
};
