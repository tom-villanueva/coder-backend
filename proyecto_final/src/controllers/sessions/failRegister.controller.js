const failRegisterController = (req, res) => {
  return res.send({ error: "Fail to register" });
};

export default failRegisterController;
