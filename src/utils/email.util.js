import nodemailer from "nodemailer";
import env from "../../config.js";
import { __dirname } from "../../dirname.util.js";

export const mailer = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: env.googleAppEmail,
    pass: env.googleAppPass,
  },
});

export const sendEmail = async (email, subject, html) => {
  try {
    const options = {
      from: env.googleAppEmail,
      to: email,
      subject,
      html,
    };

    await mailer.sendMail(options);
  } catch (error) {
    throw error;
  }
};
