import { readFileSync, existsSync, writeFileSync } from "fs";
import * as fs from "fs/promises";

class Manager {
  constructor(path) {
    this.entities = [];
    this.path = path;

    if(!existsSync(this.path)) {
      writeFileSync(this.path, "[]", "utf-8");
    }

    const entitiesFileContent = readFileSync(this.path, "utf-8");
    const storedEntities = JSON.parse(entitiesFileContent);

    this.entities = storedEntities;
  }

  async saveEntitiesInFile() {
    const entitiesStringContent = JSON.stringify(this.entities);
    return fs.writeFile(this.path, entitiesStringContent);
  }
}

export default Manager;