import { IConfig } from "config";

export class Config {
  config: IConfig;

  constructor() {
    const path = process.env?.NODE_CONFIG_ENV ? `./.env.${process.env.NODE_CONFIG_ENV}` : './.env';
    console.info(`\n Loading ${path} file`);
    require("dotenv").config({ path, debug: !!process.env?.NODE_CONFIG_ENV });
    this.config = require("config");
  }

  get<T>(name: string): T {
    return this.config.get<T>(name);
  }

  getByPath<T>(path: string): T | undefined {
    const value = this.config.util.toObject(this.config.get(path));
    return value as T;
  }

  getEnv(name: string): any {
    return this.config.util.getEnv(name);
  }
}

const configInstance = new Config();

export default configInstance;
