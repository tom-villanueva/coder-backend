const failLoginController = (req, res, next) => {
  return res.send({ error: "Fail to login" });
};

export default failLoginController;
