import multer from "multer";
import { __dirname } from "../../dirname.util.js";
import { existsSync, mkdirSync } from "fs";
import * as path from "path";

const acceptedDocuments = ["identification", "residence", "account_state"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path;

    if (acceptedDocuments.includes(file.fieldname)) {
      path = "/documents";
    } else if (file.fieldname === "profile") {
      path = "/profiles";
    } else if (file.fieldname === "thumbnail") {
      path = "/products";
    }

    path += `/${req.session.user._id}`;

    if (!existsSync(path)) {
      mkdirSync(`${__dirname}/public/${path}`, { recursive: true });
    }

    cb(null, __dirname + "/public" + path);
  },
  filename: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      cb(null, file.originalname);
    } else {
      cb(null, file.fieldname + path.extname(file.originalname));
    }
  },
});

export const uploader = multer({ storage });

export const pathToPublic = (path) => {
  const indexPublic = path.indexOf("products");

  return `../../static/${path.slice(indexPublic)}`;
};
