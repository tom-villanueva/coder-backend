import path from "path";
import { fileURLToPath } from "url";
import { existsSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const dirs = [`profiles`, `products`, `documents`];

dirs.forEach((dir) => {
  if (!existsSync(dir)) {
    mkdirSync(`${__dirname}/public/${dir}`, { recursive: true });
  }
});
