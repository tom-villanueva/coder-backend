const failLoginController = (req, res) => {
  return res.send({ error: "Fail to login" });
};

export default failLoginController;
