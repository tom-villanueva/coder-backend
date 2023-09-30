const failRegisterController = (req, res, next) => {
  return res.send({ error: "Fail to register" });
};

export default failRegisterController;
