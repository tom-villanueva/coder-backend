import { ErrorCodes } from "../utils/error.util.js";

export default (error, req, res, next) => {
  if (Object.values(ErrorCodes).includes(error.errorCode)) {
    req.logger.error(error.message);
    return res
      .status(error.statusCode)
      .send({ status: "error", error: error.message });
  }

  req.logger.fatal(error);
  return res.status(500).send({ status: "error", error: "Unexpected Error!" });
};
