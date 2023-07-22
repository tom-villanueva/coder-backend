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
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  adminName: process.env.ADMIN_NAME,
  adminPassword: process.env.ADMIN_PASSWORD,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubClientScret: process.env.GITHUB_CLIENT_SECRET,
};

export default env;
