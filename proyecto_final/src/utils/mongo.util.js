import { connect } from "mongoose";
import env from "../../config.js";

export const connectMongo = async () => {
  try {
    await connect(env.mongoUrl);
    console.log("Connected to mongo");
  } catch (error) {
    console.log(error);
    throw "Can not connect to the db";
  }
};
