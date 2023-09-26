import { UserService } from "../../services/index.js";
import { BadRequestError } from "../../utils/error.util.js";

const uploadDocumentsController = async (req, res, next) => {
  try {
    if (!req.files) {
      throw new BadRequestError("Must upload at least one file");
    }

    const user = await UserService.uploadDocuments(req.params.uid, req.files);

    return res.status(200).json({
      status: "success",
      msg: "Updated user documents",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export default uploadDocumentsController;
