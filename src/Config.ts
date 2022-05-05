import { env, make } from "@tools";
import { join, resolve } from "path";

export class Config {
  rootPath = resolve(env("ROOT_PATH", join(__dirname, "..")));
  runtimePath = join(this.rootPath, "./runtime");
  port = env("PORT", 3000);
  database = {
    path: join(this.rootPath, "runtime", "db.sqlite"),
  };
}

export const config = () => new Config();
