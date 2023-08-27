import nodemailer from "nodemailer";
import env from "../../config.js";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: env.googleAppEmail,
    pass: env.googleAppPass,
  },
});
