const changeRole = async (id) => {
  apiCall(
    "Change role?",
    `${constants.clientUrl}/api/users/premium/${id}`,
    "PUT",
    reloadWindow
  );
};

const deleteUser = async (id) => {
  apiCall(
    "Delete user?",
    `${constants.clientUrl}/api/users/${id}`,
    "DELETE",
    reloadWindow
  );
};

const deleteInactiveUsers = async () => {
  apiCall(
    "Delete inactive users?",
    `${constants.clientUrl}/api/users/`,
    "DELETE",
    reloadWindow
  );
};

const uploadDocuments = async (e, id) => {
  e.preventDefault();
  apiCall(
    "Upload documents?",
    `${constants.clientUrl}/api/users/${id}/documents`,
    "POST",
    reloadWindow
  );
};
