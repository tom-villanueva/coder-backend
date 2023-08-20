import { logger } from "../utils/winston.util.js";

const addLogger = (req, res, next) => {
  req.logger = logger;
  next();
};

export default addLogger;
