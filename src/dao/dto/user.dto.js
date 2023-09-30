const userDTO = (user) => {
  return {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: user.firstName + " " + user.lastName,
    cart: user.cart,
    role: user.role,
  };
};

export default userDTO;
