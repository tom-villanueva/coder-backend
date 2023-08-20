import { connect } from "mongoose";
import env from "../../config.js";
import { logger } from "./winston.util.js";

export const connectMongo = async () => {
  try {
    await connect(env.mongoUrl);
    logger.info("Connected to mongo");
  } catch (error) {
    logger.info(error);
    throw "Can not connect to the db";
  }
};
