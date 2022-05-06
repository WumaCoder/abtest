import { Logger } from "@deepkit/logger";
import { cli, Command, flag } from "@deepkit/app";
import { Config } from "../Config";
import { ORMDatabase } from "../orm/ORMDatabase";
import { mkdir } from "fs/promises";
import { wrap } from "@tools";

@cli.controller("init")
export class InitCommand implements Command {
  constructor(
    protected logger: Logger,
    private config: Config,
    private orm: ORMDatabase
  ) {}

  async execute(@flag force?: boolean) {
    const [err] = await wrap(mkdir(this.config.runtimePath));
    if (err && !force) {
      this.logger.error(`Directory ${this.config.runtimePath} already exists.`);
      return process.exit(0);
    }
    await this.orm.migrate();
    return process.exit(0);
  }
}
