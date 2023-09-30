import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Command } from "commander";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program.option("--mode <mode>", "Enviroment mode", "development");
program.parse();

const enviroment = program.opts().mode;
dotenv.config({
  path:
    enviroment === "development"
      ? __dirname + "/.env.development"
      : __dirname + "/.env.production",
});

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientScret: process.env.GITHUB_CLIENT_SECRET,
  googleAppEmail: process.env.GOOGLE_APP_EMAIL,
  googleAppPass: process.env.GOOGLE_APP_PASS,
  clientUrl: process.env.CLIENT_URL,
};

export default env;
