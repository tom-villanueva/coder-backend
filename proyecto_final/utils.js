import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { connect } from "mongoose";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, res, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

export const connectMongo = async () => {
  try {
    await connect(
      "mongodb+srv://flaigan12:W7vSuL5taZoWRMZM@coder.tvviezb.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("Connected to mongo");
  } catch (error) {
    console.log(error);
    throw "Can not connect to the db";
  }
};
