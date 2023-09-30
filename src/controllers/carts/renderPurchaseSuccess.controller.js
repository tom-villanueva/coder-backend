const renderPurchaseSuccessController = async (req, res, next) => {
  const context = {
    ticket: {
      code: req.query.ticket,
    },
  };

  res.render("purchaseSuccess", context);
};

export default renderPurchaseSuccessController;
