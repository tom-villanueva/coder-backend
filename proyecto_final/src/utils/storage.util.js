import multer from "multer";
import { __dirname } from "../../dirname.util.js";
import { BadRequestError } from "./error.util.js";
const acceptedTypes = ["profiles", "documents", "products"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let type = req.body.type;
    let path = `/${type}`;

    if (!req.body.type || !acceptedTypes.includes(req.body.type)) {
      cb(new BadRequestError("Incorrect type of document"));
    }

    cb(null, __dirname + "/public" + path);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});

export const uploader = multer({ storage });
