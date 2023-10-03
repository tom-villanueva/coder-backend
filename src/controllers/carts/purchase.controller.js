import { CartService } from "../../services/index.js";

const purchaseController = async (req, res, next) => {
  try {
    const result = await CartService.purchase(req.params.cid, req.session.user);

    return res.status(200).json({
      status: "success",
      msg: "Purchase completed",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export default purchaseController;
