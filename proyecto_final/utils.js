import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { connect } from "mongoose";
import bcrypt from "bcrypt";

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
    await connect("");
    console.log("Connected to mongo");
  } catch (error) {
    console.log(error);
    throw "Can not connect to the db";
  }
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hashPassword) =>
  bcrypt.compareSync(password, hashPassword);

export const auth = (req, res, next) => {
  if (req.session.user) {
    return next();
  }

  return res.redirect("/login");
  // return res.status(401).send("Unauthenticated");
};
